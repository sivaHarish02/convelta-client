import { Copy, Table2 } from 'lucide-react'
import { toast } from 'sonner'

interface OutputPreviewProps {
    isVisible: boolean
    previewText?: string
    previewRows?: Array<Record<string, unknown>>
}

export default function OutputPreview({
    isVisible,
    previewText,
    previewRows,
}: OutputPreviewProps) {
    if (!isVisible) return null

    const tableHeaders = previewRows && previewRows.length > 0 ? Object.keys(previewRows[0]) : []

    const handleCopy = async () => {
        if (!previewText) {
            return
        }

        try {
            await navigator.clipboard.writeText(previewText)
            toast.success('Preview copied')
        } catch {
            toast.error('Unable to copy preview')
        }
    }

    return (
        <div className="card overflow-hidden border border-light-aqua/70 bg-white/90 p-0">
            <div className="border-b border-light-aqua/40 bg-light-aqua/16 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Output preview</p>
                        <h3 className="text-lg font-bold text-dark-navy">Preview</h3>
                    </div>
                    {previewText && (
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 self-start rounded-2xl border border-light-aqua/60 bg-white px-3 py-2 text-sm font-medium text-dark-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-light-aqua/15 sm:self-auto"
                        >
                            <Copy size={16} />
                            Copy
                        </button>
                    )}
                </div>
            </div>

            {previewText && (
                <div className="p-5 sm:p-6">
                    <div className="max-h-80 overflow-y-auto rounded-[24px] border border-soft-gray/60 bg-dark-navy p-4 shadow-inner shadow-black/10 sm:p-5">
                        <p className="font-mono text-sm leading-7 text-light-aqua whitespace-pre-wrap break-words">
                            {previewText}
                        </p>
                    </div>
                </div>
            )}

            {previewRows && previewRows.length > 0 && (
                <div className="p-5 pt-0 sm:p-6 sm:pt-0">
                    <div className="overflow-hidden rounded-[24px] border border-soft-gray/60 bg-white">
                        <div className="flex items-center gap-2 border-b border-soft-gray/60 bg-white-smoke px-4 py-3 text-sm font-medium text-dark-navy">
                            <Table2 size={16} />
                            Preview rows
                        </div>
                        <div className="max-h-80 overflow-auto">
                            <table className="min-w-full divide-y divide-soft-gray/60 text-left text-sm">
                                <thead className="bg-soft-cream/65">
                                    <tr>
                                        {tableHeaders.map((header) => (
                                            <th key={header} className="whitespace-nowrap px-4 py-3 font-semibold text-dark-navy">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-soft-gray/60">
                                    {previewRows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="align-top odd:bg-white even:bg-white-smoke/35">
                                            {tableHeaders.map((header) => (
                                                <td key={`${rowIndex}-${header}`} className="max-w-[240px] px-4 py-3 text-dark-gray">
                                                    {String(row[header] ?? '')}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
