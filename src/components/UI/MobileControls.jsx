import { useState, useRef, useEffect } from 'react'
import { useStore } from '../../store'

export default function MobileControls() {
    const setMobileInput = useStore((state) => state.setMobileInput)
    const [active, setActive] = useState(false)

    // Detect touch device
    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
        setActive(isTouch)

        // Force active for debugging if needed, or remove this line
        // setActive(true) 
    }, [])

    if (!active) return null

    return (
        <div className="absolute inset-0 z-20 pointer-events-none select-none overflow-hidden touch-none"
            style={{ touchAction: 'none' }} // Prevent browser zoom/scroll
        >
            {/* Left Stick Area - Movement */}
            <Joystick
                position="bottom-left"
                onMove={(x, y) => setMobileInput({ x, y })}
            />

            {/* Right Stick Area - Look */}
            {/* For look, we usually just want delta, but a joystick style works too for continuous turn */}
            <LookPad
                onMove={(x, y) => setMobileInput({ lookX: x, lookY: y })}
            />

            {/* Action Buttons */}
            <div className="absolute bottom-24 right-8 pointer-events-auto flex flex-col gap-4">
                <button
                    className="w-16 h-16 rounded-full bg-cyan-500/30 border-2 border-cyan-400 backdrop-blur text-white font-bold active:bg-cyan-500/60"
                    onTouchStart={() => setMobileInput({ jump: true })}
                    onTouchEnd={() => setMobileInput({ jump: false })}
                >
                    JUMP
                </button>
            </div>
        </div>
    )
}

function Joystick({ position, onMove }) {
    const containerRef = useRef()
    const knobRef = useRef()
    const startPos = useRef({ x: 0, y: 0 })
    const active = useRef(false)

    const handleStart = (e) => {
        active.current = true
        const touch = e.changedTouches[0]
        startPos.current = { x: touch.clientX, y: touch.clientY }

        // Visual feedback
        knobRef.current.style.transition = 'none'
    }

    const handleMove = (e) => {
        if (!active.current) return
        const touch = e.changedTouches[0]

        const maxDist = 50
        let dx = touch.clientX - startPos.current.x
        let dy = touch.clientY - startPos.current.y

        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist > maxDist) {
            const angle = Math.atan2(dy, dx)
            dx = Math.cos(angle) * maxDist
            dy = Math.sin(angle) * maxDist
        }

        // Update knob visual
        knobRef.current.style.transform = `translate(${dx}px, ${dy}px)`

        // Normalize output -1 to 1
        onMove(dx / maxDist, dy / maxDist)
    }

    const handleEnd = () => {
        active.current = false
        knobRef.current.style.transition = 'transform 0.2s'
        knobRef.current.style.transform = `translate(0px, 0px)`
        onMove(0, 0)
    }

    return (
        <div
            className={`absolute ${position === 'bottom-left' ? 'bottom-20 left-10' : 'bottom-20 right-10'} w-32 h-32 bg-slate-900/40 rounded-full border border-white/10 backdrop-blur pointer-events-auto`}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            ref={containerRef}
        >
            <div
                ref={knobRef}
                className="absolute top-1/2 left-1/2 w-12 h-12 -ml-6 -mt-6 bg-cyan-500/80 rounded-full shadow-lg border border-white/50"
            />
        </div>
    )
}

function LookPad({ onMove }) {
    // A larger invisible area on the right for looking around
    const startPos = useRef({ x: 0, y: 0 })

    const handleStart = (e) => {
        const touch = e.changedTouches[0]
        startPos.current = { x: touch.clientX, y: touch.clientY }
    }

    const handleMove = (e) => {
        const touch = e.changedTouches[0]
        const dx = touch.clientX - startPos.current.x
        const dy = touch.clientY - startPos.current.y

        // Sensitivity factor
        const sensitivity = 0.005
        onMove(dx * sensitivity, dy * sensitivity)

        // Reset start pos for continuous delta, or accumulate? 
        // For first person look, we usually want "drag to rotate". 
        // Let's rely on continuous delta from a center point approach (Joystick style) 
        // OR strict delta (Resetting startPos).

        // Strict delta approach for Look usually feels better on touch screens
        // But for a simple implementation, let's treat it like a joystick that controls rotation speed (velocity)
        // That's easier to implement in the loop.
    }

    // Let's reuse Joystick logic but invisibly on the right half of screen?
    // Or just put another visible joystick on the right for generic "Look" control styling.

    return (
        <Joystick position="bottom-right" onMove={onMove} />
    )
}
