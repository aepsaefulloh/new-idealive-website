<template>
  <div class="w-full">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Articles Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Create, edit, and manage your blog articles</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-gray-900 dark:text-white">{{ articlesStore.totalArticles }}</div>
          <p class="text-gray-600 dark:text-gray-400">Total Articles</p>
          <div class="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">
            {{ articlesStore.publishedArticles.length }} Published
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
      <Button @click="showCreateModal = true" variant="primary" icon="i-heroicons-plus">
        Add New Article
      </Button>
      <Button @click="refreshArticles" :loading="articlesStore.isLoading" variant="outline" icon="i-heroicons-arrow-path">
        Refresh
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="articlesStore.isLoading && !articlesStore.articles.length" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading articles...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!articlesStore.articles.length"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
      <div class="text-5xl mb-4">📝</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Articles Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Start writing your first article to share your knowledge</p>
      <Button @click="showCreateModal = true" variant="primary" size="lg">
        Write Your First Article
      </Button>
    </div>

    <!-- Articles Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="article in articlesStore.articles" :key="article.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
        <!-- Article Image -->
        <div
          class="aspect-video bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 flex items-center justify-center relative overflow-hidden">
          <div v-if="article.thumbnail_url" class="w-full h-full">
            <img :src="article.thumbnail_url" :alt="article.title" class="w-full h-full object-cover" />
          </div>
          <div v-else class="text-6xl">
            <img src="https://placehold.co/600x400?text=No+Image+Available" alt="No Image Available" />
          </div>
          <!-- Status Badges -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span v-if="article.featured" class="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded">
              Featured
            </span>
            <span v-if="article.published" class="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
              Published
            </span>
            <span v-else class="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded">
              Draft
            </span>
          </div>
        </div>

        <!-- Article Info -->
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ article.title }}</h3>
          <div class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2"
            v-html="stripHtml(article.excerpt || article.content)"></div>

          <!-- Category -->
          <div v-if="article.categories" class="mb-4">
            <span
              class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {{ article.categories.name }}
            </span>
          </div>

          <!-- Meta Info -->
          <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
            <span>{{ article.read_time }} min read</span>
            <span>{{ formatDate(article.created_at) }}</span>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <Button @click="editArticle(article)" variant="ghost" size="sm" icon="i-heroicons-pencil" class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Edit Article" />
              <Button @click="toggleFeatured(article.id)" variant="ghost" size="sm" icon="i-heroicons-star" 
                :class="article.featured ? 'text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'"
                :title="article.featured ? 'Remove from featured' : 'Add to featured'" />
              <Button @click="togglePublished(article.id)" variant="ghost" size="sm" icon="i-heroicons-eye"
                :class="article.published ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'"
                :title="article.published ? 'Unpublish' : 'Publish'" />
            </div>
            <Button @click="deleteArticle(article.id)" variant="ghost" size="sm" icon="i-heroicons-trash" class="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete Article" />
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
              {{ showEditModal ? 'Edit Article' : 'Create New Article' }}
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
                Article Title *
              </label>
              <input v-model="form.title" type="text" required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter article title" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select v-model="form.category_id"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option value="">Select a category (optional)</option>
                <option v-for="category in categoriesStore.articleCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Excerpt & Content -->
          <div class="grid md:grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Excerpt *
              </label>
              <TipTapEditor v-model="form.excerpt" placeholder="Brief summary of the article" :limit="300"
                class="w-full" />
              <p class="text-xs text-gray-500 mt-1">Maximum 300 characters</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Content *
              </label>
              <TipTapEditor v-model="form.content" placeholder="Write your article content here..." :limit="10000"
                class="w-full" />
              <p class="text-xs text-gray-500 mt-1">Maximum 10000 characters</p>
            </div>
          </div>

          <!-- Article Details -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Read Time (minutes)
              </label>
              <input v-model.number="form.read_time" type="number" min="1" max="60"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="5" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug
              </label>
              <input v-model="form.slug" type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="auto-generated-from-title" />
              <p class="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
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
              Tags
            </label>
            <div class="flex flex-wrap gap-2 mb-2">
              <span v-for="(tag, index) in form.tags" :key="index"
                class="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                {{ tag }}
                <button @click="removeTag(index)" class="hover:text-red-500">
                  <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
                </button>
              </span>
            </div>
            <input v-model="newTag" @keyup.enter="addTag" type="text"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Add tag (press Enter)" />
          </div>

          <!-- Settings -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input v-model="form.featured" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Featured Article</span>
            </label>
            <label class="flex items-center gap-2">
              <input v-model="form.published" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
            </label>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" @click="closeModals" variant="outline">
              Cancel
            </Button>
            <Button type="submit" :loading="articlesStore.isLoading" variant="primary">
              {{ articlesStore.isLoading ? 'Saving...' : (showEditModal ? 'Update Article' : 'Create Article') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useAdminArticlesStore } from '@/stores/modules/admin/articles'
import { useAdminCategoriesStore } from '@/stores/modules/admin/categories'
import TipTapEditor from '@/components/TipTapEditor.vue'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const articlesStore = useAdminArticlesStore()
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
  excerpt: '',
  content: '',
  thumbnail_url: '',
  banner_url: '',
  tags: [],
  read_time: 5,
  category_id: null,
  featured: false,
  published: false,
})

// File handling
const thumbnailInput = ref(null)
const bannerInput = ref(null)
const thumbnailPreview = ref('')
const bannerPreview = ref('')
const newTag = ref('')

// Helper function to strip HTML tags for preview
const stripHtml = (html) => {
  if (!html) return ''
  const tmp = document.createElement('DIV')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Load articles on mount
const loadArticles = async () => {
  await articlesStore.fetchArticles()
}

// Refresh articles
const refreshArticles = async () => {
  await loadArticles()
}

// Edit article
const editArticle = (article) => {
  articlesStore.selectArticle(article)
  form.value = {
    title: article.title || '',
    slug: article.slug || '',
    excerpt: article.excerpt || '',
    content: article.content || '',
    thumbnail_url: article.thumbnail_url || '',
    banner_url: article.banner_url || '',
    tags: article.tags || [],
    read_time: article.read_time || 5,
    category_id: article.category_id || null,
    featured: article.featured || false,
    published: article.published !== undefined ? article.published : false,
  }
  thumbnailPreview.value = article.thumbnail_url || ''
  bannerPreview.value = article.banner_url || ''
  showEditModal.value = true
}

// Delete article
const deleteArticle = async (id) => {
  if (confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
    const result = await articlesStore.deleteArticle(id)
    if (result.success) {
      toast.success('Article deleted successfully!')
    } else {
      toast.error(result.error || 'Failed to delete article')
    }
  }
}

// Toggle featured
const toggleFeatured = async (id) => {
  const result = await articlesStore.toggleFeatured(id)
  if (result.success) {
    toast.success('Article featured status updated!')
  } else {
    toast.error(result.error || 'Failed to update featured status')
  }
}

// Toggle published
const togglePublished = async (id) => {
  const result = await articlesStore.togglePublished(id)
  if (result.success) {
    toast.success('Article published status updated!')
  } else {
    toast.error(result.error || 'Failed to update published status')
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (showEditModal.value && !articlesStore.selectedArticle?.id) {
    toast.error('No article selected for editing')
    return
  }

  const payload = {
    ...form.value,
    thumbnail_url: thumbnailPreview.value,
    banner_url: bannerPreview.value,
  }

  let result
  if (showEditModal.value) {
    result = await articlesStore.updateArticle(articlesStore.selectedArticle.id, payload)
  } else {
    result = await articlesStore.createArticle(payload)
  }

  if (result.success) {
    toast.success(result.message || (showEditModal.value ? 'Article updated successfully!' : 'Article created successfully!'))
    closeModals()
    resetForm()
  } else {
    toast.error(result.error || 'Failed to save article')
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
  const filePath = `articles/${fileName}`

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

// Close modals
const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  articlesStore.clearSelection()
  resetForm()
}

// Reset form
const resetForm = () => {
  form.value = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    thumbnail_url: '',
    banner_url: '',
    tags: [],
    read_time: 5,
    category_id: null,
    featured: false,
    published: false,
  }
  thumbnailPreview.value = ''
  bannerPreview.value = ''
  newTag.value = ''
  if (thumbnailInput.value) thumbnailInput.value.value = ''
  if (bannerInput.value) bannerInput.value.value = ''
}

onMounted(async () => {
  await loadArticles()
  await categoriesStore.fetchCategories()

  // Subscribe to real-time updates
  subscription = articlesStore.subscribeToUpdates((payload) => {
    console.log('Real-time article update received:', payload)
    loadArticles()
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