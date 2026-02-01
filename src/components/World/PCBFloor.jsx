import { useMemo } from 'react'
import * as THREE from 'three'
import { generatePCBTexture } from '../../utils/textureGen'

export function PCBFloor() {
    const texture = useMemo(() => {
        const t = new THREE.CanvasTexture(generatePCBTexture())
        t.wrapS = THREE.RepeatWrapping
        t.wrapT = THREE.RepeatWrapping
        t.repeat.set(8, 8)
        t.anisotropy = 16
        return t
    }, [])

    return (
        <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            {/* Base Substrate */}
            <mesh receiveShadow>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial
                    map={texture}
                    roughnessMap={texture}
                    metalnessMap={texture} // Use the texture intensity for metalness too (traces are bright -> metal)
                    color="#102010"
                    roughness={0.4}
                    metalness={0.8}
                />
            </mesh>

            {/* Subtle grid overlay for scale */}
            <gridHelper args={[200, 50, 0x1a401a, 0x0a100a]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.05]} />
        </group>
    )
}
