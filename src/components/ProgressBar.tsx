interface ProgressBarProps {
    progress: number
}

const getProgressLabel = (progress: number): string => {
    if (progress >= 100) return 'Completed'
    if (progress >= 90) return 'Preparing download'
    if (progress >= 80) return 'Preparing output'
    if (progress >= 60) return 'Server processing'
    if (progress >= 40) return 'Uploading'
    if (progress >= 25) return 'Input ready'
    if (progress >= 10) return 'Validation complete'
    return 'Waiting to start'
}

export default function ProgressBar({ progress }: ProgressBarProps) {
    return (
        <div className="card overflow-hidden bg-white/90 p-4">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-peach-orange">Status</p>
                    <span className="text-sm font-medium text-dark-navy">{getProgressLabel(progress)}</span>
                </div>
                <span className="rounded-full bg-dark-navy/5 px-2.5 py-1 text-sm font-bold text-peach-orange">{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-warm-beige/80">
                <div
                    className="relative h-full rounded-full bg-gradient-to-r from-peach-orange via-sky-cyan to-light-aqua transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <span className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
                </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-1.5 text-[10px] text-soft-gray">
                {[10, 40, 60, 100].map((step) => (
                    <div key={step} className={`rounded-lg px-2 py-1 text-center ${progress >= step ? 'bg-light-aqua/35 text-dark-navy font-medium' : 'bg-soft-cream/70'}`}>
                        {step}%
                    </div>
                ))}
            </div>
        </div>
    )
}
