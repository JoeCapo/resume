import { Text } from '@react-three/drei'
import { useState } from 'react'
import { useStore } from '../../store'

function JobNode({ position, company, role, year, description }) {
    const [hovered, setHover] = useState(false)
    const selectItem = useStore((state) => state.selectItem)

    return (
        <group position={position}>
            <mesh
                position={[0, -0.5, 0]}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); }}
                onClick={(e) => {
                    e.stopPropagation()
                    selectItem({ title: company, subtitle: `${role} | ${year}`, description })
                }}
            >
                <cylinderGeometry args={[0.5, 0.5, 0.1, 6]} /> {/* Hexagon base */}
                <meshStandardMaterial color={hovered ? '#ff00ff' : "#ffbd2e"} emissive={hovered ? '#ff00ff' : "#000"} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
                <octahedronGeometry args={[0.3]} />
                <meshStandardMaterial color="#00ffff" wireframe />
            </mesh>
            <Text position={[0, 1, 0]} fontSize={0.3} color="white" anchorY="bottom">
                {company}
            </Text>
            <Text position={[0, 0.7, 0]} fontSize={0.2} color="#ccc" anchorY="top">
                {role} | {year}
            </Text>
        </group>
    )
}

export function Experience() {
    return (
        <group position={[15, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <Text position={[0, 3, 0]} fontSize={1} color="white" anchorX="center" anchorY="middle">
                Experience
            </Text>

            {/* Timeline path visualization could go here */}

            <JobNode
                position={[-4, 0, 0]}
                company="Envision Pharma"
                role="Developer II"
                year="2022-Present"
                description="- Collaborate directly with pharmaceutical industry clients to gather requirements.
- Translate technical constraints for business stakeholders.
- Troubleshoot production issues and customer-reported bugs.
- Develop web apps using Laravel, React, PHP, JS."
            />
            <JobNode
                position={[0, 0, 0]}
                company="Envision Pharma"
                role="Config Analyst"
                year="2018-2021"
                description="- Served as technical point of contact for internal customers.
- Translated customer requirements into technical specifications.
- Configured systems using SQL queries and XML."
            />
            <JobNode
                position={[4, 0, 0]}
                company="PA Industries"
                role="App SVC Eng"
                year="2016-2017"
                description="- Provided frontline technical support to manufacturing clients.
- Analyzed PLC programming issues using AB RSLogix5000."
            />
        </group>
    )
}
