import { CatmullRomCurve3, Vector3 } from 'three'
import { Tube } from '@react-three/drei'

// Simple straight connection for now, maybe curved slightly upward?
// Cyberpunk glowing data path
function Path({ start, end }) {
    const curve = new CatmullRomCurve3([
        new Vector3(...start),
        new Vector3(start[0] * 0.5, 0.5, start[2] * 0.5), // Lower arc, closer to ground
        new Vector3(...end)
    ])

    return (
        <group>
            {/* Core glowing line */}
            <Tube args={[curve, 20, 0.3, 8, false]}>
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.6}
                />
            </Tube>
            {/* Outer glow aura */}
            <Tube args={[curve, 20, 0.6, 8, false]}>
                <meshBasicMaterial
                    color="#22d3ee"
                    transparent
                    opacity={0.1}
                    side={2} // Double side
                />
            </Tube>
        </group>
    )
}

export default function PathNetwork() {
    const connections = [
        { End: [20, 0, 0] },    // Frontend (East)
        { End: [-20, 0, 0] },   // Backend (West)
        { End: [15, 0, 15] },   // Customer (South East)
        { End: [-15, 0, 15] },  // Education (South West)
        // { End: [0, 0, -20] },   // DevOps (North) - Maybe logic needs to route around tower? 
        // Direct path for now.
        { End: [0, 0, -20] }
    ]

    return (
        <group position={[0, 0.2, 0]}>
            {connections.map((conn, i) => (
                <Path key={i} start={[0, 0, 0]} end={conn.End} />
            ))}
        </group>
    )
}
