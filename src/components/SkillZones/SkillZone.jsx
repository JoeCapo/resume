import { RigidBody } from '@react-three/rapier'
import MonumentInteraction from '../Monument/MonumentInteraction'
import ZoneLabel from '../Pathways/ZoneLabel'

export default function SkillZone({ position, color, title, data, children, labelHeight = 8 }) {
    return (
        <group position={position}>
            {/* Zone Label removed - individual signage in children */}

            {/* Base Platform */}
            <RigidBody type="fixed" colliders="hull">
                <mesh receiveShadow position={[0, 0.5, 0]}>
                    <cylinderGeometry args={[8, 9, 1, 6]} />
                    <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.5} />
                </mesh>
            </RigidBody>

            {/* Feature Object / Building */}
            <MonumentInteraction title={title} data={data}>
                <group position={[0, 1, 0]}>
                    {children}
                </group>
            </MonumentInteraction>
        </group>
    )
}
