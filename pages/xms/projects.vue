<template>
  <div class="w-full">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Projects Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Create, edit, and manage your portfolio projects</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-gray-900 dark:text-white">{{ projectsStore.totalProjects }}</div>
          <p class="text-gray-600 dark:text-gray-400">Total Projects</p>
          <div class="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">
            {{ projectsStore.featuredProjects.length }} Featured
          </div>
        </div>
      </div>
    </div>

    <!-- Success & Error Messages -->
    <Transition name="fade">
      <div v-if="successMessage"
        class="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
        <p class="text-green-800 dark:text-green-200">✓ {{ successMessage }}</p>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="errorMessage"
        class="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
        <p class="text-red-800 dark:text-red-200">✗ {{ errorMessage }}</p>
      </div>
    </Transition>

    <!-- Action Buttons -->
    <div class="mb-6 flex gap-4">
      <button @click="showCreateModal = true"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
        <UIcon name="i-heroicons-plus" class="w-5 h-5" />
        Add New Project
      </button>
      <button @click="refreshProjects" :disabled="projectsStore.isLoading"
        class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2">
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5" />
        Refresh
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="projectsStore.isLoading && !projectsStore.projects.length" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!projectsStore.projects.length"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
      <div class="text-5xl mb-4">🚀</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Projects Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Start building your portfolio by adding your first project</p>
      <button @click="showCreateModal = true"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
        Add Your First Project
      </button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projectsStore.projects" :key="project.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <!-- Project Image -->
        <div
          class="aspect-video bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center relative overflow-hidden">
          <div v-if="project.thumbnail_url" class="w-full h-full">
            <img :src="project.thumbnail_url" :alt="project.title" class="w-full h-full object-cover" />
          </div>
          <div v-else class="text-6xl">
            <img src="https://placehold.co/600x400?text=No+Image+Available" alt="No Image Available" />
          </div>
          <!-- Status Badges -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span v-if="project.featured" class="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
              Featured
            </span>
            <span v-if="!project.published" class="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
              Draft
            </span>
          </div>
        </div>

        <!-- Project Info -->
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ project.title }}</h3>
          <div class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2"
            v-html="stripHtml(project.description)"></div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span v-for="tag in project.tags?.slice(0, 3)" :key="tag"
              class="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {{ tag }}
            </span>
            <span v-if="project.tags?.length > 3" class="text-xs px-2 py-1 text-gray-500">
              +{{ project.tags.length - 3 }} more
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <button @click="editProject(project)"
                class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                title="Edit Project">
                <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
              </button>
              <button @click="toggleFeatured(project.id)"
                :class="project.featured ? 'text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                class="p-2 hover:bg-opacity-20 rounded-lg transition-colors"
                :title="project.featured ? 'Remove from featured' : 'Add to featured'">
                <UIcon name="i-heroicons-star" class="w-4 h-4" />
              </button>
              <button @click="togglePublished(project.id)"
                :class="project.published ? 'text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'"
                class="p-2 hover:bg-opacity-20 rounded-lg transition-colors"
                :title="project.published ? 'Unpublish' : 'Publish'">
                <UIcon name="i-heroicons-eye" class="w-4 h-4" />
              </button>
            </div>
            <button @click="deleteProject(project.id)"
              class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="Delete Project">
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModals">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Project' : 'Create New Project' }}
            </h2>
            <button @click="closeModals"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Basic Info -->
          <div class="grid md:grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title *
              </label>
              <input v-model="form.title" type="text" required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project title" />
            </div>
           
          </div>

          <!-- Description & Overview -->
          <div class="grid md:grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <TipTapEditor v-model="form.description" placeholder="Brief project description" :limit="500"
                class="w-full" />
              <p class="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Detailed Overview
              </label>
              <TipTapEditor v-model="form.overview" placeholder="Detailed project overview" :limit="2000"
                class="w-full" />
              <p class="text-xs text-gray-500 mt-1">Maximum 2000 characters</p>
            </div>
          </div>

          <!-- Project Details -->
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year
              </label>
              <input v-model="form.year" type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="2024" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Role
              </label>
              <input v-model="form.role" type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Full Stack Developer" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input v-model="form.duration" type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="3 months" />
            </div>
          </div>

          <!-- Links -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Demo URL
              </label>
              <input v-model="form.demo_url" type="url"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://demo.example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input v-model="form.github_url" type="url"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/username/repo" />
            </div>
          </div>

          <!-- File Uploads -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Thumbnail Image
              </label>
              <div class="space-y-2">
                <input ref="thumbnailInput" type="file" accept="image/*" @change="handleThumbnailUpload"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <div v-if="thumbnailPreview" class="relative">
                  <img :src="thumbnailPreview" alt="Thumbnail preview" class="w-full h-32 object-cover rounded-lg" />
                  <button @click="removeThumbnail"
                    class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Banner Image
              </label>
              <div class="space-y-2">
                <input ref="bannerInput" type="file" accept="image/*" @change="handleBannerUpload"
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <div v-if="bannerPreview" class="relative">
                  <img :src="bannerPreview" alt="Banner preview" class="w-full h-32 object-cover rounded-lg" />
                  <button @click="removeBanner"
                    class="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Technologies/Tags
            </label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(tag, index) in form.tags" :key="index"
                class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                {{ tag }}
                <button @click="removeTag(index)" class="hover:text-red-500">
                  <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
              </span>
            </div>
            <input v-model="newTag" @keyup.enter="addTag" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Add technology (press Enter)" />
          </div>

          <!-- Features -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Features
            </label>
            <div class="space-y-2 mb-2">
              <div v-for="(feature, index) in form.features" :key="index"
                class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span class="flex-1 text-gray-900 dark:text-white">{{ feature }}</span>
                <button @click="removeFeature(index)" class="text-red-500 hover:text-red-700">
                  <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <input v-model="newFeature" @keyup.enter="addFeature" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Add feature (press Enter)" />
          </div>

          <!-- Settings -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input v-model="form.featured" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.published" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
            </label>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button type="button" @click="closeModals"
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="projectsStore.isLoading"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ projectsStore.isLoading ? 'Saving...' : (showEditModal ? 'Update Project' : 'Create Project') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useProjectsStore } from '@/stores/modules/projects'
import TipTapEditor from '@/components/TipTapEditor.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const projectsStore = useProjectsStore()
let subscription = null

// Reactive variables for toast messages
const successMessage = ref('')
const errorMessage = ref('')

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)

// Form data
const form = ref({
  title: '',
  description: '',
  overview: '',
  thumbnail_url: '',
  banner_url: '',
  tags: [],
  features: [],
  year: '',
  role: '',
  duration: '',
  demo_url: '',
  github_url: '',
  featured: false,
  published: true,
})

// File handling
const thumbnailInput = ref(null)
const bannerInput = ref(null)
const thumbnailPreview = ref('')
const bannerPreview = ref('')
const newTag = ref('')
const newFeature = ref('')

// Helper function to strip HTML tags for preview
const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Load projects on mount
const loadProjects = async () => {
  await projectsStore.fetchProjects()
}

// Refresh projects
const refreshProjects = async () => {
  await loadProjects()
}

// Edit project
const editProject = (project) => {
  projectsStore.selectProject(project)
  form.value = {
    title: project.title || '',
    description: project.description || '',
    overview: project.overview || '',
    thumbnail_url: project.thumbnail_url || '',
    banner_url: project.banner_url || '',
    tags: project.tags || [],
    features: project.features || [],
    year: project.year || '',
    role: project.role || '',
    duration: project.duration || '',
    demo_url: project.demo_url || '',
    github_url: project.github_url || '',
    featured: project.featured || false,
    published: project.published !== undefined ? project.published : true,
  }
  thumbnailPreview.value = project.thumbnail_url || ''
  bannerPreview.value = project.banner_url || ''
  showEditModal.value = true
}

// Delete project
const deleteProject = async (id) => {
  if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
    const result = await projectsStore.deleteProject(id)
    if (result.success) {
      toast.success('Project deleted successfully!')
    } else {
      toast.error(result.error || 'Failed to delete project')
    }
  }
}

// Toggle featured
const toggleFeatured = async (id) => {
  const result = await projectsStore.toggleFeatured(id)
  if (result.success) {
    toast.success('Project featured status updated!')
  } else {
    toast.error(result.error || 'Failed to update featured status')
  }
}

// Toggle published
const togglePublished = async (id) => {
  const result = await projectsStore.togglePublished(id)
  if (result.success) {
    toast.success('Project published status updated!')
  } else {
    toast.error(result.error || 'Failed to update published status')
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (showEditModal.value && !projectsStore.selectedProject?.id) {
    toast.error('No project selected for editing')
    return
  }

  const payload = {
    ...form.value,
    thumbnail_url: thumbnailPreview.value,
    banner_url: bannerPreview.value,
  }

  let result
  if (showEditModal.value) {
    result = await projectsStore.updateProject(projectsStore.selectedProject.id, payload)
  } else {
    result = await projectsStore.createProject(payload)
  }

  if (result.success) {
    toast.success(result.message || (showEditModal.value ? 'Project updated successfully!' : 'Project created successfully!'))
    closeModals()
    resetForm()
  } else {
    toast.error(result.error || 'Failed to save project')
  }
}

// File upload handlers
const handleThumbnailUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const url = await uploadFile(file)
      thumbnailPreview.value = url
      form.value.thumbnail_url = url
    } catch (error) {
      console.error('Thumbnail upload failed:', error)
      alert('Failed to upload thumbnail')
    }
  }
}

const handleBannerUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const url = await uploadFile(file)
      bannerPreview.value = url
      form.value.banner_url = url
    } catch (error) {
      console.error('Banner upload failed:', error)
      alert('Failed to upload banner')
    }
  }
}

// Upload file to Supabase Storage
const uploadFile = async (file) => {
  const supabase = useNuxtApp().$supabase
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `projects/${fileName}`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (error) {
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return publicUrl
}

// Remove thumbnail
const removeThumbnail = () => {
  thumbnailPreview.value = ''
  form.value.thumbnail_url = ''
  if (thumbnailInput.value) {
    thumbnailInput.value.value = ''
  }
}

// Remove banner
const removeBanner = () => {
  bannerPreview.value = ''
  form.value.banner_url = ''
  if (bannerInput.value) {
    bannerInput.value.value = ''
  }
}

// Tag management
const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index) => {
  form.value.tags.splice(index, 1)
}

// Feature management
const addFeature = () => {
  if (newFeature.value.trim() && !form.value.features.includes(newFeature.value.trim())) {
    form.value.features.push(newFeature.value.trim())
    newFeature.value = ''
  }
}

const removeFeature = (index) => {
  form.value.features.splice(index, 1)
}

// Close modals
const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  projectsStore.clearSelection()
  resetForm()
}

// Reset form
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    overview: '',
    thumbnail_url: '',
    banner_url: '',
    tags: [],
    features: [],
    year: '',
    role: '',
    duration: '',
    demo_url: '',
    github_url: '',
    featured: false,
    published: true,
  }
  thumbnailPreview.value = ''
  bannerPreview.value = ''
  newTag.value = ''
  newFeature.value = ''
  if (thumbnailInput.value) thumbnailInput.value.value = ''
  if (bannerInput.value) bannerInput.value.value = ''
}

onMounted(async () => {
  await loadProjects()

  // Subscribe to real-time updates
  subscription = projectsStore.subscribeToUpdates((payload) => {
    console.log('Real-time project update received:', payload)
    loadProjects()
  })
})

onUnmounted(() => {
  if (subscription) {
    subscription.unsubscribe()
  }
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>