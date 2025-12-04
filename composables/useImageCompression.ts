import imageCompression from 'browser-image-compression'

interface CompressionOptions {
    maxSizeMB?: number
    maxWidthOrHeight?: number
    useWebWorker?: boolean
    quality?: number
    fileType?: string
}

interface CompressionResult {
    success: boolean
    file?: File
    originalSize?: number
    compressedSize?: number
    compressionRatio?: string
    error?: string
}

/**
 * Composable for image compression with configurable settings
 * @returns {Object} Compression utilities
 */
export const useImageCompression = () => {
    /**
     * Compress an image file with custom options
     * @param {File} file - The image file to compress
     * @param {CompressionOptions} customOptions - Custom compression options
     * @returns {Promise<CompressionResult>}
     */
    const compressImage = async (
        file: File,
        customOptions: CompressionOptions = {}
    ): Promise<CompressionResult> => {
        try {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                return {
                    success: false,
                    error: 'File is not an image'
                }
            }

            const originalSize = file.size

            // Default compression options - Convert to WebP for better compression
            const defaultOptions: CompressionOptions = {
                maxSizeMB: 1,              // Max file size in MB
                maxWidthOrHeight: 1920,    // Max width or height in pixels
                useWebWorker: true,        // Use web worker for better performance
                quality: 0.85,             // Quality (0-1), 0.85 = 85%
                fileType: 'image/webp',    // Convert to WebP for better compression
            }

            // Merge custom options with defaults
            const options = { ...defaultOptions, ...customOptions }

            // Compress the image
            const compressedFile = await imageCompression(file, options)
            const compressedSize = compressedFile.size

            // If compressed file is larger than original, use original
            const finalFile = compressedSize < originalSize ? compressedFile : file
            const finalSize = finalFile.size

            return {
                success: true,
                file: finalFile,
                originalSize,
                compressedSize: finalSize,
                compressionRatio: ((1 - finalSize / originalSize) * 100).toFixed(1)
            }
        } catch (error) {
            console.error('Image compression error:', error)
            return {
                success: false,
                error: (error as Error).message || 'Failed to compress image'
            }
        }
    }

    /**
     * Format file size to human readable format
     * @param {number} bytes - File size in bytes
     * @returns {string} Formatted file size
     */
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
    }

    /**
     * Get compression result message
     * @param {number} originalSize - Original file size in bytes
     * @param {number} compressedSize - Compressed file size in bytes
     * @returns {string} Compression result message
     */
    const getCompressionMessage = (originalSize: number, compressedSize: number): string => {
        const original = formatFileSize(originalSize)
        const compressed = formatFileSize(compressedSize)
        const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1)

        if (compressedSize >= originalSize) {
            return `Image converted to WebP: ${original}`
        }

        return `Compressed to WebP: ${original} → ${compressed} (${ratio}% reduction)`
    }

    return {
        compressImage,
        formatFileSize,
        getCompressionMessage
    }
}