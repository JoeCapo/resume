import { useStore } from '../../store'

export default function HUD() {
    const selectedItem = useStore((state) => state.selectedItem)

    if (selectedItem) return null // Hide HUD when modal is open

    return (
        <div className="absolute inset-0 pointer-events-none z-10 select-none overflow-hidden">
            {/* Top Left - System Status */}
            <div className="absolute top-8 left-8 text-cyan-400 font-mono text-sm tracking-widest">
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,20,30,0.95) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderLeft: '4px solid rgba(6, 182, 212, 0.8)',
                    borderRadius: '2px',
                    padding: '16px',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.05)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative'
                }}>
                    {/* Tech Corner Decoration */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />

                    <div className="flex items-center gap-2 mb-2 border-b border-cyan-500/30 pb-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{
                            boxShadow: '0 0 10px rgba(6, 182, 212, 1)'
                        }} />
                        <span className="font-bold">SYSTEMS ONLINE</span>
                    </div>
                    <div className="opacity-90 text-xs text-cyan-200 mt-2">Running: resume_interactive.exe</div>
                    <div className="opacity-90 text-xs text-cyan-200">User: Guest_001</div>
                    <div className="mt-2 text-cyan-500 font-bold">TARGET: SOLUTIONS_ENGINEER</div>

                    {/* Animated Data Bar */}
                    <div className="mt-2 h-1 w-full bg-cyan-900/50 overflow-hidden relative">
                        <div className="absolute top-0 left-0 h-full w-1/3 bg-cyan-400 opacity-50 animate-[ping_3s_linear_infinite]" />
                    </div>
                </div>
            </div>

            {/* Top Right - Compass / Coordinates Mockup */}
            <div className="absolute top-8 right-8 text-cyan-400 font-mono text-xs text-right">
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(10,20,30,0.9) 100%)',
                    border: '2px solid rgba(6, 182, 212, 0.4)',
                    borderRadius: '8px',
                    padding: '12px',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.3), inset 0 0 20px rgba(6, 182, 212, 0.05)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <div className="border-b border-cyan-500/50 pb-1 mb-2">COORDINATES</div>
                    <div>LAT: 41.80N</div>
                    <div>LNG: 72.50W</div>
                </div>
            </div>

            {/* Bottom Left - Keys */}
            <div className="absolute bottom-8 left-8 text-cyan-300 font-mono text-xs">
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,20,30,0.95) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderLeft: '4px solid rgba(6, 182, 212, 0.8)',
                    borderRadius: '2px',
                    padding: '16px',
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.05)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative'
                }}>
                    {/* Tech Corner Decoration */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />

                    <div className="mb-3 text-cyan-400 border-b border-cyan-500/50 pb-1 font-bold tracking-widest flex justify-between items-center">
                        <span>// CONTROLS</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                            <div className="w-1 h-1 bg-cyan-500/50 rounded-full" />
                            <div className="w-1 h-1 bg-cyan-500/30 rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 opacity-90 font-bold">
                        <div className="flex justify-between w-48 border-b border-cyan-500/10 pb-1">
                            <span className="text-cyan-100">[W,A,S,D]</span>
                            <span className="text-cyan-500">MOVE</span>
                        </div>
                        <div className="flex justify-between w-48 border-b border-cyan-500/10 pb-1">
                            <span className="text-cyan-100">[MOUSE]</span>
                            <span className="text-cyan-500">LOOK</span>
                        </div>
                        <div className="flex justify-between w-48 border-b border-cyan-500/10 pb-1">
                            <span className="text-cyan-100">[CLICK]</span>
                            <span className="text-cyan-500">INTERACT</span>
                        </div>
                        <div className="flex justify-between w-48 border-b border-cyan-500/10 pb-1 mt-2">
                            <span className="text-cyan-100 animate-pulse">[F]</span>
                            <span className="text-cyan-400">TOGGLE FLIGHT</span>
                        </div>
                        <div className="flex justify-between w-48 border-b border-cyan-500/10 pb-1">
                            <span className="text-cyan-100">[SPACE]</span>
                            <span className="text-cyan-500">ASCEND</span>
                        </div>
                        <div className="flex justify-between w-48">
                            <span className="text-cyan-100">[SHIFT]</span>
                            <span className="text-cyan-500">DESCEND</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Right - User Info */}
            <div className="absolute bottom-8 right-8 text-right">
                <div style={{
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(10,20,30,0.95) 100%)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    borderRight: '4px solid rgba(6, 182, 212, 0.8)',
                    borderRadius: '2px',
                    padding: '16px 24px',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(6, 182, 212, 0.08)',
                    backdropFilter: 'blur(10px)',
                    position: 'relative'
                }}>
                    {/* Tech Corner Decoration */}
                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1 font-mono" style={{
                        textShadow: '0 0 20px rgba(6, 182, 212, 0.8)'
                    }}>JOE CAPORICCIO</h1>
                    <div className="flex justify-end gap-2 items-center">
                        <div className="h-[1px] w-8 bg-cyan-500/50"></div>
                        <h2 className="text-base text-cyan-400 tracking-widest uppercase font-bold font-mono" style={{
                            textShadow: '0 0 10px rgba(6, 182, 212, 0.6)'
                        }}>Solutions Engineer</h2>
                    </div>
                </div>
            </div>

            {/* Decorative Corners (CSS Borders) */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyan-500/20" />
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyan-500/20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyan-500/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyan-500/20" />

            {/* Center Reticle Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/5 rounded-full" />
        </div>
    )
}
