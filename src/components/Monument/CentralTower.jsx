import { RigidBody } from '@react-three/rapier'
import { Text, Billboard } from '@react-three/drei'
import MonumentInteraction from './MonumentInteraction'

// Architectural Element: Modern Concrete Pillar
function Pillar({ position, height }) {
    return (
        <mesh position={position} castShadow receiveShadow>
            <boxGeometry args={[0.6, height, 0.6]} />
            <meshStandardMaterial color="#d4d4d8" roughness={0.8} metalness={0.1} />
        </mesh>
    )
}

function SkyscraperLevel({ position, size, text, data, isGlass = false }) {
    // Concrete / Stone Material Props
    const concreteProps = { color: "#e4e4e7", roughness: 0.9, metalness: 0.1 }

    // Glass Material Props
    const glassProps = {
        color: "#bae6fd",
        metalness: 0.9,
        roughness: 0.05,
        transmission: 0.95,
        thickness: 2,
        ior: 1.5,
        clearcoat: 1
    }

    return (
        <group position={position}>
            <MonumentInteraction title={text} data={{ description: "Details about " + text, ...data }}>

                {/* Main Architectural Volume */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[size[0], size[1], size[2]]} />
                    {isGlass ? (
                        <meshPhysicalMaterial {...glassProps} />
                    ) : (
                        <meshStandardMaterial {...concreteProps} />
                    )}
                </mesh>

                {/* Structural Pillars at Corners */}
                <Pillar position={[size[0] / 2 - 0.3, 0, size[2] / 2 - 0.3]} height={size[1]} />
                <Pillar position={[-size[0] / 2 + 0.3, 0, size[2] / 2 - 0.3]} height={size[1]} />
                <Pillar position={[size[0] / 2 - 0.3, 0, -size[2] / 2 + 0.3]} height={size[1]} />
                <Pillar position={[-size[0] / 2 + 0.3, 0, -size[2] / 2 + 0.3]} height={size[1]} />

                {/* Uplighting at Base */}
                <pointLight position={[0, -size[1] / 2 + 0.5, size[2] / 2 + 1]} intensity={0.5} color="#fbbf24" distance={5} />
                <pointLight position={[0, -size[1] / 2 + 0.5, -size[2] / 2 - 1]} intensity={0.5} color="#fbbf24" distance={5} />

                {/* Floor Plate / Cornice */}
                <mesh position={[0, -size[1] / 2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[size[0] + 0.4, 0.4, size[2] + 0.4]} />
                    <meshStandardMaterial color="#52525b" roughness={0.6} />
                </mesh>

            </MonumentInteraction>

            {/* Permanent Label - Elegant Getty Style */}
            {/* Permanent Label - High Visibility */}
            {/* Permanent Label - Clean Floating Style */}
            {/* Building Signage - Mounted on Face */}
            <group position={[0, size[1] / 2 - 1, size[2] / 2 + 0.06]}>
                <Text
                    font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                    fontSize={0.6}
                    color="#111" // Dark text for contrast against concrete/glass
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                    letterSpacing={0.1}
                >
                    {text.toUpperCase()}
                </Text>
            </group>

            {/* Reverse Side Signage */}
            <group position={[0, size[1] / 2 - 1, -size[2] / 2 - 0.06]} rotation={[0, Math.PI, 0]}>
                <Text
                    font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                    fontSize={0.6}
                    color="#111"
                    anchorX="center"
                    anchorY="middle"
                    fontWeight="bold"
                    letterSpacing={0.1}
                >
                    {text.toUpperCase()}
                </Text>
            </group>
        </group>
    )
}

export default function CentralTower() {
    return (
        <RigidBody type="fixed" colliders="cuboid">
            <group position={[0, -2, 0]}>
                {/* Lobby / Foundation - Intro */}
                <SkyscraperLevel
                    position={[0, 4, 0]}
                    size={[10, 8, 10]}
                    text="Start Here"
                    data={{
                        "Profile": "Joe Caporiccio",
                        "Title": "Solutions Engineer | Developer",
                        "Contact": ["South Windsor, CT", "860-268-6035", "jrcaporiccio@gmail.com"],
                        "Summary": "Technical professional with 7+ years experience in software development, customer collaboration, and technical problem-solving. Seeking to leverage development background in a customer-facing Solutions Engineering role."
                    }}
                />

                {/* Level 1 - PA Industries (Glass) */}
                <SkyscraperLevel
                    position={[0, 12, 0]}
                    size={[8, 8, 8]}
                    text="PA Industries"
                    data={{
                        "Role": "Applications Service Engineer (2016-2017)",
                        "Key Responsibilities": [
                            "Provided frontline technical support to manufacturing clients, diagnosing complex issues.",
                            "Served as technical liaison between customers and internal engineering.",
                            "Analyzed PLC programming issues using AB RSLogix5000."
                        ]
                    }}
                    isGlass={true}
                />

                {/* Level 2 - Envision Config (Glass) */}
                <SkyscraperLevel
                    position={[0, 20, 0]}
                    size={[8, 8, 8]}
                    text="Config Analyst"
                    data={{
                        "Role": "Configuration Analyst @ Envision Pharma (2018-2021)",
                        "Key Responsibilities": [
                            "Gathered requirements and configured portal solutions to meet business needs.",
                            "Translated customer requirements into technical specifications.",
                            "Created comprehensive technical documentation and training materials.",
                            "Modified Java codebase and wrote validation scripts in Groovy."
                        ]
                    }}
                    isGlass={true}
                />

                {/* Level 3 - Envision Developer (Glass) */}
                <SkyscraperLevel
                    position={[0, 28, 0]}
                    size={[7, 8, 7]}
                    text="Developer II"
                    data={{
                        "Role": "Developer II @ Envision Pharma (Jan 2022 - Present)",
                        "Highlight": "Customer-Facing Technical Work",
                        "Responsibilities": [
                            "Collaborate directly with clients to scope solutions.",
                            "Translate technical constraints for non-technical stakeholders.",
                            "Troubleshoot production issues and customer bugs."
                        ],
                        "Technical Implementation": [
                            "Develop web apps using Laravel, React, PHP, JS.",
                            "Deploy via Azure DevOps CI/CD.",
                            "API Integrations & PostgreSQL."
                        ]
                    }}
                    isGlass={true}
                />

                {/* Roof Spire / Antenna */}
                <group position={[0, 36, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.1, 0.3, 10]} />
                        <meshStandardMaterial color="#71717a" metalness={0.8} />
                    </mesh>
                    {/* Warning Light */}
                    <mesh position={[0, 5, 0]}>
                        <sphereGeometry args={[0.3]} />
                        <meshBasicMaterial color="red" />
                    </mesh>
                    <pointLight position={[0, 5, 0]} color="red" intensity={2} distance={10} />
                </group>
            </group>
        </RigidBody>
    )
}
