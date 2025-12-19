<template>
  <div>
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Portfolio CMS</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content, hero section, and contact form
        submissions</p>
    </div>

    <!-- Content Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Hero Section Management -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center mb-6">
          <UIcon name="i-heroicons-star" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Hero Section</h2>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input v-model="heroSection.title" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              placeholder="Enter hero title" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
            <input v-model="heroSection.subtitle" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500"
              placeholder="Enter hero subtitle" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea v-model="heroSection.description" rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Enter hero description"></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Hero Image</label>
            <div class="space-y-2">
                <input ref="heroImageInput" type="file" accept="image/*" @change="handleHeroImageUpload"
                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                <div v-if="heroImagePreview" class="relative group w-fit">
                    <img :src="heroImagePreview" alt="Hero image preview"
                        class="h-32 w-auto object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
                    <button @click="removeHeroImage"
                        class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                    </button>
                </div>
            </div>
          </div>
          <Button @click="saveHeroSection" :loading="isLoading" variant="primary" block>
            Save Hero Section
          </Button>
        </div>
      </div>

      <!-- About Section Management -->
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
    </div>

    <!-- Contact Information Management -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-center mb-6">
        <UIcon name="i-heroicons-phone" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input v-model="contactInfo.email" type="email"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="your.email@example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input v-model="contactInfo.phone" type="tel"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="+1 (234) 567-890" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input v-model="contactInfo.location" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="City, Country" />
          </div>
          <div class="grid md:grid-cols-2 gap-6">
             <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Map URL</label>
              <input v-model="contactInfo.map_url" type="url"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                placeholder="https://maps.google.com/..." />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Iframe</label>
              <input v-model="contactInfo.map_url_iframe" type="url"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                placeholder="https://maps.google.com/..." />
            </div>
           
          </div>

        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Facebook URL</label>
            <input v-model="contactInfo.facebook_url" type="url"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="https://facebook.com/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
            <input v-model="contactInfo.linkedin_url" type="url"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter URL</label>
            <input v-model="contactInfo.twitter_url" type="url"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="https://twitter.com/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dribbble URL</label>
            <input v-model="contactInfo.dribbble_url" type="url"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="https://dribbble.com/username" />
          </div>
        </div>
      </div>
      <div class="mt-6">
        <button @click="saveContactInfo"
          class="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Save Contact Information' }}
        </button>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-folder" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
        </div>
        <NuxtLink to="/xms/projects"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
          Manage Projects
        </NuxtLink>
      </div>
      <div class="space-y-4">
        <div v-for="project in projectsStore.projects.slice(0, 4)" :key="project.id"
          class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ project.description }}</p>
                <div v-if="project.clients" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Client: {{ project.clients.name }}
                </div>
                <div class="flex gap-2 mt-2">
                  <span v-if="project.featured"
                    class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full">
                    Featured
                  </span>
                  <span v-if="!project.published"
                    class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    Draft
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <span v-for="tag in project.tags?.slice(0, 2)" :key="tag"
                class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="projectsStore.projects.length === 0" class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No projects yet. <NuxtLink to="/xms/projects"
              class="text-purple-600 hover:text-purple-700">Add your first project</NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Contact Form Messages -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Contact Messages</h2>
        </div>
        <NuxtLink to="/xms/contact"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm">
          View All ({{ contactStore.totalMessages }})
        </NuxtLink>
      </div>

      <!-- Latest Messages Preview -->
      <div v-if="contactStore.isLoading" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">Loading messages...</p>
      </div>
      <div v-else-if="contactStore.messages.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No contact messages yet</p>
      </div>
      <div v-else class="space-y-4">
        <div v-for="message in recentMessages" :key="message.id"
          class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          :class="!message.read ? 'border-l-4 border-l-red-600' : ''">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ message.name }}</h3>
                <span v-if="!message.read"
                  class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 text-xs font-semibold rounded">
                  NEW
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ message.email }}</p>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{{ message.subject }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formatDate(message.created_at) }}</p>
            </div>
            <NuxtLink to="/xms/contact"
              class="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors">
              View
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useSupabaseStore, useAuthStore, useContactStore, useAdminProjectsStore, useAdminCmsStore } from '@/stores'
import { compressForThumbnail, formatFileSize } from '@/utils/imageCompression'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const supabaseStore = useSupabaseStore()
const authStore = useAuthStore()
const contactStore = useContactStore()
const projectsStore = useAdminProjectsStore()
const cmsStore = useAdminCmsStore()

const isLoading = ref(false)
const heroImageFile = ref(null)
const heroImagePreview = ref('')
const heroImageInput = ref(null)

const aboutImageFile = ref(null)
const aboutImagePreview = ref('')
const aboutImageInput = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const recentMessages = computed(() => contactStore.messages.slice(0, 3))
const heroSection = computed(() => cmsStore.heroSection)
const aboutSection = computed(() => cmsStore.aboutSection)
const contactInfo = computed(() => cmsStore.contactInfo)

const projects = computed(() => projectsStore.projects)


const loadContactMessages = async () => {
  await contactStore.fetchMessages()
}


const loadProjects = async () => {
  await projectsStore.fetchProjects()
}


const loadCmsData = async () => {
  await cmsStore.loadAllCmsData()
  // Initialize previews from store data
  if (heroSection.value?.image_url) {
    heroImagePreview.value = heroSection.value.image_url
  }
  if (aboutSection.value?.image_url) {
    aboutImagePreview.value = aboutSection.value.image_url
  }
}

const handleHeroImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      toast.info('Compressing image...')
      const compressed = await compressForThumbnail(file)
      console.log(`Hero image compressed: ${formatFileSize(compressed.originalSize)} → ${formatFileSize(compressed.compressedSize)} (${compressed.compressionRatio}% reduction)`)

      heroImageFile.value = compressed.file
      heroImagePreview.value = compressed.dataUrl
      toast.success(`Image compressed (${compressed.compressionRatio}% smaller) - will upload on save`)
    } catch (error) {
      console.error('Image compression failed:', error)
      toast.error('Failed to compress image')
    }
  }
}

const removeHeroImage = () => {
  heroImagePreview.value = ''
  heroImageFile.value = null
  if (heroImageInput.value) {
    heroImageInput.value.value = ''
  }
  // If we are removing an existing saved image, we might want to flag it or handle it in save
  // For now, simpler to just clear preview and let save handle store update 
  // (NOTE: To strictly delete from DB/Storage requires more logic, here we just update data to empty string if intended)
  heroSection.value.image_url = ''
}

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

const saveHeroSection = async () => {
  try {
    let finalImageUrl = heroSection.value.image_url || ''

    if (heroImageFile.value) {
      toast.info('Uploading hero image...')
      finalImageUrl = await uploadFile(heroImageFile.value, 'hero')
    }

    const payload = {
      ...heroSection.value,
      image_url: finalImageUrl
    }

    const result = await cmsStore.updateHeroSection(payload)
    if (result.success) {
      toast.success(cmsStore.heroSuccess)
      // Reset file input after successful save
      heroImageFile.value = null
    } else {
      toast.error(result.error || 'Failed to save hero section')
    }
  } catch (err) {
      console.error('Save failed:', err)
      toast.error('Failed to save hero section')
  }
}

const saveAboutSection = async () => {
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
       // Reset file input after successful save
       aboutImageFile.value = null
    } else {
      toast.error(result.error || 'Failed to save about section')
    }
  } catch (err) {
      console.error('Save failed:', err)
      toast.error('Failed to save about section')
  }
}


const saveContactInfo = async () => {
  const result = await cmsStore.updateContactInfo(contactInfo.value)
  if (result.success) {
    toast.success(cmsStore.contactInfoSuccess)
  } else {
    toast.error(result.error || 'Failed to save contact information')
  }
}


onMounted(async () => {
  await loadContactMessages()
  await loadProjects()
  await loadCmsData()
})
</script>

<style scoped></style>
