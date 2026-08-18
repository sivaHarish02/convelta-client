import { Download, RotateCcw } from 'lucide-react'

interface DownloadResultCardProps {
    fileName: string
    downloadUrl: string
    onReset: () => void
}

export default function DownloadResultCard({ fileName, downloadUrl, onReset }: DownloadResultCardProps) {
    return (
        <div className="card overflow-hidden border border-light-aqua/70 bg-white/95 p-0">
            <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="soft-grid p-5">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-peach-orange">Ready to download</p>
                    <h3 className="break-all text-base font-bold text-dark-navy" title={fileName}>{fileName}</h3>
                    <p className="mt-2 text-xs leading-5 text-dark-gray">Your converted file is ready. Download it now or reset for a new conversion.</p>
                </div>
                <div className="flex flex-col justify-center gap-2 border-t border-light-aqua/60 bg-light-aqua/18 p-5 lg:border-l lg:border-t-0">
                    <a
                        href={downloadUrl}
                        download
                        className="btn-primary inline-flex w-full items-center justify-center gap-2 text-sm"
                    >
                        <Download size={16} />
                        Download File
                    </a>
                    <button
                        type="button"
                        onClick={onReset}
                        className="btn-secondary inline-flex w-full items-center justify-center gap-2 text-sm"
                    >
                        <RotateCcw size={16} />
                        Reset
                    </button>
                </div>
            </div>
        </div>
    )
}
