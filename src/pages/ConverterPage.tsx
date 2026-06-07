import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { AxiosProgressEvent } from 'axios'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import UploadBox from '../components/UploadBox'
import TextInputBox from '../components/TextInputBox'
import OutputPreview from '../components/OutputPreview'
import AdSlot from '../components/AdSlot'
import DownloadResultCard from '../components/DownloadResultCard'
import ErrorAlert from '../components/ErrorAlert'
import ProgressBar from '../components/ProgressBar'

const SEOContent = React.lazy(() => import('../components/converter/SEOContent'))
const RelatedTools = React.lazy(() => import('../components/converter/RelatedTools'))
import { getToolBySlug, getRelatedTools, getIconEmoji, categories } from '../data/tools'
import { convertTool, getApiErrorMessage, type ToolSlug, CONVERTER_ENDPOINTS } from '../services/api'
import { formatBytes } from '../utils/formatBytes'
import { getAllowedExtensions, validateRequiredText, validateSelectedFile } from '../utils/fileValidation'

const RECENT_TOOLS_KEY = 'convelta_recent_tools'
const MAX_RECENT = 5

function saveRecentTool(slug: string) {
    try {
        const stored = localStorage.getItem(RECENT_TOOLS_KEY)
        let recent: string[] = []
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) recent = parsed
        }
        recent = [slug, ...recent.filter(s => s !== slug)].slice(0, MAX_RECENT)
        localStorage.setItem(RECENT_TOOLS_KEY, JSON.stringify(recent))
    } catch { /* ignore */ }
}

function getRecentToolSlugs(): string[] {
    try {
        const stored = localStorage.getItem(RECENT_TOOLS_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (Array.isArray(parsed)) return parsed
        }
    } catch { /* ignore */ }
    return []
}

interface ConversionState {
    success: boolean
    message: string
    fileName: string
    downloadUrl: string
    previewText: string
    previewRows: Array<Record<string, unknown>>
    originalSize?: number
    compressedSize?: number
    convertedSize?: number
    savedPercentage?: number
    originalWidth?: number
    originalHeight?: number
    resizedWidth?: number
    resizedHeight?: number
    width?: number
    height?: number
    inputFormat?: string
    outputFormat?: string
    numberOfPages?: number
    pageCount?: number
    rowCount?: number
    columnCount?: number
    summary?: {
        totalRows?: number
        validNumbers?: number
        invalidNumbers?: number
        duplicatesRemoved?: number
        totalFiles?: number
        originalTotalSize?: number
        compressedTotalSize?: number
        savedPercentage?: number
    }
}

const TEXT_ONLY_TOOLS: ToolSlug[] = ['json-formatter', 'text-to-pdf', 'base64-encode-decode', 'json-to-dart-model', 'json-to-sql']
const FILE_ONLY_TOOLS: ToolSlug[] = [
    'excel-to-json',
    'csv-to-json',
    'jpg-to-png',
    'png-to-jpg',
    'webp-to-png',
    'png-to-webp',
    'image-to-pdf',
    'pdf-to-jpg',
    'csv-to-excel',
    'excel-to-csv',
    'whatsapp-contact-cleaner',
]

const INITIAL_STATE: ConversionState = {
    success: false,
    message: '',
    fileName: '',
    downloadUrl: '',
    previewText: '',
    previewRows: [],
}

export default function ConverterPage() {
    const { toolSlug } = useParams<{ toolSlug: string }>()

    const tool = useMemo(() => toolSlug ? getToolBySlug(toolSlug) : null, [toolSlug])
    const categoryInfo = useMemo(() => tool ? categories.find(c => c.id === tool.category) : null, [tool])
    const relatedTools = useMemo(() => toolSlug ? getRelatedTools(toolSlug) : [], [toolSlug])

    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [textValue, setTextValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [progress, setProgress] = useState(0)
    const [result, setResult] = useState<ConversionState>(INITIAL_STATE)
    const [optionsState, setOptionsState] = useState<Record<string, any>>({})
    const progressIntervalRef = useRef<number | null>(null)

    const isImplemented = tool ? tool.slug in CONVERTER_ENDPOINTS : false

    const truncateFileName = (fileName: string) => {
        if (fileName.length <= 56) {
            return fileName
        }

        return `${fileName.slice(0, 28)}...${fileName.slice(-20)}`
    }

    const recentSlugs = getRecentToolSlugs()
    const recentTools = recentSlugs
        .filter(s => s !== toolSlug)
        .map(s => getToolBySlug(s))
        .filter((t): t is NonNullable<typeof t> => t !== undefined)
        .slice(0, 4)

    useEffect(() => {
        return () => {
            if (progressIntervalRef.current) {
                window.clearInterval(progressIntervalRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current)
            progressIntervalRef.current = null
        }

        setSelectedFile(null)
        setSelectedFiles([])
        setTextValue('')
        setErrorMessage('')
        setProgress(0)
        setResult(INITIAL_STATE)
        setIsLoading(false)

        // Initialize default options
        if (tool && tool.options) {
            const defaults: Record<string, any> = {}
            tool.options.forEach((opt) => {
                if (opt.defaultValue !== undefined) {
                    defaults[opt.id] = opt.defaultValue
                }
            })
            setOptionsState(defaults)
        } else {
            setOptionsState({})
        }

        // Track recently used tool
        if (toolSlug) {
            saveRecentTool(toolSlug)
        }
    }, [toolSlug, tool])

    if (!tool) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-2xl font-bold text-dark-navy mb-4">Converter not found</h1>
                <Link to="/tools" className="btn-primary">
                    Back to all tools
                </Link>
            </div>
        )
    }

    const typedToolSlug = tool.slug as ToolSlug
    const isTextOnlyTool = TEXT_ONLY_TOOLS.includes(typedToolSlug)
    const isFileOnlyTool = FILE_ONLY_TOOLS.includes(typedToolSlug)

    const supportsTextInput = tool.inputType
        ? (tool.inputType === 'text' || tool.inputType === 'file-or-text')
        : !isFileOnlyTool

    const supportsFileInput = tool.inputType
        ? (tool.inputType === 'single-file' || tool.inputType === 'multi-file' || tool.inputType === 'file-or-text')
        : !isTextOnlyTool

    const isMultiFile = tool.inputType === 'multi-file'

    const allowedExtensions = getAllowedExtensions(tool.inputFormat)
    const showPreview = result.success && (result.previewText.length > 0 || result.previewRows.length > 0)
    const showDownloadCard = result.success && Boolean(result.downloadUrl) && progress === 100

    const clearProgressSimulation = () => {
        if (progressIntervalRef.current) {
            window.clearInterval(progressIntervalRef.current)
            progressIntervalRef.current = null
        }
    }

    const startProgressSimulation = (minimumProgress: number) => {
        clearProgressSimulation()

        progressIntervalRef.current = window.setInterval(() => {
            setProgress((currentProgress) => {
                if (currentProgress < minimumProgress || currentProgress >= 90) {
                    return currentProgress
                }

                if (currentProgress < 80) {
                    return Math.min(currentProgress + 5, 80)
                }

                return Math.min(currentProgress + 2, 90)
            })
        }, 400)
    }

    const resetState = () => {
        clearProgressSimulation()
        setSelectedFile(null)
        setSelectedFiles([])
        setTextValue('')
        setErrorMessage('')
        setProgress(0)
        setResult(INITIAL_STATE)
        setIsLoading(false)
    }

    const handleFileSelect = (file: File) => {
        setSelectedFile(file)
        setSelectedFiles([])
        setTextValue('')
        setErrorMessage('')
        setResult(INITIAL_STATE)
        setProgress(25)
    }

    const handleFilesSelect = (files: File[]) => {
        setSelectedFiles(files)
        setSelectedFile(null)
        setTextValue('')
        setErrorMessage('')
        setResult(INITIAL_STATE)
        setProgress(25)
    }

    const handleTextChange = (text: string) => {
        setTextValue(text)
        if (text.trim()) {
            setSelectedFile(null)
            setSelectedFiles([])
        }
        setErrorMessage('')
        setResult(INITIAL_STATE)
        setProgress(text.trim() ? 25 : 0)
    }

    const handleOptionChange = (optionId: string, value: any) => {
        setOptionsState((prev) => ({
            ...prev,
            [optionId]: value,
        }))
    }

    const handleUploadProgress = (event: AxiosProgressEvent) => {
        if (!event.total) {
            setProgress((currentProgress) => Math.max(currentProgress, 40))
            return
        }

        const uploadPercent = Math.round((event.loaded / event.total) * 20)
        setProgress((currentProgress) => Math.max(currentProgress, Math.min(40 + uploadPercent, 60)))
    }

    const handleConvert = async () => {
        if (!isImplemented) return

        const trimmedText = textValue.trim()

        if (isMultiFile) {
            if (selectedFiles.length === 0) {
                const errMsg = typedToolSlug === 'images-to-pdf'
                    ? 'Please upload at least one image.'
                    : 'Please upload at least one file.'
                setErrorMessage(errMsg)
                setProgress(10)
                toast.error('Conversion failed')
                return
            }

            if (typedToolSlug === 'images-to-pdf' && selectedFiles.length > 20) {
                setErrorMessage('Maximum 20 images allowed.')
                setProgress(10)
                toast.error('Conversion failed')
                return
            }

            for (const file of selectedFiles) {
                const fileError = validateSelectedFile(file, allowedExtensions)
                if (fileError) {
                    const errMsg = typedToolSlug === 'images-to-pdf'
                        ? 'Only JPG, JPEG, and PNG files are allowed.'
                        : `File "${file.name}": ${fileError}`
                    setErrorMessage(errMsg)
                    setProgress(10)
                    toast.error('Conversion failed')
                    return
                }
            }
        } else if (selectedFile) {
            const fileError = validateSelectedFile(selectedFile, allowedExtensions)
            if (fileError) {
                setErrorMessage(fileError)
                setProgress(10)
                toast.error('Conversion failed')
                return
            }
        }

        if (isTextOnlyTool) {
            const textLabel = (typedToolSlug === 'text-to-pdf' || typedToolSlug === 'base64-encode-decode') ? 'Text' : 'JSON text'
            const textError = validateRequiredText(trimmedText, textLabel)
            if (textError) {
                setErrorMessage(textError)
                setProgress(10)
                toast.error('Conversion failed')
                return
            }
        }

        const hasFiles = isMultiFile ? selectedFiles.length > 0 : !!selectedFile
        if (!hasFiles && !trimmedText) {
            const message = supportsFileInput && supportsTextInput
                ? 'Please upload a file or paste text.'
                : supportsFileInput
                    ? 'Please upload a file.'
                    : 'Please enter text.'
            setErrorMessage(message)
            setProgress(10)
            toast.error('Conversion failed')
            return
        }

        if (typedToolSlug === 'svg-converter' || typedToolSlug === 'any-image-converter') {
            const w = optionsState['width'];
            const h = optionsState['height'];
            if (w !== undefined && (typeof w !== 'number' || w <= 0)) {
                setErrorMessage('Width must be a positive number.')
                setProgress(10)
                toast.error('Conversion failed')
                return
            }
            if (h !== undefined && (typeof h !== 'number' || h <= 0)) {
                setErrorMessage('Height must be a positive number.')
                setProgress(10)
                toast.error('Conversion failed')
                return
            }
        }

        if ((typedToolSlug as string) === 'json-to-sql') {
            const tableName = optionsState['tableName'];
            if (!tableName || typeof tableName !== 'string' || tableName.trim() === '') {
                setErrorMessage('Table name is required.');
                setProgress(10);
                toast.error('Conversion failed');
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
                setErrorMessage('Table name can only contain letters, numbers, and underscores.');
                setProgress(10);
                toast.error('Conversion failed');
                return;
            }
        }

        try {
            setIsLoading(true)
            setErrorMessage('')
            setResult(INITIAL_STATE)
            setProgress(10)
            toast.message('Conversion started')

            setProgress(25)
            setProgress(40)

            if (selectedFile || selectedFiles.length > 0) {
                startProgressSimulation(60)
            } else {
                startProgressSimulation(40)
            }

            const finalOptions = { ...optionsState };
            if (tool.options) {
                tool.options.forEach(opt => {
                    if (finalOptions[opt.id] === undefined && opt.defaultValue !== undefined) {
                        finalOptions[opt.id] = opt.defaultValue;
                    }
                });
            }

            const response = await convertTool({
                toolSlug: typedToolSlug,
                file: selectedFile,
                files: selectedFiles,
                text: trimmedText,
                onUploadProgress: (selectedFile || selectedFiles.length > 0) ? handleUploadProgress : undefined,
                options: finalOptions,
            })

            clearProgressSimulation()
            setProgress(100)

            const preview = response.data.preview
            setResult({
                success: response.success,
                message: response.message,
                fileName: response.data.fileName,
                downloadUrl: response.data.downloadUrl,
                previewText: typeof preview === 'string' ? preview : (response.data.sqlText || ''),
                previewRows: Array.isArray(preview) ? preview : [],
                originalSize: response.data.originalSize,
                compressedSize: response.data.compressedSize,
                savedPercentage: response.data.savedPercentage,
                originalWidth: response.data.originalWidth,
                originalHeight: response.data.originalHeight,
                resizedWidth: response.data.resizedWidth,
                resizedHeight: response.data.resizedHeight,
                width: response.data.width,
                height: response.data.height,
                inputFormat: response.data.inputFormat,
                outputFormat: response.data.outputFormat,
                numberOfPages: response.data.numberOfPages,
                pageCount: response.data.pageCount,
                summary: response.data.summary,
                rowCount: response.data.rowCount,
                columnCount: response.data.columnCount,
            })

            toast.success('Conversion completed')
        } catch (error) {
            clearProgressSimulation()
            const message = getApiErrorMessage(error)
            setResult(INITIAL_STATE)
            setErrorMessage(message)
            toast.error('Conversion failed')
        } finally {
            setIsLoading(false)
        }
    }

    const seoTitle = tool.seoTitle || `${tool.name} - Free Online Tool | Convelta`
    const seoDescription = tool.seoDescription || `${tool.description}. Use Convelta to convert ${tool.inputFormat.join(', ')} to ${tool.outputFormat} online for free. No signup required.`

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
            <SEO
                title={seoTitle}
                description={seoDescription}
                canonicalUrl={`/tools/${tool.slug}`}
            />

            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-1.5 text-sm text-dark-gray" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-peach-orange transition-colors">Home</Link>
                <ChevronRight size={14} className="text-soft-gray" />
                {categoryInfo && (
                    <>
                        <Link to={`/category/${categoryInfo.slug}`} className="hover:text-peach-orange transition-colors">
                            {categoryInfo.name}
                        </Link>
                        <ChevronRight size={14} className="text-soft-gray" />
                    </>
                )}
                <span className="font-medium text-dark-navy">{tool.name}</span>
            </nav>

            <Link
                to="/tools"
                className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-peach-orange shadow-[0_10px_20px_rgba(14,30,37,0.05)] hover:-translate-y-0.5 hover:text-dark-teal"
                aria-label="Back to all tools"
            >
                <ArrowLeft size={18} aria-hidden="true" /> Back to all tools
            </Link>

            <div className="w-full">
                <div className="surface-panel mb-8 overflow-hidden p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-start gap-4 sm:gap-5">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] bg-light-aqua/45 text-4xl shadow-inner shadow-white/70 sm:h-20 sm:w-20 sm:text-5xl">{getIconEmoji(tool.slug)}</div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-peach-orange">Convelta converter</p>
                                <h1 className="mt-2 text-3xl font-bold tracking-tight text-dark-navy sm:text-4xl lg:text-5xl">{tool.name}</h1>
                                <p className="mt-3 max-w-2xl text-sm leading-7 text-dark-gray sm:text-lg">{tool.description}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[280px]">
                            <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-dark-gray">
                                <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Input</div>
                                <div className="mt-1 font-medium text-dark-navy">{tool.inputFormat.join(', ')}</div>
                            </div>
                            <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-dark-gray">
                                <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Output</div>
                                <div className="mt-1 font-medium text-dark-navy">{tool.outputFormat}</div>
                            </div>
                            <div className="col-span-2 rounded-2xl bg-white/70 px-4 py-3 text-sm text-dark-gray sm:col-span-1">
                                <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Mode</div>
                                <div className="mt-1 font-medium text-dark-navy">{supportsFileInput && supportsTextInput ? 'Upload or paste' : supportsFileInput ? 'Upload file' : 'Text input'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.95fr)]">
                    <div className="space-y-8">
                        <div className="card p-6 sm:p-8">
                            {!isImplemented && (
                                <div className="mb-6 rounded-[24px] border border-peach-orange/30 bg-peach-orange/8 p-4 sm:p-5 flex items-start gap-4">
                                    <span className="text-peach-orange text-3xl shrink-0">⏳</span>
                                    <div>
                                        <h4 className="font-bold text-dark-navy">Coming Soon</h4>
                                        <p className="text-sm text-dark-gray mt-1">This tool is coming soon. Backend integration is pending.</p>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-dark-navy sm:text-2xl">Step 1: Upload or enter content</h2>
                                    <p className="text-sm leading-6 text-dark-gray">Use one input mode at a time. Selecting a file clears pasted text, and typing text clears the selected file.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={resetState}
                                    className="btn-secondary self-start px-4 py-2 text-sm"
                                >
                                    Reset
                                </button>
                            </div>

                            {supportsFileInput && (
                                <div className={supportsTextInput ? 'mb-6' : ''}>
                                    <UploadBox
                                        acceptedFormats={allowedExtensions}
                                        onFileSelect={handleFileSelect}
                                        onFilesSelect={handleFilesSelect}
                                        multiple={isMultiFile}
                                        disabled={!isImplemented}
                                        isLoading={isLoading}
                                    />
                                    {!isMultiFile && selectedFile && (
                                        <div className="mt-4 flex flex-col gap-3 rounded-[24px] border border-light-aqua/70 bg-light-aqua/16 px-4 py-4 text-sm text-dark-gray sm:flex-row sm:items-center sm:justify-between">
                                            <div className="min-w-0">
                                                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-peach-orange">Selected file</span>
                                                <div className="mt-1 truncate font-semibold text-dark-navy" title={selectedFile.name}>{truncateFileName(selectedFile.name)}</div>
                                                <div className="mt-1 text-xs text-dark-gray">{formatBytes(selectedFile.size)}</div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFile(null)
                                                    setProgress(textValue.trim() ? 25 : 0)
                                                }}
                                                className="btn-secondary self-start px-4 py-2 text-sm"
                                            >
                                                Remove file
                                            </button>
                                        </div>
                                    )}
                                    {isMultiFile && selectedFiles.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-peach-orange">Selected files ({selectedFiles.length})</span>
                                            <div className="max-h-60 overflow-y-auto space-y-2 rounded-[24px] border border-light-aqua/70 bg-light-aqua/16 p-4">
                                                {selectedFiles.map((file, index) => (
                                                    <div key={index} className="flex items-center justify-between text-sm text-dark-gray bg-white/70 px-4 py-2 rounded-xl">
                                                        <div className="min-w-0 flex-1 truncate font-semibold text-dark-navy mr-4" title={file.name}>
                                                            {truncateFileName(file.name)}
                                                            <span className="ml-2 text-xs font-normal text-dark-gray/60">({formatBytes(file.size)})</span>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedFiles(prev => prev.filter((_, i) => i !== index))
                                                            }}
                                                            className="text-red-500 hover:text-red-700 text-xs font-bold"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedFiles([])
                                                    setProgress(0)
                                                }}
                                                className="btn-secondary px-4 py-2 text-sm mt-2"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {supportsTextInput && (
                                <>
                                    {supportsFileInput && <div className="mb-6 text-center text-sm font-medium uppercase tracking-[0.24em] text-soft-gray">Or</div>}
                                    <TextInputBox
                                        value={textValue}
                                        placeholder={`Paste your ${tool.inputFormat[0]} content here...`}
                                        label={(typedToolSlug === 'text-to-pdf' || typedToolSlug === 'base64-encode-decode') ? 'Paste your text' : 'Paste your content'}
                                        onTextChange={handleTextChange}
                                        isLoading={isLoading}
                                        disabled={!isImplemented}
                                    />
                                </>
                            )}

                            {tool.options && tool.options.length > 0 && (
                                <div className="mt-8 border-t border-soft-gray/30 pt-6">
                                    <h3 className="text-lg font-bold text-dark-navy mb-4 flex items-center gap-2">
                                        ⚙️ Settings & Options
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-soft-cream/40 p-5 rounded-[24px] border border-soft-gray/20">
                                        {tool.options.map((option) => {
                                            if ((tool.slug === 'svg-converter' || tool.slug === 'any-image-converter') && option.id === 'quality' && optionsState['outputFormat'] === 'png') {
                                                return null;
                                            }
                                            let val = optionsState[option.id] !== undefined ? optionsState[option.id] : option.defaultValue;
                                            if (tool.slug === 'any-image-converter' && option.id === 'backgroundColor') {
                                                if (optionsState['outputFormat'] === 'jpg' && val === 'transparent') {
                                                    val = '#ffffff';
                                                }
                                            }
                                            return (
                                                <div key={option.id} className="flex flex-col gap-1.5">
                                                    <label htmlFor={option.id} className="text-sm font-semibold text-dark-navy">
                                                        {option.name}
                                                    </label>
                                                    {option.type === 'select' && (
                                                        <select
                                                            id={option.id}
                                                            value={val}
                                                            disabled={!isImplemented || isLoading}
                                                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                                            className="rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-2 focus:ring-peach-orange disabled:cursor-not-allowed disabled:bg-white-smoke"
                                                        >
                                                            {option.options?.map((opt) => (
                                                                <option key={opt.value} value={opt.value}>
                                                                    {opt.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )}
                                                    {option.id === 'quality' ? (
                                                        <div className="flex flex-col gap-2">
                                                            <input
                                                                id={option.id}
                                                                type="range"
                                                                min="10"
                                                                max="100"
                                                                value={val !== undefined ? val : 75}
                                                                disabled={!isImplemented || isLoading}
                                                                onChange={(e) => handleOptionChange(option.id, Number(e.target.value))}
                                                                className="w-full accent-peach-orange cursor-pointer disabled:cursor-not-allowed"
                                                            />
                                                            <span className="text-xs text-peach-orange font-bold text-right">{val !== undefined ? val : 75}% Quality</span>
                                                        </div>
                                                    ) : option.type === 'number' ? (
                                                        <input
                                                            id={option.id}
                                                            type="number"
                                                            value={val !== undefined && val !== null ? val : ''}
                                                            placeholder={option.placeholder}
                                                            disabled={!isImplemented || isLoading}
                                                            onChange={(e) => {
                                                                const v = e.target.value;
                                                                handleOptionChange(option.id, v === '' ? undefined : Number(v));
                                                            }}
                                                            className="rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-2 focus:ring-peach-orange disabled:cursor-not-allowed disabled:bg-white-smoke"
                                                        />
                                                    ) : null}
                                                    {option.type === 'text' && (
                                                        <input
                                                            id={option.id}
                                                            type="text"
                                                            value={val}
                                                            placeholder={option.placeholder}
                                                            disabled={!isImplemented || isLoading}
                                                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                                                            className="rounded-xl border border-soft-gray/70 bg-white px-3 py-2 text-sm font-medium text-dark-navy outline-none focus:ring-2 focus:ring-peach-orange disabled:cursor-not-allowed disabled:bg-white-smoke"
                                                        />
                                                    )}
                                                    {option.type === 'checkbox' && (
                                                        <label className="inline-flex items-center gap-2 cursor-pointer mt-1">
                                                            <input
                                                                id={option.id}
                                                                type="checkbox"
                                                                checked={!!val}
                                                                disabled={!isImplemented || isLoading}
                                                                onChange={(e) => handleOptionChange(option.id, e.target.checked)}
                                                                className="rounded border-soft-gray/70 text-peach-orange focus:ring-peach-orange h-4 w-4 disabled:cursor-not-allowed"
                                                            />
                                                            <span className="text-sm text-dark-gray">Enable</span>
                                                        </label>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleConvert}
                                    disabled={isLoading || !isImplemented}
                                    className={`btn-primary w-full ${!isImplemented ? 'opacity-50 cursor-not-allowed hover:translate-y-0 hover:scale-100 hover:shadow-none' : ''}`}
                                >
                                    {!isImplemented
                                        ? 'Backend Integration Pending'
                                        : isLoading
                                            ? 'Converting, please wait...'
                                            : 'Convert Now'}
                                </button>
                            </div>
                        </div>

                        {errorMessage && <ErrorAlert message={errorMessage} onReset={resetState} />}

                        {result.success && (
                            <div className="card border border-light-aqua/50 bg-light-aqua/5 p-6 sm:p-8 space-y-4 mb-4 animate-fadeIn">
                                <h3 className="text-xl font-bold text-dark-navy flex items-center gap-2">
                                    📊 Conversion Metrics
                                </h3>

                                {typedToolSlug === 'any-image-converter' && result.outputFormat !== undefined && result.originalSize !== undefined && result.convertedSize !== undefined && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Output Format</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy uppercase">{result.outputFormat}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Original Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{formatBytes(result.originalSize)}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Converted Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{formatBytes(result.convertedSize)}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Dimensions</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.width || '?'} x {result.height || '?'} px</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'image-compressor' && result.originalSize !== undefined && result.compressedSize !== undefined && (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Original Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{formatBytes(result.originalSize)}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Compressed Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{formatBytes(result.compressedSize)}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Space Saved</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">-{result.savedPercentage}%</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'image-resizer' && result.originalWidth !== undefined && result.resizedWidth !== undefined && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Original Dimensions</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{result.originalWidth} x {result.originalHeight} px</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Resized Dimensions</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.resizedWidth} x {result.resizedHeight} px</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'images-to-pdf' && result.numberOfPages !== undefined && (
                                    <div className="grid grid-cols-1 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Generated PDF Pages</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.numberOfPages} pages</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'pdf-to-jpg' && result.pageCount !== undefined && (
                                    <div className="grid grid-cols-1 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Converted PDF Pages</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.pageCount} pages</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'whatsapp-contact-cleaner' && result.summary !== undefined && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Total Rows</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{result.summary.totalRows}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Valid Numbers</div>
                                            <div className="mt-1 text-lg font-bold text-green-600">{result.summary.validNumbers}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Invalid Numbers</div>
                                            <div className="mt-1 text-lg font-bold text-red-500">{result.summary.invalidNumbers}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Duplicates Removed</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.summary.duplicatesRemoved}</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'json-to-sql' && result.rowCount !== undefined && result.columnCount !== undefined && (
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Row Count</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{result.rowCount} rows</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Columns Extracted</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">{result.columnCount} columns</div>
                                        </div>
                                    </div>
                                )}

                                {typedToolSlug === 'batch-image-compressor' && result.summary !== undefined && (
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Total Files</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">{result.summary.totalFiles}</div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Original Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">
                                                {result.summary.originalTotalSize !== undefined ? formatBytes(result.summary.originalTotalSize) : '0 B'}
                                            </div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Compressed Size</div>
                                            <div className="mt-1 text-lg font-bold text-dark-navy">
                                                {result.summary.compressedTotalSize !== undefined ? formatBytes(result.summary.compressedTotalSize) : '0 B'}
                                            </div>
                                        </div>
                                        <div className="bg-white/70 p-4 rounded-2xl border border-soft-gray/20">
                                            <div className="text-xs uppercase tracking-[0.18em] text-soft-gray">Space Saved</div>
                                            <div className="mt-1 text-lg font-bold text-peach-orange">-{result.summary.savedPercentage}%</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {showPreview && (
                            <OutputPreview
                                isVisible={showPreview}
                                previewText={result.previewText}
                                previewRows={result.previewRows}
                            />
                        )}

                        {showDownloadCard && (
                            <DownloadResultCard
                                fileName={result.fileName}
                                downloadUrl={result.downloadUrl}
                                onReset={resetState}
                            />
                        )}

                        {!showPreview && !showDownloadCard && !errorMessage && progress === 0 && (
                            <div className="card border border-dark-gray/10 bg-white/60 p-6 sm:p-8">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Ready when you are</p>
                                <h3 className="mt-2 text-xl font-bold text-dark-navy">No output yet</h3>
                                <p className="mt-2 text-sm leading-6 text-dark-gray">Choose a file or paste text, then run the conversion. Preview and download options will appear here after a successful response.</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-8">
                        {(progress > 0 || isLoading) ? (
                            <ProgressBar progress={progress} />
                        ) : (
                            <div className="card bg-white/70">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Status</p>
                                <h3 className="mt-2 text-lg font-bold text-dark-navy">Waiting to start</h3>
                                <p className="mt-2 text-sm leading-6 text-dark-gray">Validation, upload, processing, preview, and download will update here in real time.</p>
                            </div>
                        )}

                        <AdSlot />

                        <div className="card bg-light-aqua/18 p-6 sm:p-8">
                            <h3 className="mb-6 text-lg font-bold text-dark-navy">Features</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
                                {tool.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-3 rounded-2xl bg-white/65 px-4 py-3">
                                        <span className="text-peach-orange text-xl">✓</span>
                                        <span className="text-dark-gray">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AdSlot below results */}
                <div className="mt-10 min-h-[90px]">
                    <AdSlot />
                </div>

                {/* SEO Content Blocks */}
                <Suspense fallback={<div className="mt-12 h-64 animate-pulse bg-white/40 rounded-2xl"></div>}>
                    <SEOContent tool={tool} supportsFileInput={supportsFileInput} />
                </Suspense>

                {/* Related Converters */}
                <Suspense fallback={<div className="mt-10 h-64 animate-pulse bg-white/40 rounded-2xl"></div>}>
                    <RelatedTools relatedTools={relatedTools} />
                </Suspense>

                {/* Recently Used Tools */}
                {recentTools.length > 0 && (
                    <div className="mt-10">
                        <div className="mb-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-peach-orange">Your history</p>
                            <h3 className="text-2xl font-bold text-dark-navy">Recently used tools</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {recentTools.map((rt) => (
                                <Link
                                    key={rt.id}
                                    to={`/tools/${rt.slug}`}
                                    className="flex items-center gap-3 rounded-2xl bg-white/80 border border-soft-gray/30 px-4 py-3.5 shadow-[0_4px_12px_rgba(14,30,37,0.04)] hover:-translate-y-0.5 hover:shadow-md transition-all"
                                >
                                    <span className="text-2xl shrink-0">{getIconEmoji(rt.slug)}</span>
                                    <div className="min-w-0">
                                        <div className="font-semibold text-dark-navy text-sm truncate">{rt.name}</div>
                                        <div className="text-xs text-soft-gray truncate">{rt.category}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
