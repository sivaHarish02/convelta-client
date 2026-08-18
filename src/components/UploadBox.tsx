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
            className={`group relative overflow-hidden rounded-2xl border-2 border-dashed px-4 py-5 text-center transition-all duration-200 sm:py-6 ${isDragging
                ? 'border-peach-orange bg-peach-orange/8'
                : 'border-dark-gray/25 bg-white/60 hover:border-peach-orange/50 hover:bg-white'
                } ${isDisabledOrLoading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
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

            <div className={`mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${isDragging ? 'bg-peach-orange text-white' : 'bg-soft-cream text-peach-orange group-hover:bg-light-aqua/60'}`}>
                {isDragging ? <FileUp size={20} aria-hidden="true" /> : <Upload size={20} aria-hidden="true" />}
            </div>
            <label htmlFor="file-upload-input" className="mb-1 block text-sm font-bold text-dark-navy cursor-pointer">
                {multiple ? 'Drop files here or click to browse' : 'Drop file here or click to browse'}
            </label>
            <p className="text-xs text-dark-gray mb-2">
                Max 10 MB · {acceptedFormats.join(', ')}
            </p>
        </div>
    )
}
