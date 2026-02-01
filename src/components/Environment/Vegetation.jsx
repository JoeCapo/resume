import { useMemo, useRef } from 'react'
import { Instance, Instances } from '@react-three/drei'
import { getTerrainHeight } from '../../utils/terrainHeight'
import * as THREE from 'three'

function Tree({ position, scale }) {
    return (
        <group position={position} scale={scale}>
            <Instance />
        </group>
    )
}

export default function Vegetation() {
    const trees = useMemo(() => {
        const items = []
        for (let i = 0; i < 200; i++) {
            const angle = Math.random() * Math.PI * 2
            const radius = 90 + Math.random() * 40 // Outside new valley (80)
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            // MountainTerrain is rotated -90 X, so local Y maps to World -Z.
            // We generated height at (vertex.x, vertex.y). Vertex.y becomes -WorldZ.
            // So to match, we need to sample at (x, -z).
            const y = getTerrainHeight(x, -z)

            // Only place if slope isn't too extreme (simple heuristic: not too high)
            if (y < 20) {
                items.push({
                    // Sink tree slightly (-0.5) to avoid floating on slopes
                    position: [x, y - 0.5, z],
                    scale: 0.5 + Math.random() * 1.5
                })
            }
        }
        return items
    }, [])

    return (
        <group>
            {/* Simple Low Poly Pine Tree Geometry */}
            <Instances range={trees.length}>
                <cylinderGeometry args={[0, 1.5, 4, 5]} />
                <meshStandardMaterial color="#14532d" roughnes={0.8} />

                {trees.map((data, i) => (
                    <Tree key={i} position={data.position} scale={[data.scale, data.scale, data.scale]} />
                ))}
            </Instances>

            {/* Pass 2: Trunks */}
            <Instances range={trees.length}>
                <cylinderGeometry args={[0.3, 0.3, 2]} />
                <meshStandardMaterial color="#3f2e20" />
                {trees.map((data, i) => (
                    <group key={i} position={[data.position[0], data.position[1] - 1, data.position[2]]} scale={[data.scale, data.scale, data.scale]}>
                        <Instance />
                    </group>
                ))}
            </Instances>
        </group>
    )
}
