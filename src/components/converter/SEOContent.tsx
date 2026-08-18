import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Tool {
    name: string
    description: string
    inputFormat: string[]
    outputFormat: string
    options?: any[]
    faq?: { question: string; answer: string }[]
}

export const ToolDescription = React.memo(function ToolDescription({ tool }: { tool: Tool }) {
    return (
        <section className="card bg-white/70 p-5">
            <h2 className="text-lg font-bold text-dark-navy mb-2">What is {tool.name}?</h2>
            <p className="text-sm text-dark-gray leading-6">
                {tool.name} is a free online tool by Convelta that lets you {tool.description.toLowerCase()}.
                Whether you are a developer, designer, or business professional, this tool simplifies your
                file conversion workflow without any software installation or account signup.
            </p>
        </section>
    )
})

export const HowToUse = React.memo(function HowToUse({ tool, supportsFileInput }: { tool: Tool, supportsFileInput: boolean }) {
    return (
        <section className="card bg-white/70 p-5">
            <h2 className="text-lg font-bold text-dark-navy mb-3">How to Use {tool.name}</h2>
            <ol className="list-decimal ml-5 space-y-2 text-sm text-dark-gray leading-6">
                <li>Navigate to the {tool.name} page on Convelta.</li>
                <li>{supportsFileInput ? 'Upload your file using the drag-and-drop zone or click to browse.' : 'Paste your content into the text area.'}</li>
                {tool.options && tool.options.length > 0 && <li>Adjust the settings and options as needed.</li>}
                <li>Click the <strong>&quot;Convert Now&quot;</strong> button to start the conversion.</li>
                <li>Preview the output and click <strong>&quot;Download&quot;</strong> to save the result.</li>
            </ol>
        </section>
    )
})

export const SupportedFormats = React.memo(function SupportedFormats({ tool }: { tool: Tool }) {
    return (
        <section className="card bg-white/70 p-5">
            <h2 className="text-lg font-bold text-dark-navy mb-3">Supported Formats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-light-aqua/12 border border-light-aqua/40 p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-peach-orange mb-2">Input</div>
                    <div className="flex flex-wrap gap-1.5">
                        {tool.inputFormat.map((fmt, idx) => (
                            <span key={idx} className="rounded-full bg-white/80 border border-soft-gray/30 px-2.5 py-0.5 text-xs font-medium text-dark-navy">{fmt}</span>
                        ))}
                    </div>
                </div>
                <div className="rounded-xl bg-light-aqua/12 border border-light-aqua/40 p-3">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-peach-orange mb-2">Output</div>
                    <span className="rounded-full bg-white/80 border border-soft-gray/30 px-2.5 py-0.5 text-xs font-medium text-dark-navy">{tool.outputFormat}</span>
                </div>
            </div>
        </section>
    )
})

export const FAQ = React.memo(function FAQ({ tool }: { tool: Tool }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqItems = tool.faq && tool.faq.length > 0 ? tool.faq : [
        { question: `Is ${tool.name} free to use?`, answer: `Yes, ${tool.name} on Convelta is completely free. No signup, no credit card, and no hidden charges.` },
        { question: 'Is my data safe?', answer: 'Your uploaded files are processed on the server and automatically deleted after conversion. We never store, share, or archive your data.' },
        { question: 'What is the maximum file size?', answer: 'Each file can be up to 10MB. For batch operations, a maximum of 20 files is supported.' },
        { question: 'Do I need to install any software?', answer: `No. ${tool.name} runs entirely in your browser. Just upload, convert, and download.` },
    ]

    return (
        <section className="card bg-white/70 p-5">
            <h2 className="text-lg font-bold text-dark-navy mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-soft-gray/20">
                {faqItems.map((item, index) => (
                    <div key={index}>
                        <button
                            type="button"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between gap-3 py-3 text-left"
                        >
                            <h3 className="text-sm font-semibold text-dark-navy">{item.question}</h3>
                            <ChevronDown
                                size={15}
                                className={`shrink-0 text-peach-orange transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                            />
                        </button>
                        {openIndex === index && (
                            <p className="pb-3 text-xs leading-5 text-dark-gray">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
})
