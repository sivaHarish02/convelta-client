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
        <div className="card overflow-hidden bg-white/90">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Conversion status</p>
                    <span className="text-sm font-medium text-dark-navy">{getProgressLabel(progress)}</span>
                </div>
                <span className="self-start rounded-full bg-dark-navy/5 px-3 py-1 text-sm font-semibold text-peach-orange sm:self-auto">{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-warm-beige/80">
                <div
                    className="relative h-full rounded-full bg-gradient-to-r from-peach-orange via-sky-cyan to-light-aqua transition-all duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                >
                    <span className="absolute inset-0 animate-pulse bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)]" />
                </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-soft-gray sm:grid-cols-4">
                {[10, 40, 60, 100].map((step) => (
                    <div key={step} className={`rounded-2xl px-3 py-2 ${progress >= step ? 'bg-light-aqua/35 text-dark-navy' : 'bg-soft-cream/70'}`}>
                        {step}%
                    </div>
                ))}
            </div>
        </div>
    )
}
