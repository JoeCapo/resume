import { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { Vector3 } from 'three'
import { useStore } from '../../store'

const SPEED = 5
const RUN_SPEED = 10
const FLY_SPEED = 15
const GOD_SPEED = 100

export default function FirstPersonController() {
    const { camera } = useThree()
    const rigidBodyRef = useRef()
    const [isFlying, setIsFlying] = useState(false) // Start in walk mode

    const moveState = useRef({
        forward: false,
        backward: false,
        left: false,
        right: false,
        up: false,
        down: false,
        run: false
    })

    const selectedItem = useStore((state) => state.selectedItem)

    // KONAMI CODE EASTER EGG
    useEffect(() => {
        const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA']
        let currentSequence = []

        const onKeyDown = (e) => {
            // Check for Konami Code
            currentSequence.push(e.code)
            if (currentSequence.length > secretCode.length) {
                currentSequence.shift()
            }
            if (JSON.stringify(currentSequence) === JSON.stringify(secretCode)) {
                // GOD MODE ACTIVATED
                useStore.setState({ godMode: true })
                console.log("GOD MODE ACTIVATED")
            }

            // Standard movement controls
            switch (e.code) {
                case 'KeyW': moveState.current.forward = true; break
                case 'KeyS': moveState.current.backward = true; break
                case 'KeyA': moveState.current.left = true; break
                case 'KeyD': moveState.current.right = true; break
                case 'Space': moveState.current.up = true; break
                case 'ShiftLeft':
                    if (isFlying) moveState.current.down = true
                    else moveState.current.run = true
                    break
                case 'KeyF': setIsFlying(f => !f); break
            }
        }
        const onKeyUp = (e) => {
            switch (e.code) {
                case 'KeyW': moveState.current.forward = false; break
                case 'KeyS': moveState.current.backward = false; break
                case 'KeyA': moveState.current.left = false; break
                case 'KeyD': moveState.current.right = false; break
                case 'Space': moveState.current.up = false; break
                case 'ShiftLeft':
                    moveState.current.down = false
                    moveState.current.run = false
                    break
            }
        }
        document.addEventListener('keydown', onKeyDown)
        document.addEventListener('keyup', onKeyUp)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.removeEventListener('keyup', onKeyUp)
        }
    }, [isFlying])

    useFrame(() => {
        if (!rigidBodyRef.current || selectedItem) return

        const velocity = rigidBodyRef.current.linvel()
        const { godMode, mobileInput } = useStore.getState()
        const currentSpeed = godMode ? GOD_SPEED : (isFlying ? FLY_SPEED : (moveState.current.run ? RUN_SPEED : SPEED))

        // Camera Rotation (Mobile Look)
        if (mobileInput.lookX || mobileInput.lookY) {
            const rotSpeed = 0.05
            camera.rotation.y -= mobileInput.lookX * rotSpeed
            // Optional: Pitch control (look up/down)
            // camera.rotation.x -= mobileInput.lookY * rotSpeed
            // Clamp pitch to avoid flipping? 
            // For now just Y rotation (Yaw) is most critical for navigation
        }

        const direction = new Vector3()
        // Combine keyboard and mobile input
        // joystick returns x/y from -1 to 1. 
        // y is forward/back (-1 is up/forward usually in screen space, check component)
        // In Joystick component: dy > 0 is down/back. dy < 0 is up/forward.

        const forwardInput = Number(moveState.current.backward) - Number(moveState.current.forward) + mobileInput.y
        const sideInput = Number(moveState.current.left) - Number(moveState.current.right) + mobileInput.x

        const frontVector = new Vector3(0, 0, forwardInput)
        const sideVector = new Vector3(sideInput, 0, 0)

        direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(currentSpeed)

        if (isFlying) {
            direction.applyEuler(camera.rotation)
            if (moveState.current.up) direction.y += 10
            if (moveState.current.down) direction.y -= 10

            rigidBodyRef.current.setLinvel({ x: direction.x, y: direction.y, z: direction.z }, true)
        } else {
            direction.applyEuler(camera.rotation)
            if (moveState.current.up && Math.abs(velocity.y) < 0.1) {
                velocity.y = 5
            }
            rigidBodyRef.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true)
        }

        // CRITICAL: Update camera position to follow the physics body
        const position = rigidBodyRef.current.translation()
        camera.position.set(position.x, position.y, position.z)
    })

    useEffect(() => {
        if (rigidBodyRef.current) {
            rigidBodyRef.current.setGravityScale(isFlying ? 0 : 1, true)
            if (isFlying) {
                rigidBodyRef.current.setLinvel({ x: 0, y: 1, z: 0 }, true)
            }
        }
    }, [isFlying])

    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            // Match logic in MobileControls: Touch or Small Screen
            const mobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024
            setIsMobile(mobile)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Mouse Look Logic (Desktop - Drag to Rotate)
    // This replaces PointerLockControls to avoid the "Press ESC" message
    useEffect(() => {
        if (isMobile) return

        const onMouseMove = (e) => {
            if (e.buttons === 1) { // Left click drag
                const sensitivity = 0.002
                camera.rotation.y -= e.movementX * sensitivity
                camera.rotation.x -= e.movementY * sensitivity

                // Clamp pitch
                camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))
            }
        }

        document.addEventListener('mousemove', onMouseMove)
        return () => document.removeEventListener('mousemove', onMouseMove)
    }, [isMobile, camera])

    return (
        <group>
            <RigidBody
                ref={rigidBodyRef}
                colliders={false}
                mass={1}
                type="dynamic"
                position={[0, 2, 40]} // Start on grounds
                enabledRotations={[false, false, false]}
                linearDamping={isFlying ? 5 : 0}
                canSleep={false}
            >
                <CapsuleCollider args={[0.75, 0.3]} />
            </RigidBody>


        </group>
    )
}
