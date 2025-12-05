/**
 * Image Compression Utility
 * Converts images to WebP format with configurable compression quality
 */

/**
 * Compress and convert image to WebP format
 * @param {File} file - The image file to compress
 * @param {Object} options - Compression options
 * @param {number} options.quality - Quality of compression (0-1), default 0.75
 * @param {number} options.maxWidth - Maximum width of the output image
 * @param {number} options.maxHeight - Maximum height of the output image
 * @returns {Promise<{blob: Blob, file: File, dataUrl: string}>} - Compressed image data
 */
export async function compressImage(file, options = {}) {
  const {
    quality = 0.75,
    maxWidth = 1920,
    maxHeight = 1080,
  } = options

  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File is not an image'))
      return
    }

    const reader = new FileReader()
    
    reader.onload = (event) => {
      const img = new Image()
      
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = calculateDimensions(img.width, img.height, maxWidth, maxHeight)
        
        // Create canvas for compression
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        
        const ctx = canvas.getContext('2d')
        
        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height)
        
        // Convert to WebP blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to compress image'))
              return
            }
            
            // Create a new File object with .webp extension
            const originalName = file.name.replace(/\.[^/.]+$/, '')
            const compressedFile = new File([blob], `${originalName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            })
            
            // Get data URL for preview
            const dataUrl = canvas.toDataURL('image/webp', quality)
            
            resolve({
              blob,
              file: compressedFile,
              dataUrl,
              originalSize: file.size,
              compressedSize: blob.size,
              compressionRatio: ((1 - blob.size / file.size) * 100).toFixed(2),
              width,
              height,
            })
          },
          'image/webp',
          quality
        )
      }
      
      img.onerror = () => {
        reject(new Error('Failed to load image'))
      }
      
      img.src = event.target.result
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsDataURL(file)
  })
}

/**
 * Calculate dimensions while maintaining aspect ratio
 * @param {number} originalWidth - Original image width
 * @param {number} originalHeight - Original image height
 * @param {number} maxWidth - Maximum allowed width
 * @param {number} maxHeight - Maximum allowed height
 * @returns {{width: number, height: number}} - New dimensions
 */
function calculateDimensions(originalWidth, originalHeight, maxWidth, maxHeight) {
  let width = originalWidth
  let height = originalHeight
  
  // Check if resizing is needed
  if (width > maxWidth || height > maxHeight) {
    const widthRatio = maxWidth / width
    const heightRatio = maxHeight / height
    const ratio = Math.min(widthRatio, heightRatio)
    
    width = Math.round(width * ratio)
    height = Math.round(height * ratio)
  }
  
  return { width, height }
}

/**
 * Compress image with thumbnail preset (smaller size)
 * @param {File} file - The image file to compress
 * @returns {Promise<Object>} - Compressed image data
 */
export async function compressForThumbnail(file) {
  return compressImage(file, {
    quality: 0.75,
    maxWidth: 800,
    maxHeight: 600,
  })
}

/**
 * Compress image with banner preset (larger size)
 * @param {File} file - The image file to compress
 * @returns {Promise<Object>} - Compressed image data
 */
export async function compressForBanner(file) {
  return compressImage(file, {
    quality: 0.75,
    maxWidth: 1920,
    maxHeight: 1080,
  })
}

/**
 * Format file size for display
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
