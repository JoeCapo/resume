import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useState } from 'react'

export function IntroCamera() {
    const { camera } = useThree()
    const [finished, setFinished] = useState(false)
    const targetPos = new THREE.Vector3(0, 10, 25)
    const introPos = new THREE.Vector3(0, 50, 50)

    useFrame((state, delta) => {
        if (finished) return

        // Simple lerp for intro
        // We assume the camera starts at position defined in Canvas, but we'll override it here initially
        // Actually, to do this robustly without fighting OrbitControls, we might just want to let OrbitControls handle it
        // or manually set it once.

        // For now, a simple smoothstep interpolation
        const step = 0.5 * delta
        camera.position.lerp(targetPos, step)

        if (camera.position.distanceTo(targetPos) < 0.5) {
            setFinished(true)
        }
    })

    // Set initial position once
    useState(() => {
        camera.position.copy(introPos)
        camera.lookAt(0, 0, 0)
    })

    return null
}
