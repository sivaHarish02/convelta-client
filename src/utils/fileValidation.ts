export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024

export const getAllowedExtensions = (formats: string[]): string[] => {
    return formats.filter((format) => format.startsWith('.')).map((format) => format.toLowerCase())
}

export const getFileExtension = (fileName: string): string => {
    const lastDotIndex = fileName.lastIndexOf('.')
    return lastDotIndex >= 0 ? fileName.slice(lastDotIndex).toLowerCase() : ''
}

export const validateSelectedFile = (
    file: File | null | undefined,
    allowedExtensions: string[]
): string | null => {
    if (!file) {
        return 'Please upload a file.'
    }

    if (file.size <= 0) {
        return 'Empty file is not allowed.'
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return 'File size must be 10 MB or smaller.'
    }

    const extension = getFileExtension(file.name)
    if (!allowedExtensions.includes(extension)) {
        return `Please upload only: ${allowedExtensions.join(', ')}`
    }

    return null
}

export const validateRequiredText = (text: string, label = 'Text'): string | null => {
    if (!text.trim()) {
        return `${label} is required.`
    }

    return null
}
