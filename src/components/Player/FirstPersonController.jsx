import { useRef, useEffect, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { RigidBody, CapsuleCollider } from '@react-three/rapier'
import { Vector3 } from 'three'
import { PointerLockControls } from '@react-three/drei'
import { useStore } from '../../store'

const SPEED = 5
const RUN_SPEED = 10
const FLY_SPEED = 15

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

    useEffect(() => {
        const onKeyDown = (e) => {

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
        const currentSpeed = isFlying ? FLY_SPEED : (moveState.current.run ? RUN_SPEED : SPEED)



        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            Number(moveState.current.backward) - Number(moveState.current.forward)
        )
        const sideVector = new Vector3(
            Number(moveState.current.left) - Number(moveState.current.right),
            0,
            0
        )

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
            <PointerLockControls />
        </group>
    )
}
