import SkillZone from './SkillZone'
import { Text } from '@react-three/drei'

export default function DevOpsRidge({ position }) {
    const data = {
        title: "DevOps & Infrastructure",
        subtitle: "CI/CD & Cloud",
        data: {
            "Tools": ["Azure DevOps", "CI/CD Pipelines", "Git"],
            "Experience": [
                "Deploy solutions through Azure DevOps pipelines across multiple environments.",
                "Manage environment migrations ensuring minimal disruption."
            ]
        }
    }

    // Style: Industrial Warehouse / Distribution Center
    return (
        <SkillZone position={position} color="#6366f1" title="DevOps" data={data}>

            {/* Main Hangar Shape */}
            <mesh position={[0, 3, 0]} castShadow receiveShadow>
                <boxGeometry args={[5, 4, 8]} />
                <meshStandardMaterial color="#475569" roughness={0.6} metalness={0.3} />
            </mesh>

            {/* Corrugated Roof (Simulated with lines) */}
            <mesh position={[0, 5.1, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[2, 2, 8, 3]} />
                <meshStandardMaterial color="#334155" roughness={0.7} />
            </mesh>

            {/* Building Signage - Large Warehouse Lettering */}
            <Text
                position={[0, 4.2, 4.01]}
                fontSize={0.8}
                color="#cbd5e1"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                fontWeight="bold"
            >
                DEVOPS
            </Text>

            {/* Roll-up Dock Doors */}
            <group position={[2.55, 1.5, 0]}>
                <mesh position={[0, 0, -2]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[2, 2.5]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
                </mesh>
                <mesh position={[0, 0, 2]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[2, 2.5]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
                </mesh>
            </group>

            {/* External Piping / Infrastructure */}
            <mesh position={[-2.6, 3, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.3, 0.3, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.5} />
            </mesh>

            {/* Platform/Dock */}
            <mesh position={[3, 0.5, 0]}>
                <boxGeometry args={[2, 0.5, 8]} />
                <meshStandardMaterial color="#94a3b8" />
            </mesh>

        </SkillZone>
    )
}
