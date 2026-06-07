import { FileUp, Upload } from 'lucide-react'
import { useRef, useState } from 'react'

interface UploadBoxProps {
    acceptedFormats: string[]
    onFileSelect?: (file: File) => void
    onFilesSelect?: (files: File[]) => void
    multiple?: boolean
    disabled?: boolean
    isLoading?: boolean
}

export default function UploadBox({
    acceptedFormats,
    onFileSelect,
    onFilesSelect,
    multiple = false,
    disabled = false,
    isLoading = false
}: UploadBoxProps) {
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!isLoading && !disabled) {
            setIsDragging(true)
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        if (isLoading || disabled) {
            return
        }

        const files = e.dataTransfer.files
        if (files.length > 0) {
            if (multiple && onFilesSelect) {
                onFilesSelect(Array.from(files))
            } else if (onFileSelect) {
                onFileSelect(files[0])
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            if (multiple && onFilesSelect) {
                onFilesSelect(Array.from(e.target.files))
            } else if (onFileSelect) {
                onFileSelect(e.target.files[0])
            }
        }
    }

    const isDisabledOrLoading = isLoading || disabled;

    return (
        <div
            onClick={() => !isDisabledOrLoading && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`group relative overflow-hidden rounded-[30px] border-2 border-dashed p-6 text-center transition-all duration-300 sm:p-8 ${isDragging
                ? 'border-peach-orange bg-peach-orange/10 shadow-[0_20px_40px_rgba(217,122,69,0.12)]'
                : 'border-dark-gray/30 bg-white/70 hover:border-peach-orange/60 hover:bg-white'
                } ${isDisabledOrLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
            <input
                id="file-upload-input"
                ref={fileInputRef}
                type="file"
                onClick={e => e.stopPropagation()}
                onChange={handleFileChange}
                accept={acceptedFormats.join(',')}
                disabled={isDisabledOrLoading}
                multiple={multiple}
                className="hidden"
                aria-label="Upload file"
            />

            <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[22px] transition-all duration-300 ${isDragging ? 'bg-peach-orange text-white' : 'bg-soft-cream text-peach-orange group-hover:bg-light-aqua/60'}`}>
                {isDragging ? <FileUp size={30} aria-hidden="true" /> : <Upload size={30} aria-hidden="true" />}
            </div>
            <label htmlFor="file-upload-input" className="mb-2 block text-lg font-bold text-dark-navy sm:text-xl cursor-pointer">
                {multiple ? 'Drag and drop your files here' : 'Drag and drop your file here'}
            </label>
            <p className="mb-3 text-sm leading-6 text-dark-gray sm:text-base">
                or click to browse
            </p>
            <div className="mx-auto max-w-xl rounded-2xl bg-soft-cream/70 px-4 py-3 text-xs text-soft-gray sm:text-sm">
                <p className="font-medium text-dark-gray">Max file size: 10 MB</p>
                Supported formats: {acceptedFormats.join(', ')}
            </div>
        </div>
    )
}
