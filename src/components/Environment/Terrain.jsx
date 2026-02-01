import { RigidBody } from '@react-three/rapier'

export default function Terrain() {
    return (
        <RigidBody type="fixed" colliders="hull">
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#3a3a3a" />
            </mesh>
        </RigidBody>
    )
}
