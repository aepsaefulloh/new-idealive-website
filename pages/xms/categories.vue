<template>
  <div class="w-full">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Create, edit, and manage project and article categories</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-gray-900 dark:text-white">{{ categoriesStore.totalCategories }}</div>
          <p class="text-gray-600 dark:text-gray-400">Total Categories</p>
          <div class="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">
            {{ categoriesStore.activeCategories.length }} Active
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
        Add New Category
      </Button>
      <Button @click="refreshCategories" :loading="categoriesStore.isLoading" variant="outline" icon="i-heroicons-arrow-path">
        Refresh
      </Button>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6">
      <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button @click="activeTab = 'all'"
          :class="activeTab === 'all' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          class="px-4 py-2 border-b-2 font-medium transition-colors">
          All Categories ({{ categoriesStore.totalCategories }})
        </button>
        <button @click="activeTab = 'project'"
          :class="activeTab === 'project' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          class="px-4 py-2 border-b-2 font-medium transition-colors">
          Projects ({{ categoriesStore.projectCategories.length }})
        </button>
        <button @click="activeTab = 'article'"
          :class="activeTab === 'article' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          class="px-4 py-2 border-b-2 font-medium transition-colors">
          Articles ({{ categoriesStore.articleCategories.length }})
        </button>
        <button @click="activeTab = 'general'"
          :class="activeTab === 'general' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          class="px-4 py-2 border-b-2 font-medium transition-colors">
          General ({{ categoriesStore.generalCategories.length }})
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="categoriesStore.isLoading && !categoriesStore.categories.length" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading categories...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!filteredCategories.length"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
      <div class="text-5xl mb-4">📂</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Categories Yet</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">Start organizing your content by adding your first category</p>
      <Button @click="showCreateModal = true" variant="primary" size="lg">
        Add Your First Category
      </Button>
    </div>

    <!-- Categories Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in filteredCategories" :key="category.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
        <!-- Category Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">{{ category.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ category.slug }}</p>
          </div>
          <div class="flex gap-2">
            <span :class="getTypeColor(category.type)"
              class="px-2 py-1 text-xs font-semibold rounded-full">
              {{ category.type }}
            </span>
            <span v-if="!category.is_active"
              class="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
              Inactive
            </span>
          </div>
        </div>

        <!-- Category Description -->
        <p v-if="category.description" class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {{ category.description }}
        </p>

        <!-- Category Stats -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span>Sort Order: {{ category.sort_order }}</span>
          <span>{{ formatDate(category.created_at) }}</span>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-between">
          <div class="flex gap-2">
            <Button @click="editCategory(category)" variant="ghost" size="sm" icon="i-heroicons-pencil" class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20" title="Edit Category" />
            <Button @click="toggleActive(category.id)" variant="ghost" size="sm" icon="i-heroicons-eye"
              :class="category.is_active ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'"
              :title="category.is_active ? 'Deactivate' : 'Activate'" />
          </div>
          <Button @click="deleteCategory(category.id)" variant="ghost" size="sm" icon="i-heroicons-trash" class="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" title="Delete Category" />
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click.self="closeModals">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ showEditModal ? 'Edit Category' : 'Create New Category' }}
            </h2>
            <button @click="closeModals"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Basic Info -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name *
              </label>
              <input v-model="form.name" type="text" required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category name" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug
              </label>
              <input v-model="form.slug" type="text"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="auto-generated-from-name" />
              <p class="text-xs text-gray-500 mt-1">URL-friendly identifier</p>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea v-model="form.description" rows="3"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of this category"></textarea>
          </div>

          <!-- Category Details -->
          <div class="grid md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type *
              </label>
              <select v-model="form.type" required
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option value="project">Project</option>
                <option value="article">Article</option>
                <option value="general">General</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Order
              </label>
              <input v-model.number="form.sort_order" type="number" min="0"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                placeholder="0" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Parent Category
              </label>
              <select v-model="form.parent_id"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500">
                <option value="">No parent (top level)</option>
                <option v-for="category in availableParentCategories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- Settings -->
          <div class="flex items-center gap-6">
            <label class="flex items-center gap-2">
              <input v-model="form.is_active" type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
            </label>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button type="button" @click="closeModals" variant="outline">
              Cancel
            </Button>
            <Button type="submit" :loading="categoriesStore.isLoading" variant="primary">
              {{ categoriesStore.isLoading ? 'Saving...' : (showEditModal ? 'Update Category' : 'Create Category') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useCategoriesStore } from '@/stores/modules/categories'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const categoriesStore = useCategoriesStore()
let subscription = null

// Reactive variables for toast messages
const successMessage = ref('')
const errorMessage = ref('')

// Modal states
const showCreateModal = ref(false)
const showEditModal = ref(false)

// Active tab for filtering
const activeTab = ref('all')

// Form data
const form = ref({
  name: '',
  slug: '',
  description: '',
  type: 'project',
  parent_id: null,
  sort_order: 0,
  is_active: true,
})

// Computed properties
const filteredCategories = computed(() => {
  switch (activeTab.value) {
    case 'project':
      return categoriesStore.projectCategories
    case 'article':
      return categoriesStore.articleCategories
    case 'general':
      return categoriesStore.generalCategories
    default:
      return categoriesStore.categories
  }
})

const availableParentCategories = computed(() => {
  return categoriesStore.categories.filter(cat =>
    cat.id !== categoriesStore.selectedCategory?.id &&
    cat.type === form.value.type
  )
})

// Helper functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const getTypeColor = (type) => {
  switch (type) {
    case 'project':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
    case 'article':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
    case 'general':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
  }
}

// Load categories on mount
const loadCategories = async () => {
  await categoriesStore.fetchCategories()
}

// Refresh categories
const refreshCategories = async () => {
  await loadCategories()
}

// Edit category
const editCategory = (category) => {
  categoriesStore.selectCategory(category)
  form.value = {
    name: category.name || '',
    slug: category.slug || '',
    description: category.description || '',
    type: category.type || 'project',
    parent_id: category.parent_id || null,
    sort_order: category.sort_order || 0,
    is_active: category.is_active !== undefined ? category.is_active : true,
  }
  showEditModal.value = true
}

// Delete category
const deleteCategory = async (id) => {
  if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
    const result = await categoriesStore.deleteCategory(id)
    if (result.success) {
      toast.success('Category deleted successfully!')
    } else {
      toast.error(result.error || 'Failed to delete category')
    }
  }
}

// Toggle active
const toggleActive = async (id) => {
  const result = await categoriesStore.toggleActive(id)
  if (result.success) {
    toast.success('Category status updated!')
  } else {
    toast.error(result.error || 'Failed to update category status')
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (showEditModal.value && !categoriesStore.selectedCategory?.id) {
    toast.error('No category selected for editing')
    return
  }

  let result
  if (showEditModal.value) {
    result = await categoriesStore.updateCategory(categoriesStore.selectedCategory.id, form.value)
  } else {
    result = await categoriesStore.createCategory(form.value)
  }

  if (result.success) {
    toast.success(result.message || (showEditModal.value ? 'Category updated successfully!' : 'Category created successfully!'))
    closeModals()
    resetForm()
  } else {
    toast.error(result.error || 'Failed to save category')
  }
}

// Close modals
const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  categoriesStore.clearSelection()
  resetForm()
}

// Reset form
const resetForm = () => {
  form.value = {
    name: '',
    slug: '',
    description: '',
    type: 'project',
    parent_id: null,
    sort_order: 0,
    is_active: true,
  }
}

onMounted(async () => {
  await loadCategories()

  // Subscribe to real-time updates
  subscription = categoriesStore.subscribeToUpdates((payload) => {
    console.log('Real-time category update received:', payload)
    loadCategories()
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