import { useStore } from '../../store'
import { resumeData } from '../../data/resumeContent'

export function HUD() {
    const selectItem = useStore((state) => state.selectItem)

    const handleOpenProfile = () => {
        selectItem({
            type: 'profile',
            title: resumeData.profile.name,
            subtitle: resumeData.profile.title,
            data: resumeData.profile
        })
    }

    const handleOpenXP = () => {
        selectItem({
            type: 'experienceList',
            title: "PROFESSIONAL EXPERIENCE",
            subtitle: "Career Progression",
            data: resumeData.experience
        })
    }

    const handleOpenStack = () => {
        selectItem({
            type: 'stack',
            title: "TECHNICAL STACK",
            subtitle: "Full Stack & DevOps",
            data: resumeData.skills
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[60] flex flex-col justify-between p-8 font-sans select-none">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="group pointer-events-auto cursor-pointer" onClick={handleOpenProfile}>
                    <div className="bg-black/40 backdrop-blur-xl border-l-4 border-cyan-500 pl-6 pr-10 py-4 skew-x-[-10deg] shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all">
                        <div className="skew-x-[10deg]">
                            <h1 className="text-4xl font-black italic tracking-tighter text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                JOE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">CAPORICCIO</span>
                            </h1>
                            <p className="text-cyan-400 text-xs font-bold tracking-[0.2em] mt-1 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
                                SOLUTIONS ARCHITECT :: ONLINE
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 pointer-events-auto perspective-[1000px]">
                    {/* 3D-style buttons */}
                    <NavButton label="PROFILE" onClick={handleOpenProfile} />
                    <NavButton label="STACK" onClick={handleOpenStack} />
                    <NavButton label="XP" onClick={handleOpenXP} />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end relative">
                <div className="pointer-events-auto">
                    <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-full flex items-center gap-3 text-cyan-400 text-xs font-bold uppercase tracking-wider shadow-lg">
                        <span className="animate-bounce">🖱️</span> Interact / Orbit
                    </div>
                </div>
            </div>
        </div>
    )
}

function NavButton({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="relative group px-8 py-3 bg-black/50 border border-cyan-500/30 text-cyan-500 font-bold tracking-widest hover:text-white transition-all overflow-hidden skew-x-[-10deg] hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-95"
        >
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <span className="inline-block skew-x-[10deg]">{label}</span>
        </button>
    )
}
