import { Instances, Instance, Billboard, Text } from '@react-three/drei'
import { useMemo, useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useStore } from '../../store'
import * as THREE from 'three'

function ServerUnit({ position, rotation, scale, color, hovered, onClick }) {
    return (
        <group position={position} rotation={rotation} scale={scale} onClick={onClick}
            onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
            onPointerOut={() => document.body.style.cursor = 'auto'}
        >
            {/* Main Rack Body */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[0.8, 2, 0.8]} />
                <meshStandardMaterial
                    color="#111"
                    metalness={0.9}
                    roughness={0.2}
                    emissive={hovered ? color : '#000'}
                    emissiveIntensity={hovered ? 0.5 : 0}
                />
            </mesh>

            {/* Server Blades / Lights */}
            {Array.from({ length: 5 }).map((_, i) => (
                <mesh key={i} position={[0, 0.2 + i * 0.35, 0.41]}>
                    <planeGeometry args={[0.7, 0.1]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                </mesh>
            ))}
        </group>
    )
}

export function SkillMonument({ position, name, color, data }) {
    const selectItem = useStore((state) => state.selectItem)
    const [hovered, setHover] = useState(false)
    const groupRef = useRef()

    // Create a cluster of servers
    const servers = useMemo(() => {
        return Array.from({ length: 4 }).map((_, i) => {
            const angle = (i / 4) * Math.PI * 2
            return {
                position: [Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5],
                rotation: [0, -angle, 0] // Face inward
            }
        })
    }, [])

    return (
        <group position={position}
            onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
            onPointerOut={() => setHover(false)}
            onClick={(e) => {
                e.stopPropagation();
                selectItem({
                    type: 'skill',
                    title: data.category,
                    subtitle: "Technical Competency",
                    data: data
                })
            }}
        >
            {/* Base Platform */}
            <mesh position={[0, 0.1, 0]} receiveShadow>
                <cylinderGeometry args={[2.5, 3, 0.5, 8]} />
                <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Server Racks */}
            {servers.map((s, i) => (
                <ServerUnit
                    key={i}
                    {...s}
                    scale={[1, 1, 1]}
                    color={color}
                    hovered={hovered}
                />
            ))}

            {/* Central Hologram Beam */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 4, 8]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
            </mesh>

            {/* Label */}
            <Billboard position={[0, 4.5, 0]} follow={true}>
                <Text
                    fontSize={hovered ? 0.8 : 0.6}
                    color={hovered ? "#fff" : color}
                    outlineWidth={0.05}
                    outlineColor="#000"
                    anchorY="bottom"
                >
                    {name}
                </Text>
            </Billboard>
        </group>
    )
}
