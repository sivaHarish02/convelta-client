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
                <div className="soft-grid p-6 sm:p-8">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-peach-orange">Ready to download</p>
                    <h3 className="max-w-2xl break-all text-xl font-bold text-dark-navy sm:text-2xl" title={fileName}>{fileName}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-dark-gray sm:text-base">Your converted file is prepared and stored temporarily on the server. Download it now or reset to start a new conversion.</p>
                </div>
                <div className="flex flex-col justify-center gap-3 border-t border-light-aqua/60 bg-light-aqua/18 p-6 sm:p-8 lg:border-l lg:border-t-0">
                    <a
                        href={downloadUrl}
                        download
                        className="btn-primary inline-flex w-full items-center justify-center gap-2"
                    >
                        <Download size={18} />
                        Download File
                    </a>
                    <button
                        type="button"
                        onClick={onReset}
                        className="btn-secondary inline-flex w-full items-center justify-center gap-2"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                    <p className="text-center text-xs text-dark-gray">If the file name is long, the download will still preserve it correctly.</p>
                </div>
            </div>
        </div>
    )
}
