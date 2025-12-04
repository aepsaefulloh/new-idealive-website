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

export const useImageCompression = () => {
  const compressImage = async (
    file: File,
    customOptions: CompressionOptions = {}
  ): Promise<CompressionResult> => {
    // Guard: Hanya jalankan di client-side (browser)
    // typeof window adalah cara yang paling reliable untuk detect client vs server
    if (typeof window === 'undefined') {
      return { success: false, error: 'Image compression only available on client-side' }
    }

    // Dynamic import library (hanya load di browser, tidak di server)
    // Ini memastikan webpack/vite tidak try load di server-side
    const imageCompression = await import('browser-image-compression')

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File is not an image' }
    }

    const originalSize = file.size

    const defaultOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      quality: 0.85,
      fileType: 'image/webp'
    }

    const options = { ...defaultOptions, ...customOptions }

    try {
      const compressedFile = await imageCompression.default(file, options)
      const compressedSize = compressedFile.size
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
      return {
        success: false,
        error: (error as Error).message || 'Failed to compress image'
      }
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
  }

  const getCompressionMessage = (originalSize: number, compressedSize: number): string => {
    const original = formatFileSize(originalSize)
    const compressed = formatFileSize(compressedSize)
    const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1)
    return compressedSize >= originalSize
      ? `Image converted to WebP: ${original}`
      : `Compressed to WebP: ${original} → ${compressed} (${ratio}% reduction)`
  }

  return { compressImage, formatFileSize, getCompressionMessage }
}