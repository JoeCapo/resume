import { useMemo } from 'react'
import * as THREE from 'three'
import { generatePCBTexture } from '../../utils/textureGen'

export function Floor() {
    const texture = useMemo(() => new THREE.CanvasTexture(generatePCBTexture()), [])

    // Repeat texture
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial
                map={texture}
                color="#ffffff"
                roughness={0.8}
                metalness={0.2}
            />
            <gridHelper args={[200, 50, 0x111111, 0x111111]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.1]} />
        </mesh>
    )
}
