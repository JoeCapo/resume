import SkillZone from './SkillZone'
import { Text } from '@react-three/drei'
import { resumeData } from '../../data/resumeContent'

export default function CustomerPlaza({ position }) {
    const data = resumeData.skills.solutions

    // Style: Corporate Atrium / Lobby (Wood & Glass)
    return (
        <SkillZone position={position} color="#10b981" title="Solutions" data={data} labelHeight={12}>

            {/* Warm Wood Floor */}
            <mesh position={[0, 0.2, 0]} receiveShadow>
                <boxGeometry args={[6, 0.2, 6]} />
                <meshStandardMaterial color="#78350f" roughnes={0.8} />
            </mesh>

            {/* Rear Wall (Stone Feature Wall) */}
            <mesh position={[0, 2.5, -2.8]} castShadow>
                <boxGeometry args={[6, 5, 0.4]} />
                <meshStandardMaterial color="#e5e7eb" roughness={0.9} />
            </mesh>

            {/* Building Signage - Mounted on Feature Wall */}
            <Text
                position={[0, 4, -2.55]}
                fontSize={0.5}
                color="#111"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                fontWeight="normal"
                letterSpacing={0.2}
            >
                SOLUTIONS
            </Text>

            {/* Side Pillars */}
            <group>
                <mesh position={[-2.8, 2.5, 0]}>
                    <boxGeometry args={[0.4, 5, 0.4]} />
                    <meshStandardMaterial color="#52525b" metalness={0.5} />
                </mesh>
                <mesh position={[2.8, 2.5, 0]}>
                    <boxGeometry args={[0.4, 5, 0.4]} />
                    <meshStandardMaterial color="#52525b" metalness={0.5} />
                </mesh>
            </group>

            {/* Glass Canopy Roof */}
            <mesh position={[0, 5, 0]}>
                <boxGeometry args={[6.2, 0.1, 6.2]} />
                <meshPhysicalMaterial
                    color="#ecfeff"
                    transmission={0.6}
                    thickness={1}
                    roughness={0.1}
                />
            </mesh>

            {/* Reception Desk */}
            <mesh position={[0, 1, -1.5]} castShadow>
                <boxGeometry args={[2.5, 1, 0.8]} />
                <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.2} />
            </mesh>

            {/* Lounge Seating */}
            <mesh position={[-2, 0.6, 1]} castShadow>
                <boxGeometry args={[1.5, 0.6, 1.5]} />
                <meshStandardMaterial color="#dc2626" roughness={1} />
            </mesh>
            <mesh position={[2, 0.6, 1]} castShadow>
                <boxGeometry args={[1.5, 0.6, 1.5]} />
                <meshStandardMaterial color="#dc2626" roughness={1} />
            </mesh>

            {/* Information Plaque/Screen */}
            <mesh position={[0, 2.5, -2.5]}>
                <planeGeometry args={[2, 1.2]} />
                <meshBasicMaterial color="black" />
                {/* Could overlay a texture here later */}
            </mesh>

        </SkillZone>
    )
}
