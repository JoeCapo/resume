import { Text, Billboard } from '@react-three/drei'

export default function ZoneLabel({ position, text, color = "white" }) {
    return (
        <group position={position}>
            <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
                <mesh position={[0, 0, -0.1]}>
                    <planeGeometry args={[text.length * 0.8 + 1, 2]} />
                    <meshBasicMaterial color="black" transparent opacity={0.6} />
                </mesh>
                <Text
                    font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
                    fontSize={1.2}
                    color={color}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                    fontWeight="bold"
                >
                    {text}
                </Text>
            </Billboard>
            {/* Down arrow or indicator */}
            <mesh position={[0, -1.5, 0]} rotation={[0, 0, Math.PI]}>
                <coneGeometry args={[0.5, 1, 4]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
        </group>
    )
}
