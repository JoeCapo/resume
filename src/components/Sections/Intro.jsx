import { Text, Float } from '@react-three/drei'

export function Intro() {
    return (
        <group position={[0, 2, 0]}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <Text
                    fontSize={0.8}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    JOE CAPORICCIO
                </Text>
                <Text
                    position={[0, -1.2, 0]}
                    fontSize={0.4}
                    color="#aaa"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={8}
                    textAlign="center"
                >
                    SOLUTIONS ENGINEER | DEVELOPER
                </Text>
                <Text
                    position={[0, -2.5, 0]}
                    fontSize={0.25}
                    color="#888"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={6}
                    textAlign="center"
                >
                    Translating complex technical concepts for non-technical audiences.
                </Text>
            </Float>
        </group>
    )
}
