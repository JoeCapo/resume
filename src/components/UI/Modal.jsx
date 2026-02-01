import { useStore } from '../../store'

export default function Modal() {
    const selectedItem = useStore((state) => state.selectedItem)
    const clearSelection = useStore((state) => state.clearSelection)

    if (!selectedItem) return null

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50 pointer-events-auto" onClick={clearSelection}>
            <div className="bg-slate-900 p-8 rounded-lg max-w-2xl text-white border border-cyan-500 shadow-lg relative flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-cyan-400">{selectedItem.title}</h2>
                    <h3 className="text-sm uppercase tracking-widest opacity-70">{selectedItem.subtitle}</h3>
                </div>

                {/* Content */}
                <div className="text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                    <ContentRenderer data={selectedItem.data} />
                </div>

                {/* Close Button */}
                <button
                    onClick={(e) => {
                        clearSelection()
                        const canvas = document.querySelector('canvas')
                        if (canvas) canvas.requestPointerLock()
                    }}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-red-500/30 text-cyan-400 hover:text-red-400 border border-cyan-500/30 hover:border-red-500/50 transition-all"
                    aria-label="Close"
                >
                    ✕
                </button>
            </div>
        </div>
    )
}

function ContentRenderer({ data }) {
    if (!data) return null

    // Arrays: Render as chips (if short strings) or list (if long)
    if (Array.isArray(data)) {
        const isShort = data.every(item => typeof item === 'string' && item.length < 20)
        if (isShort) {
            return (
                <div className="flex flex-wrap gap-2 my-2">
                    {data.map((item, i) => (
                        <span key={i} className="px-3 py-1 bg-cyan-900/40 border border-cyan-500/30 rounded-full text-xs text-cyan-200">
                            {item}
                        </span>
                    ))}
                </div>
            )
        }
        return (
            <ul className="list-disc pl-5 my-2 space-y-1">
                {data.map((item, i) => (
                    <li key={i}><ContentRenderer data={item} /></li>
                ))}
            </ul>
        )
    }

    // Objects: Render key as section header
    if (typeof data === 'object') {
        return (
            <div className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <h4 className="text-cyan-400 font-semibold text-sm uppercase tracking-wide mb-1 border-b border-white/10 pb-1">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <ContentRenderer data={value} />
                    </div>
                ))}
            </div>
        )
    }

    // Strings/Primitves
    return <p className="mb-2">{String(data)}</p>
}
