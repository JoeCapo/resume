import { useProgress } from '@react-three/drei'

export default function Loader() {
    const { progress } = useProgress()

    if (progress === 100) return null

    return (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-[100] text-cyan-500 transition-opacity duration-1000">
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
                <div
                    className="h-full bg-cyan-500 transition-all duration-200 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="font-mono text-xl tracking-widest">
                INITIALIZING WORLD... {Math.round(progress)}%
            </div>
        </div>
    )
}
