import { Text, Image } from '@react-three/drei'
import { useState } from 'react'
import { useStore } from '../../store'

function ProjectCard({ position, title, description, fullDetails, color }) {
    const [hovered, setHover] = useState(false)
    const selectItem = useStore((state) => state.selectItem)

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                onClick={(e) => {
                    e.stopPropagation()
                    selectItem({ title, subtitle: 'Key Achievement', description: fullDetails || description })
                }}
                scale={hovered ? 1.1 : 1}
            >
                <boxGeometry args={[3, 2, 0.1]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <Text position={[0, 0, 0.1]} fontSize={0.3} color="black" anchorX="center" anchorY="middle">
                {title}
            </Text>
            {hovered && (
                <Text position={[0, -1.2, 0]} fontSize={0.2} color="white" maxWidth={3}>
                    {description}
                </Text>
            )}
        </group>
    )
}

export function Projects() {
    return (
        <group position={[-15, 1, 0]} rotation={[0, Math.PI / 2, 0]}>
            <Text position={[0, 3, 0]} fontSize={0.8} color="white" anchorX="center" anchorY="middle">
                Key Achievements
            </Text>

            <ProjectCard
                position={[-5, 0, 0]}
                title="Client Success"
                description="Collaborated with 20+ pharma clients"
                fullDetails="Successfully collaborated with 20+ pharmaceutical clients on technical implementations, ensuring deliverables met business objectives and custom requirements."
                color="#ff6b6b"
            />
            <ProjectCard
                position={[0, 0, 0]}
                title="Support Reduction"
                description="Created docs reducing tickets"
                fullDetails="Created comprehensive technical documentation and training materials that significantly reduced customer support tickets by improving self-service capabilities."
                color="#4ecdc4"
            />
            <ProjectCard
                position={[5, 0, 0]}
                title="Cross-Team Ops"
                description="Resolved complex issues"
                fullDetails="Resolved complex customer issues requiring coordination across multiple technical teams (Engineering, QA, Product), acting as the central technical point of contact."
                color="#ffe66d"
            />
        </group>
    )
}
