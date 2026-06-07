import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorAlertProps {
    message: string
    onReset: () => void
}

export default function ErrorAlert({ message, onReset }: ErrorAlertProps) {
    return (
        <div className="overflow-hidden rounded-[28px] border border-peach-orange/35 bg-[linear-gradient(135deg,rgba(217,122,69,0.12),rgba(255,255,255,0.92))] text-dark-navy shadow-[0_18px_40px_rgba(217,122,69,0.08)]">
            <div className="flex flex-col gap-4 p-5 sm:p-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-peach-orange text-white shadow-[0_10px_20px_rgba(217,122,69,0.22)]">
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold">Conversion failed</h3>
                        <p className="mt-1 text-sm leading-6 text-dark-gray">{message}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-peach-orange/25 bg-white/80 px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                >
                    <RotateCcw size={16} />
                    Reset
                </button>
            </div>
        </div>
    )
}
