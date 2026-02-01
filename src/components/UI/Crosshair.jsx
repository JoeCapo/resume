export default function Crosshair() {
    return (
        <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full pointer-events-none z-50 mix-blend-difference"
            style={{ boxShadow: '0 0 0 2px rgba(0,0,0,0.5)' }}
        />
    )
}
