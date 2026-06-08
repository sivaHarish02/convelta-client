import React from 'react'

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
        <section className="card bg-white/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">What is {tool.name}?</h2>
            <p className="text-dark-gray leading-7">
                {tool.name} is a free online tool by Convelta that lets you {tool.description.toLowerCase()}.
                Whether you are a developer, designer, or business professional, this tool simplifies your
                file conversion workflow without any software installation or account signup.
            </p>
        </section>
    )
})

export const HowToUse = React.memo(function HowToUse({ tool, supportsFileInput }: { tool: Tool, supportsFileInput: boolean }) {
    return (
        <section className="card bg-white/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">How to Use {tool.name}</h2>
            <ol className="list-decimal ml-6 space-y-3 text-dark-gray leading-7">
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
        <section className="card bg-white/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-dark-navy mb-4">Supported Formats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-light-aqua/16 border border-light-aqua/40 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-peach-orange mb-2">Input Formats</div>
                    <div className="flex flex-wrap gap-2">
                        {tool.inputFormat.map((fmt, idx) => (
                            <span key={idx} className="rounded-full bg-white/80 border border-soft-gray/30 px-3 py-1 text-sm font-medium text-dark-navy">{fmt}</span>
                        ))}
                    </div>
                </div>
                <div className="rounded-2xl bg-light-aqua/16 border border-light-aqua/40 p-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-peach-orange mb-2">Output Format</div>
                    <span className="rounded-full bg-white/80 border border-soft-gray/30 px-3 py-1 text-sm font-medium text-dark-navy">{tool.outputFormat}</span>
                </div>
            </div>
        </section>
    )
})

export const FAQ = React.memo(function FAQ({ tool }: { tool: Tool }) {
    return (
        <section className="card bg-white/70 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-dark-navy mb-6">Frequently Asked Questions</h2>
            <div className="space-y-5">
                {tool.faq && tool.faq.length > 0 ? (
                    tool.faq.map((item, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-dark-navy mb-1">{item.question}</h3>
                            <p className="text-dark-gray text-sm leading-6">{item.answer}</p>
                        </div>
                    ))
                ) : (
                    <>
                        <div>
                            <h3 className="font-semibold text-dark-navy mb-1">Is {tool.name} free to use?</h3>
                            <p className="text-dark-gray text-sm leading-6">Yes, {tool.name} on Convelta is completely free. No signup, no credit card, and no hidden charges.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-dark-navy mb-1">Is my data safe?</h3>
                            <p className="text-dark-gray text-sm leading-6">Your uploaded files are processed on the server and automatically deleted after conversion. We never store, share, or archive your data.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-dark-navy mb-1">What is the maximum file size?</h3>
                            <p className="text-dark-gray text-sm leading-6">Each file can be up to 10MB. For batch operations, a maximum of 20 files is supported.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-dark-navy mb-1">Do I need to install any software?</h3>
                            <p className="text-dark-gray text-sm leading-6">No. {tool.name} runs entirely in your browser. Just upload, convert, and download.</p>
                        </div>
                    </>
                )}
            </div>
        </section>
    )
})
