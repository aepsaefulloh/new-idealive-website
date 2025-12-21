<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
    <div class="flex items-center mb-6">
      <UIcon name="i-heroicons-user" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
      <h2 class="text-xl font-bold text-gray-900 dark:text-white">About Me</h2>
    </div>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
        <textarea v-model="aboutSection.bio" rows="4"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter your bio"></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea v-model="aboutSection.description" rows="4"
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter your description"></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">About Image</label>
        <div class="space-y-2">
          <input ref="aboutImageInput" type="file" accept="image/*" @change="handleAboutImageUpload"
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          <div v-if="aboutImagePreview" class="relative group w-fit">
            <img :src="aboutImagePreview" alt="About image preview"
              class="h-32 w-auto object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
            <button @click="removeAboutImage"
              class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
              <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <Button @click="saveAboutSection" :loading="isLoading" variant="primary" block>
        Save About Section
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useAdminCmsStore } from '@/stores'
import { compressForThumbnail, formatFileSize } from '@/utils/imageCompression'
import Button from '@/components/dashboard/ui/Button.vue'

const cmsStore = useAdminCmsStore()
const isLoading = ref(false)
const aboutImageFile = ref(null)
const aboutImagePreview = ref('')
const aboutImageInput = ref(null)

const aboutSection = computed(() => cmsStore.aboutSection)

// Initialize preview when data is loaded
watch(() => aboutSection.value?.image_url, (newUrl) => {
  if (newUrl) {
    aboutImagePreview.value = newUrl
  }
}, { immediate: true })

const handleAboutImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      toast.info('Compressing image...')
      const compressed = await compressForThumbnail(file)
      console.log(`About image compressed: ${formatFileSize(compressed.originalSize)} → ${formatFileSize(compressed.compressedSize)} (${compressed.compressionRatio}% reduction)`)

      aboutImageFile.value = compressed.file
      aboutImagePreview.value = compressed.dataUrl
      toast.success(`Image compressed (${compressed.compressionRatio}% smaller) - will upload on save`)
    } catch (error) {
      console.error('Image compression failed:', error)
      toast.error('Failed to compress image')
    }
  }
}

const removeAboutImage = () => {
  aboutImagePreview.value = ''
  aboutImageFile.value = null
  if (aboutImageInput.value) {
    aboutImageInput.value.value = ''
  }
  aboutSection.value.image_url = ''
}

const uploadFile = async (file, folder = 'cms_images') => {
  const supabase = useNuxtApp().$supabase
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2)}.webp`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file, {
      contentType: 'image/webp',
      cacheControl: '3600',
    })

  if (error) {
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)

  return publicUrl
}

const saveAboutSection = async () => {
  isLoading.value = true
  try {
    let finalImageUrl = aboutSection.value.image_url || ''

    if (aboutImageFile.value) {
      toast.info('Uploading about image...')
      finalImageUrl = await uploadFile(aboutImageFile.value, 'about')
    }

    const payload = {
      ...aboutSection.value,
      image_url: finalImageUrl
    }

    const result = await cmsStore.updateAboutSection(payload)
    if (result.success) {
      toast.success(cmsStore.aboutSuccess)
      aboutImageFile.value = null
    } else {
      toast.error(result.error || 'Failed to save about section')
    }
  } catch (err) {
    console.error('Save failed:', err)
    toast.error('Failed to save about section')
  } finally {
    isLoading.value = false
  }
}
</script>
