import SkillZone from './SkillZone'
import { Text } from '@react-three/drei'
import { resumeData } from '../../data/resumeContent'

export default function BackendFortress({ position }) {
    const data = resumeData.skills.backend

    // Style: Brutalist Concrete Data Center
    return (
        <SkillZone position={position} color="#ea580c" title="Backend" data={data}>

            {/* Main Bunker Block */}
            <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[6, 4, 5]} />
                <meshStandardMaterial color="#57534e" roughness={0.9} />
            </mesh>

            {/* Ventilation Units on Top */}
            <mesh position={[-1.5, 4.8, 0]} castShadow>
                <boxGeometry args={[1.5, 1, 1.5]} />
                <meshStandardMaterial color="#78716c" metalness={0.4} />
            </mesh>
            <mesh position={[1.5, 4.8, 0]} castShadow>
                <boxGeometry args={[1.5, 1, 1.5]} />
                <meshStandardMaterial color="#78716c" metalness={0.4} />
            </mesh>

            {/* Large Security Door */}
            <mesh position={[0, 1.5, 2.55]}>
                <planeGeometry args={[2, 2.5]} />
                <meshStandardMaterial color="#292524" metalness={0.8} />
            </mesh>

            {/* Horizontal banding / grooves */}
            <mesh position={[0, 3.5, 2.52]}>
                <boxGeometry args={[5.8, 0.2, 0.1]} />
                <meshStandardMaterial color="#292524" />
            </mesh>

            {/* Building Signage - Stenciled Industrial Look */}
            <Text
                position={[0, 3.9, 2.51]}
                fontSize={0.6}
                color="#a8a29e"
                anchorX="center"
                anchorY="middle"
                font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                fontWeight="bold"
                letterSpacing={0.1}
            >
                BACKEND OPS
            </Text>
            <mesh position={[0, 1.5, 2.52]}>
                <boxGeometry args={[5.8, 0.2, 0.1]} />
                <meshStandardMaterial color="#292524" />
            </mesh>

            {/* Database Silo Attachment */}
            <mesh position={[3.5, 2, -1]} castShadow>
                <cylinderGeometry args={[1, 1, 3, 16]} />
                <meshStandardMaterial color="#a8a29e" metalness={0.5} />
            </mesh>
        </SkillZone>
    )
}
