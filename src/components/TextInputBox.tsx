interface TextInputBoxProps {
    value: string
    placeholder: string
    onTextChange: (text: string) => void
    isLoading?: boolean
    disabled?: boolean
    label?: string
}

export default function TextInputBox({
    value,
    placeholder,
    onTextChange,
    isLoading = false,
    disabled = false,
    label = 'Paste your content',
}: TextInputBoxProps) {
    return (
        <div className="card bg-white/85 p-4">
            <label htmlFor="text-input-box" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-dark-navy">
                {label}
            </label>
            <textarea
                id="text-input-box"
                value={value}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading || disabled}
                className="h-44 w-full resize-none rounded-xl border border-soft-gray/60 bg-white px-3 py-3 text-sm leading-6 focus:outline-none focus:ring-2 focus:ring-peach-orange disabled:cursor-not-allowed disabled:bg-white-smoke sm:h-52"
                aria-label={label}
            />
            <p className="mt-1 text-[11px] text-soft-gray">
                {value.length} characters
            </p>
        </div>
    )
}
