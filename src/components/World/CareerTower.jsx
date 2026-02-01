import { Text, Billboard } from '@react-three/drei'
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'
import { resumeData } from '../../data/resumeContent'

function TowerLevel({ position, color, label, details, scale = [1, 1, 1], rotationSpeed = 0 }) {
    const [hovered, setHover] = useState(false)
    const meshRef = useRef()
    const selectItem = useStore((state) => state.selectItem)

    useFrame((state, delta) => {
        if (meshRef.current && rotationSpeed) {
            meshRef.current.rotation.y += delta * rotationSpeed
        }
    })

    return (
        <group position={position}>
            {/* Interactive Core */}
            <group
                ref={meshRef}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setHover(true); }}
                onPointerOut={(e) => { setHover(false); document.body.style.cursor = 'auto'; }}
                onClick={(e) => {
                    e.stopPropagation()
                    selectItem({
                        type: 'job',
                        title: label,
                        subtitle: 'Career Growth',
                        data: details
                    })
                }}
            >
                {/* Main Hex Body */}
                <mesh scale={scale}>
                    <cylinderGeometry args={[2, 2.2, 1.5, 6]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={hovered ? color : '#000'}
                        emissiveIntensity={hovered ? 0.8 : 0.1}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>

                {/* Tech Ring Details (Outer) */}
                <mesh position={[0, 0, 0]}>
                    <torusGeometry args={[2.8, 0.1, 16, 30]} />
                    <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={2} />
                </mesh>

                {/* Vertical Support Pipes */}
                {[0, 2, 4].map((i) => (
                    <mesh key={i} position={[Math.cos(i) * 2.4, 0, Math.sin(i) * 2.4]}>
                        <cylinderGeometry args={[0.2, 0.2, 1.6, 8]} />
                        <meshStandardMaterial color="#333" metalness={1} roughness={0} />
                    </mesh>
                ))}
            </group>

            {/* Floating Label - Always readable, no clipping */}
            <Billboard
                position={[0, 1.5, 3.5]} // Pushed out further and up
                follow={true}
                lockX={false}
                lockY={false}
                lockZ={false}
            >
                <Text
                    fontSize={hovered ? 0.7 : 0.5}
                    color={hovered ? "#00ffff" : "white"}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    {label}
                </Text>
                <Text
                    position={[0, -0.4, 0]}
                    fontSize={0.2}
                    color="#cccccc"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {hovered ? "CLICK TO INSPECT" : ""}
                </Text>
            </Billboard>
        </group>
    )
}

export function CareerTower() {
    const jobs = resumeData.experience

    return (
        <group position={[0, -0.5, 0]}>
            {/* Central Spire */}
            <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[0.8, 1, 12, 16]} />
                <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Energy Core (Glowing interior) */}
            <mesh position={[0, 4, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 12, 16]} />
                <meshBasicMaterial color="#00ffff" />
            </mesh>

            {/* Dynamic Levels from Data - Reverse order so newest is on top */}
            {jobs.map((job, index) => {
                const isTopLevel = index === 0; // Most recent job
                return (
                    <TowerLevel
                        key={index}
                        position={[0, (jobs.length - 1 - index) * 3, 0]} // Reverse position
                        color={isTopLevel ? "#00FFFF" : (index === 1 ? "#4169E1" : "#8B4513")}
                        label={job.role}
                        details={job}
                        scale={isTopLevel ? [1.8, 1.2, 1.8] : [1.5 - (index * 0.2), 1, 1.5 - (index * 0.2)]}
                        rotationSpeed={isTopLevel ? 0.15 : 0.1 * (index % 2 === 0 ? 1 : -1)}
                    />
                )
            })}

            {/* Top Hologram Beacon - Enhanced for top position */}
            <group position={[0, jobs.length * 3 + 0.5, 0]}>
                <mesh>
                    <octahedronGeometry args={[1.2]} />
                    <meshStandardMaterial color="white" emissive="#00ffff" emissiveIntensity={4} wireframe />
                </mesh>
                <pointLight color="#00ffff" distance={15} intensity={8} />
            </group>
        </group>
    )
}
