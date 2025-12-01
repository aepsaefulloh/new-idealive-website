<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white font-syne">Projects</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage and organize your portfolio projects</p>
      </div>
      <div class="flex items-center gap-3">
        <Button @click="refreshProjects" :loading="projectsStore.isLoading" variant="outline"
          icon="i-heroicons-arrow-path">
          <span class="hidden sm:inline">Refresh</span>
        </Button>
        <Button @click="showCreateModal = true" variant="primary" icon="i-heroicons-plus">
          New Project
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Projects</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ projectsStore.totalProjects }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-folder" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Published</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{projectsStore.projects.filter(p =>
            p.published).length }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Featured</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ projectsStore.featuredProjects.length }}
          </p>
        </div>
        <div class="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-star" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
      </div>
    </div>

    <!-- Success & Error Messages -->
    <Transition name="fade">
      <div v-if="successMessage"
        class="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
        <p class="text-green-800 dark:text-green-200 text-sm font-medium">{{ successMessage }}</p>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="errorMessage"
        class="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
        <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-600 dark:text-red-400" />
        <p class="text-red-800 dark:text-red-200 text-sm font-medium">{{ errorMessage }}</p>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="projectsStore.isLoading && !projectsStore.projects.length"
      class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-500 dark:text-gray-400 font-medium">Loading projects...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!projectsStore.projects.length"
      class="bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
      <div class="w-20 h-20 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-heroicons-folder-plus" class="w-10 h-10 text-gray-400" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No Projects Yet</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Start building your portfolio by adding your
        first project. Showcase your best work to the world.</p>
      <Button @click="showCreateModal = true" variant="primary" size="lg">
        Add Your First Project
      </Button>
    </div>

    <!-- Projects Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="project in projectsStore.projects" :key="project.id"
        class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full">

        <!-- Project Image -->
        <div class="aspect-video bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
          <img v-if="project.thumbnail_url" :src="project.thumbnail_url" :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800">
            <UIcon name="i-heroicons-photo" class="w-12 h-12 opacity-20" />
          </div>

          <!-- Overlay Actions -->
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
            <Button @click="editProject(project)" variant="secondary" size="sm" icon="i-heroicons-pencil-square"
              title="Edit" />
            <Button @click="confirmDelete(project)" variant="danger" size="sm" icon="i-heroicons-trash"
              title="Delete" />
            <Button v-if="project.demo_url" :to="project.demo_url" target="_blank" variant="secondary" size="sm"
              icon="i-heroicons-eye" title="View Demo" />
          </div>

          <!-- Status Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-2">
            <span v-if="project.featured"
              class="px-2.5 py-1 bg-yellow-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-sm">
              Featured
            </span>
            <span v-if="!project.published"
              class="px-2.5 py-1 bg-gray-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-sm">
              Draft
            </span>
          </div>
        </div>

        <!-- Project Info -->
        <div class="p-5 flex-1 flex flex-col">
          <div class="flex items-start justify-between gap-2 mb-2">
            <h3
              class="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ project.title }}</h3>
            <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap mt-1">{{
              formatDate(project.created_at,'type1') }}</span>
          </div>

          <div class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1"
            v-html="stripHtml(project.description)"></div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-1.5 mt-auto">
            <span v-for="tag in (project.tags || []).slice(0, 3)" :key="tag"
              class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md font-medium">
              {{ tag }}
            </span>
            <span v-if="(project.tags || []).length > 3"
              class="px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-md font-medium">
              +{{ (project.tags || []).length - 3 }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModals">
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white font-syne">
              {{ showEditModal ? 'Edit Project' : 'Create New Project' }}
            </h2>
            <button @click="closeModals"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
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
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter project title" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select v-model="form.category_id"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option value="">Select a category (optional)</option>
                <option v-for="category in categoriesStore.projectCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug
              </label>
              <input v-model="form.slug" type="text" :readonly="!showEditModal"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="auto-generated-from-title" />
              <p class="text-xs text-gray-500 mt-1">URL-friendly identifier {{ showEditModal ? '(editable)' : '(auto-generated)' }}</p>
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
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="2024" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Role
              </label>
              <input v-model="form.role" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Full Stack Developer" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <input v-model="form.duration" type="text"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="https://demo.example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL
              </label>
              <input v-model="form.github_url" type="url"
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <div v-if="thumbnailPreview" class="relative group">
                  <img :src="thumbnailPreview" alt="Thumbnail preview"
                    class="w-full h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
                  <button @click="removeThumbnail"
                    class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
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
                  class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                <div v-if="bannerPreview" class="relative group">
                  <img :src="bannerPreview" alt="Banner preview"
                    class="w-full h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
                  <button @click="removeBanner"
                    class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div>
            <TaggingSelector v-model="form.tags" label="Technologies/Tags"
              placeholder="Type a tag, press Tab or Enter" />
          </div>

          <!-- Features -->
          <div>
            <TaggingSelector v-model="form.features" label="Key Features"
              placeholder="Describe a key feature, press Tab or Enter" :allow-duplicates="false" />
          </div>

          <!-- Settings -->
          <div
            class="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="form.featured" type="checkbox"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Project</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input v-model="form.published" type="checkbox"
                class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
            </label>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" @click="closeModals" variant="outline">
              Cancel
            </Button>
            <Button type="submit" :loading="projectsStore.isLoading" variant="primary">
              {{ projectsStore.isLoading ? 'Saving...' : (showEditModal ? 'Update Project' : 'Create Project') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useAdminProjectsStore, useAdminCategoriesStore } from '@/stores'
import { formatDate, slugify } from '@/utils'
import TipTapEditor from '@/components/TipTapEditor.vue'
import Button from '@/components/dashboard/ui/Button.vue'
import TaggingSelector from '@/components/dashboard/ui/TaggingSelector.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const projectsStore = useAdminProjectsStore()
const categoriesStore = useAdminCategoriesStore()
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
  slug: '',
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
  category_id: null,
  featured: false,
  published: true,
})

watch(() => form.value.title, (newTitle, oldTitle) => {
  if (newTitle && newTitle !== oldTitle) {
    const newSlug = slugify(newTitle)
    if (form.value.slug !== newSlug) {
      form.value.slug = newSlug
    }
  }
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
    slug: project.slug || '',
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
    category_id: project.category_id || null,
    featured: project.featured || false,
    published: project.published !== undefined ? project.published : true,
  }
  thumbnailPreview.value = project.thumbnail_url || ''
  bannerPreview.value = project.banner_url || ''
  showEditModal.value = true
}

// Confirm Delete
const confirmDelete = async (project) => {
  if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
    const result = await projectsStore.deleteProject(project.id)
    if (result.success) {
      toast.success('Project deleted successfully!')
    } else {
      toast.error(result.error || 'Failed to delete project')
    }
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
    category_id: null,
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
  await categoriesStore.fetchCategories()

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