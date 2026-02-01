import { useState } from 'react'
import { Html } from '@react-three/drei'
import { useStore } from '../../store'

export default function MonumentInteraction({ title, data, children }) {
    const [hovered, setHovered] = useState(false)
    const selectItem = useStore((state) => state.selectItem)

    return (
        <group
            onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
            onClick={(e) => {
                e.stopPropagation()
                // Only trigger if we are already locked (looking around)
                // If not locked, this click is just capturing the pointer.
                if (!document.pointerLockElement) return

                selectItem({
                    type: 'profile',
                    title: title,
                    subtitle: "Role Detail",
                    data: data
                })
            }}
            className={hovered ? "cursor-pointer" : ""}
        >
            {children}

            {/* Visual Highlight on Hover */}
            {hovered && (
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    {/* Note: In a real app we'd clone the child geometry or use an OutlinePass. 
                For now, we rely on the cursor/tooltip. */ }
                </mesh>
            )}

            {/* HTML Tooltip removed to favor 3D ZoneLabels */}
        </group>
    )
}
