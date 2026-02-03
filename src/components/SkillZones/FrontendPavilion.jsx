import SkillZone from './SkillZone'
import { Html, Text } from '@react-three/drei'
import { resumeData } from '../../data/resumeContent'

export default function FrontendPavilion({ position }) {
    const data = resumeData.skills.frontend

    // Style: Modern Tech Office (Glass & White Aluminum)
    return (
        <SkillZone position={position} color="#06b6d4" title="Frontend" data={data}>

            {/* Foundation */}
            <mesh position={[0, 0.5, 0]} receiveShadow>
                <boxGeometry args={[6, 1, 4]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>

            {/* Ground Floor - Glass Box */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[5.8, 2, 3.8]} />
                <meshPhysicalMaterial
                    color="#ecfeff"
                    transmission={0.9}
                    roughness={0.1}
                    thickness={1}
                    ior={1.5}
                />
            </mesh>

            {/* Floor Divider / Slab */}
            <mesh position={[0, 3.1, 0]}>
                <boxGeometry args={[6.2, 0.2, 4.2]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
            </mesh>

            {/* Second Floor - Glass Box */}
            <mesh position={[0, 4.2, 0]} castShadow>
                <boxGeometry args={[5.8, 2, 3.8]} />
                <meshPhysicalMaterial
                    color="#ecfeff"
                    transmission={0.9}
                    roughness={0.1}
                    thickness={1}
                    ior={1.5}
                />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 5.3, 0]}>
                <boxGeometry args={[6.2, 0.2, 4.2]} />
                <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.5} />
            </mesh>

            {/* Building Signage - Modern Sans Serif */}
            <Text
                position={[0, 5.3, 2.11]}
                fontSize={0.5}
                color="#334155"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                fontWeight="bold"
                letterSpacing={0.05}
            >
                FRONTEND
            </Text>

            {/* Structural Columns (White Aluminum) */}
            <group>
                <mesh position={[-2.9, 3, -1.9]}>
                    <boxGeometry args={[0.2, 4.5, 0.2]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
                </mesh>
                <mesh position={[2.9, 3, -1.9]}>
                    <boxGeometry args={[0.2, 4.5, 0.2]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
                </mesh>
                <mesh position={[-2.9, 3, 1.9]}>
                    <boxGeometry args={[0.2, 4.5, 0.2]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
                </mesh>
                <mesh position={[2.9, 3, 1.9]}>
                    <boxGeometry args={[0.2, 4.5, 0.2]} />
                    <meshStandardMaterial color="#e2e8f0" metalness={0.6} />
                </mesh>
            </group>

            {/* Interior Desk (Simplistic representation) */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[2, 0.8, 1]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>

        </SkillZone>
    )
}
