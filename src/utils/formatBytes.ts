export const formatBytes = (bytes: number): string => {
    if (bytes === 0) {
        return '0 Bytes'
    }

    const units = ['Bytes', 'KB', 'MB', 'GB']
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
    const value = bytes / 1024 ** index

    return `${value.toFixed(index === 0 ? 0 : 2)} ${units[index]}`
}
