import { MeshReflectorMaterial, Grid } from '@react-three/drei'

export function NeonFloor() {
    return (
        <group position={[0, -0.5, 0]}>
            {/* Infinite Grid for structure */}
            <Grid
                position={[0, 0.01, 0]}
                args={[100, 100]}
                cellSize={2}
                cellThickness={1}
                cellColor="#1a2a3a"
                sectionSize={10}
                sectionThickness={1.5}
                sectionColor="#00ffff"
                fadeDistance={50}
                infiniteGrid
            />

            {/* Solid Reflective Base - No longer 'see through' into void */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[200, 200]} />
                <MeshReflectorMaterial
                    blur={[400, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={15} // Reduced reflection strength to show the floor color more
                    roughness={0.5}
                    depthScale={1}
                    minDepthThreshold={0.5}
                    maxDepthThreshold={1.4}
                    color="#050505"
                    metalness={0.6}
                    mirror={0.5}
                />
            </mesh>

            {/* Decorative under-structure to give 'function' */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
        </group>
    )
}
