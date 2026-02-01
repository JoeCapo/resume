import { Text, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'

function SkillNode({ position, title, subtitle, description, color }) {
    const meshRef = useRef()
    const [hovered, setHover] = useState(false)
    const selectItem = useStore((state) => state.selectItem)

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5
            meshRef.current.rotation.y += delta * 0.5
        }
    })

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                    onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                    onClick={(e) => {
                        e.stopPropagation()
                        selectItem({ title, subtitle, description })
                    }}
                    scale={hovered ? 1.2 : 1}
                >
                    <icosahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color={hovered ? 'hotpink' : color} transparent opacity={0.8} />
                </mesh>
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.4}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {title}
                </Text>
            </Float>
        </group>
    )
}

export function Skills() {
    return (
        <group position={[0, 1, -10]}> {/* Positioned behind the intro */}
            <Text position={[0, 4, 0]} fontSize={1} color="white" anchorX="center" anchorY="middle">
                Technical Stack
            </Text>

            {/* Row 1 */}
            <SkillNode
                position={[-4, 1.5, 0]}
                title="React"
                color="#61dafb"
                subtitle="Frontend Library"
                description="Experience building dynamic UIs with Hooks, Context, and Redux."
            />
            <SkillNode
                position={[-1.5, 1.5, 0]}
                title="Laravel"
                color="#ff2d20"
                subtitle="PHP Framework"
                description="Developing robust backend APIs and server-side applications."
            />
            <SkillNode
                position={[1.5, 1.5, 0]}
                title="Azure DevOps"
                color="#007fff"
                subtitle="CI/CD & Cloud"
                description="Managing deployment pipelines and cloud infrastructure."
            />
            <SkillNode
                position={[4, 1.5, 0]}
                title="PostgreSQL"
                color="#336791"
                subtitle="Database"
                description="Designing complex schemas and optimizing queries."
            />

            {/* Row 2 */}
            <SkillNode
                position={[-3, -1.5, 0]}
                title="Solutions Eng"
                color="#ffbd2e"
                subtitle="Customer Facing"
                description="Bridging gap between technical and business requirements."
            />
            <SkillNode
                position={[0, -1.5, 0]}
                title="Customer Success"
                color="#4ecdc4"
                subtitle="Role"
                description="Ensuring client satisfaction through technical support."
            />
            <SkillNode
                position={[3, -1.5, 0]}
                title="Communication"
                color="#ff6b6b"
                subtitle="Soft Skill"
                description="Translating technical concepts for non-technical stakeholders."
            />
        </group>
    )
}
