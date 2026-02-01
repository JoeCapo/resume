import { useStore } from '../../store'

// Helper to format text with bullets and headers
const renderFormattedText = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];
    let currentList = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
            currentList.push(trimmed.substring(1).trim());
        } else {
            if (currentList.length > 0) {
                elements.push(
                    <ul key={`list-${index}`} className="list-disc pl-5 space-y-2 mb-4 text-slate-300">
                        {currentList.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                );
                currentList = [];
            }

            if (trimmed.endsWith(':') || (trimmed.length < 50 && trimmed === trimmed.toUpperCase())) {
                elements.push(<h5 key={`h-${index}`} className="text-cyan-400 font-bold mt-6 mb-2 tracking-wide text-sm uppercase">{trimmed.replace(':', '')}</h5>);
            } else {
                elements.push(<p key={`p-${index}`} className="mb-4 leading-relaxed text-slate-300">{trimmed}</p>);
            }
        }
    });

    if (currentList.length > 0) {
        elements.push(
            <ul key="list-end" className="list-disc pl-5 space-y-2 mb-4 text-slate-300">
                {currentList.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
        );
    }

    return elements;
};

function ProfileView({ data }) {
    return (
        <div className="space-y-8">
            <div className="p-4 bg-cyan-900/10 border border-cyan-500/20 rounded">
                <div className="text-sm text-cyan-300 font-mono tracking-wider">CONTACT INFORMATION</div>
                <div className="mt-2 text-white font-medium">{data.contact}</div>
            </div>

            <div>
                <h4 className="text-yellow-500 font-bold mb-4 tracking-widest text-xs uppercase border-b border-yellow-500/20 pb-2">Professional Summary</h4>
                <div className="space-y-4">{renderFormattedText(data.summary)}</div>
            </div>

            <div>
                <h4 className="text-yellow-500 font-bold mb-4 tracking-widest text-xs uppercase border-b border-yellow-500/20 pb-2">Core Competencies</h4>
                <div className="grid grid-cols-1 gap-3">
                    {data.competencies.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-cyan-50 bg-slate-800/50 p-3 rounded-md border-l-2 border-cyan-500 hover:bg-slate-800 transition-colors">
                            {c}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ExperienceListView({ data }) {
    return (
        <div className="space-y-4">
            {data.map((job, i) => (
                <div key={i} className="group relative p-6 bg-slate-900/40 hover:bg-slate-800/60 border border-slate-700 hover:border-cyan-500 transition-all rounded-xl overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-600 group-hover:bg-cyan-400 transition-colors"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start mb-2 gap-2">
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{job.role}</h4>
                        <span className="text-xs font-mono text-cyan-400/80 bg-cyan-900/30 px-2 py-1 rounded">{job.period}</span>
                    </div>

                    <div className="text-sm font-medium text-slate-400 mb-4">{job.company}</div>

                    <div className="text-sm text-slate-400 leading-relaxed line-clamp-3 pl-2 border-l border-slate-700">
                        {job.details.split('\n')[0]}...
                    </div>
                </div>
            ))}
            <div className="text-center text-xs text-cyan-500/50 mt-8 font-mono animate-pulse">
                &mdash; SELECT A TOWER LEVEL TO INSPECT DETAILS &mdash;
            </div>
        </div>
    )
}

function JobDetailView({ data }) {
    return (
        <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-transparent p-6 rounded-lg border-l-4 border-blue-500 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-2">{data.company}</h2>
                <div className="flex items-center gap-2 text-cyan-300 font-mono text-sm">
                    <span>{data.period}</span>
                    <span className="w-1 h-1 bg-cyan-500 rounded-full"></span>
                    <span>{data.role}</span>
                </div>
            </div>

            <div className="text-slate-200 text-sm leading-loose space-y-4 font-light">
                {renderFormattedText(data.details)}
            </div>
        </div>
    )
}

function StackView({ data }) {
    return (
        <div className="space-y-8">
            {Object.values(data).map((cat, i) => (
                <div key={i} className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-cyan-500 rounded-full"></div>
                        <div>
                            <h4 className="text-lg font-bold text-white tracking-wider">{cat.category}</h4>
                            <p className="text-xs text-slate-400">{cat.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {cat.items.map((skill, j) => (
                            <div key={j} className="px-3 py-1.5 bg-cyan-950/50 text-cyan-200 text-xs font-medium rounded-full border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all cursor-default">
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

function SkillDetailView({ data }) {
    return (
        <div className="space-y-8">
            <div className="p-4 bg-blue-900/10 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-blue-100 text-lg leading-relaxed">{data.description}</p>
            </div>

            <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Technologies & Tools</h4>
                <div className="flex flex-wrap gap-3">
                    {data.items.map((skill, i) => (
                        <span key={i} className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg border border-slate-600 hover:border-blue-400 hover:bg-slate-700 transition-all shadow-sm">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function DetailPanel() {
    const selectedItem = useStore((state) => state.selectedItem)
    const clearSelection = useStore((state) => state.clearSelection)

    if (!selectedItem) return null;

    const renderContent = () => {
        switch (selectedItem.type) {
            case 'profile': return <ProfileView data={selectedItem.data} />
            case 'experienceList': return <ExperienceListView data={selectedItem.data} />
            case 'job': return <JobDetailView data={selectedItem.data} />
            case 'stack': return <StackView data={selectedItem.data} />
            case 'skill': return <SkillDetailView data={selectedItem.data} />
            default: return <div className="space-y-4">{renderFormattedText(selectedItem.description)}</div>
        }
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm pointer-events-auto"
            onClick={clearSelection}
        >
            <div
                className="relative w-full max-w-3xl max-h-[85vh] flex flex-col bg-slate-900 border-2 border-cyan-500/70 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.4)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex-none p-6 border-b border-cyan-500/40 bg-gradient-to-r from-cyan-950/60 to-slate-900/80">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-widest opacity-90">
                                {selectedItem.subtitle}
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight truncate">
                                {selectedItem.title}
                            </h2>
                        </div>
                        <button
                            onClick={clearSelection}
                            className="flex-none w-10 h-10 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-red-500/30 text-cyan-400 hover:text-red-400 border border-cyan-500/30 hover:border-red-500/50 transition-all"
                            aria-label="Close"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900/98 text-slate-300 custom-scrollbar">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}
