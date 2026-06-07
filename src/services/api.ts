import axios, { AxiosError, AxiosProgressEvent } from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const CONVERTER_ENDPOINTS = {
    'json-to-excel': '/api/convert/json-to-excel',
    'excel-to-json': '/api/convert/excel-to-json',
    'csv-to-json': '/api/convert/csv-to-json',
    'json-formatter': '/api/convert/json-formatter',
    'jpg-to-png': '/api/convert/jpg-to-png',
    'png-to-jpg': '/api/convert/png-to-jpg',
    'webp-to-png': '/api/convert/webp-to-png',
    'png-to-webp': '/api/convert/png-to-webp',
    'jpg-to-webp': '/api/convert/jpg-to-webp',
    'any-image-converter': '/api/convert/any-image-converter',
    'image-to-pdf': '/api/convert/image-to-pdf',
    'text-to-pdf': '/api/convert/text-to-pdf',
    'image-compressor': '/api/convert/image-compressor',
    'batch-image-compressor': '/api/convert/batch-image-compressor',
    'image-resizer': '/api/convert/image-resizer',
    'images-to-pdf': '/api/convert/images-to-pdf',
    'pdf-to-jpg': '/api/convert/pdf-to-jpg',
    'json-to-csv': '/api/convert/json-to-csv',
    'csv-to-excel': '/api/convert/csv-to-excel',
    'excel-to-csv': '/api/convert/excel-to-csv',
    'xml-to-json': '/api/convert/xml-to-json',
    'whatsapp-contact-cleaner': '/api/convert/whatsapp-contact-cleaner',
    'base64-encode-decode': '/api/convert/base64-encode-decode',
    'json-to-dart-model': '/api/convert/json-to-dart-model',
    'svg-converter': '/api/convert/svg-converter',
    'json-to-sql': '/api/convert/json-to-sql',
} as const

export type ToolSlug = keyof typeof CONVERTER_ENDPOINTS

export interface ConversionResponseData {
    fileName: string
    downloadUrl: string
    preview: string | Array<Record<string, unknown>>
    mimeType: string
    originalSize?: number
    compressedSize?: number
    convertedSize?: number
    savedPercentage?: number
    originalWidth?: number
    originalHeight?: number
    sqlText?: string
    rowCount?: number
    columnCount?: number
    resizedWidth?: number
    resizedHeight?: number
    width?: number
    height?: number
    inputFormat?: string
    outputFormat?: string
    numberOfPages?: number
    pageCount?: number
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

export interface ConversionApiResponse {
    success: true
    message: string
    data: ConversionResponseData
}

interface ConversionRequestOptions {
    toolSlug: ToolSlug
    file?: File | null
    files?: File[] | null
    text?: string
    onUploadProgress?: (event: AxiosProgressEvent) => void
    options?: Record<string, any>
}

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
})

const buildJsonPayload = (toolSlug: ToolSlug, text: string) => {
    if (toolSlug === 'text-to-pdf') {
        return { text }
    }
    if (toolSlug === 'xml-to-json') {
        return { xmlText: text }
    }
    if (toolSlug === 'base64-encode-decode') {
        return { text }
    }

    return { jsonText: text }
}

export const convertTool = async ({
    toolSlug,
    file,
    files,
    text,
    onUploadProgress,
    options,
}: ConversionRequestOptions): Promise<ConversionApiResponse> => {
    const endpoint = CONVERTER_ENDPOINTS[toolSlug]

    if (file || (files && files.length > 0)) {
        const formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        if (files) {
            files.forEach((f) => formData.append('files', f))
        }

        if (options) {
            Object.entries(options).forEach(([key, val]) => {
                if (val !== undefined && val !== null) {
                    formData.append(key, String(val))
                }
            })
        }

        const response = await apiClient.post<ConversionApiResponse>(endpoint, formData, {
            onUploadProgress,
        })

        return response.data
    }

    const jsonPayload = {
        ...buildJsonPayload(toolSlug, text ?? ''),
        ...(options || {})
    }

    const response = await apiClient.post<ConversionApiResponse>(endpoint, jsonPayload, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    return response.data
}

export const getApiErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message?: string; error?: string }>
        return axiosError.response?.data?.message || axiosError.response?.data?.error || axiosError.message || 'Conversion failed.'
    }

    if (error instanceof Error) {
        return error.message
    }

    return 'Conversion failed.'
}
