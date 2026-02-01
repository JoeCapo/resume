import { useRef, useMemo } from 'react'
import { Instance, Instances } from '@react-three/drei'
import * as THREE from 'three'
import { generateTechTexture } from '../../utils/textureGen'

function Building({ position, scale, color }) {
    return (
        <group position={position}>
            <Instance scale={scale} color={color} />
            {/* Top/Roof Detail to separate from sky */}
            <mesh position={[0, scale[1] / 2 + 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[scale[0], scale[2]]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>
        </group>
    )
}

export function City() {
    const texture = useMemo(() => {
        return new THREE.CanvasTexture(generateTechTexture())
    }, [])

    const buildings = useMemo(() => {
        const items = []
        for (let i = 0; i < 80; i++) {
            const x = (Math.random() - 0.5) * 120
            const z = (Math.random() - 0.5) * 120
            if (Math.abs(x) < 20 && Math.abs(z) < 20) continue;

            const height = Math.random() * 15 + 5
            const width = Math.random() * 3 + 2

            items.push({
                position: [x, height / 2 - 2, z],
                scale: [width, height, width],
                color: '#ffffff' // Let texture handle color mostly
            })
        }
        return items
    }, [])

    return (
        <Instances range={buildings.length}>
            <boxGeometry />
            <meshStandardMaterial
                map={texture}
                emissiveMap={texture}
                emissive="#00ffff"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
                color="#222"
            />

            {buildings.map((data, i) => (
                <Building key={i} {...data} />
            ))}
        </Instances>
    )
}
