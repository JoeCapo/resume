import { resumeData } from '../../data/resumeContent'
import { SkillMonument } from './SkillMonument'
import React from 'react'

export function SkillDistrict() {
    const { skills } = resumeData

    // Positions for the main districts around the tower
    const layout = [
        { key: 'frontend', pos: [-15, 0, 10], color: '#00ffff' },
        { key: 'backend', pos: [15, 0, 10], color: '#ff0055' },
        { key: 'devops', pos: [-15, 0, -10], color: '#ffbd2e' },
        { key: 'soft', pos: [15, 0, -10], color: '#00ff00' },
    ]

    return (
        <group>
            {layout.map((item) => (
                <SkillMonument
                    key={item.key}
                    position={item.pos}
                    name={skills[item.key].category}
                    color={item.color}
                    data={skills[item.key]}
                />
            ))}
        </group>
    )
}
