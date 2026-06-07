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
        <div className="card bg-white/85">
            <label htmlFor="text-input-box" className="mb-2 block text-sm font-medium text-dark-navy">
                {label}
            </label>
            <textarea
                id="text-input-box"
                value={value}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading || disabled}
                className="h-64 w-full resize-none rounded-[24px] border border-soft-gray/70 bg-white px-4 py-4 text-sm leading-7 focus:outline-none focus:ring-2 focus:ring-peach-orange disabled:cursor-not-allowed disabled:bg-white-smoke sm:h-72 sm:text-base"
                aria-label={label}
            />
            <p className="mt-2 text-xs text-soft-gray sm:text-sm">
                {value.length} characters
            </p>
        </div>
    )
}
