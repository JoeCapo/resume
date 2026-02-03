import { RigidBody } from '@react-three/rapier'
import MonumentInteraction from '../Monument/MonumentInteraction'
import { Text } from '@react-three/drei'
import { resumeData } from '../../data/resumeContent'

export default function EducationBuilding({ position }) {
    const data = resumeData.education

    // Style: Classical University Library (Limestone & Brick)
    return (
        <group position={position}>
            <RigidBody type="fixed" colliders="hull">

                {/* Grand Stone Foundation */}
                <mesh position={[0, 0.5, 0]} receiveShadow>
                    <boxGeometry args={[14, 1, 10]} />
                    <meshStandardMaterial color="#a8a29e" roughness={0.9} />
                </mesh>
                <mesh position={[0, 1.25, 0]} receiveShadow>
                    <boxGeometry args={[13, 0.5, 9]} />
                    <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
                </mesh>

                {/* Wide Entrance Steps */}
                <group position={[0, 0.5, 5.5]}>
                    <mesh position={[0, -0.25, 0]}>
                        <boxGeometry args={[8, 0.5, 1]} />
                        <meshStandardMaterial color="#a8a29e" roughness={0.9} />
                    </mesh>
                    <mesh position={[0, 0.25, -0.5]}>
                        <boxGeometry args={[8, 0.5, 1]} />
                        <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
                    </mesh>
                </group>

                {/* Main Building Body (Classic Brick) */}
                <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
                    <boxGeometry args={[12, 6, 8]} />
                    <meshStandardMaterial color="#7c2d12" roughness={0.7} />
                </mesh>

                {/* Limestone Columns (Removed Center Column) */}
                <group position={[0, 4.5, 4.5]}>
                    {[-4, -2, 2, 4].map((x, i) => (
                        <mesh key={i} position={[x, 0, 0]}>
                            <cylinderGeometry args={[0.6, 0.6, 6]} />
                            <meshStandardMaterial color="#e7e5e4" roughness={0.5} />
                        </mesh>
                    ))}
                </group>

                {/* Portico / Entablature (Top Stone Block) */}
                <mesh position={[0, 7.5, 4.5]} castShadow>
                    <boxGeometry args={[13, 1, 2]} />
                    <meshStandardMaterial color="#e7e5e4" />
                </mesh>

                {/* Pediment (Triangle Roof) */}
                <mesh position={[0, 9.5, 4.5]} rotation={[0, Math.PI / 4, 0]} castShadow>
                    <coneGeometry args={[5, 3, 4]} />
                    <meshStandardMaterial color="#e7e5e4" />
                </mesh>

                {/* Main Roof (Dark Slate) */}
                <mesh position={[0, 8, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <coneGeometry args={[8, 4, 4]} />
                    <meshStandardMaterial color="#334155" roughness={0.6} />
                </mesh>

                {/* "EDUCATION" Text Sign */}
                <mesh position={[0, 7.5, 5.6]}>
                    <planeGeometry args={[4, 0.8]} />
                    <meshStandardMaterial color="#1c1917" />
                </mesh>
                <Text
                    position={[0, 7.5, 5.65]}
                    fontSize={0.5}
                    color="#e7e5e4"
                    anchorX="center"
                    anchorY="middle"
                    font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                    fontWeight="bold"
                    letterSpacing={0.2}
                >
                    EDUCATION
                </Text>

            </RigidBody>

            {/* Interaction Trigger - Front Door */}
            <MonumentInteraction title="Education" data={data}>
                <mesh position={[0, 2.5, 4.1]}>
                    <boxGeometry args={[3, 4, 0.5]} />
                    <meshStandardMaterial color="#451a03" />
                </mesh>
            </MonumentInteraction>
        </group>
    )
}
