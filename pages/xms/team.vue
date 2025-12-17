<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white font-syne">Team Members</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your team members and their roles</p>
      </div>
      <div class="flex items-center gap-3">
        <Button @click="refreshTeam" :loading="isLoading" variant="outline" icon="i-heroicons-arrow-path">
          <span class="hidden sm:inline">Refresh</span>
        </Button>
        <Button @click="showCreateModal = true" variant="primary" icon="i-heroicons-plus">
          Add Team Member
        </Button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Members</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ team.length }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-users" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Published</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{team.filter(m => m.published).length}}
          </p>
        </div>
        <div class="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">Divisions</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ uniqueDivisions.length }}</p>
        </div>
        <div class="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
          <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading && !team.length" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p class="mt-4 text-gray-500 dark:text-gray-400 font-medium">Loading team...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="!team.length"
      class="bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
      <div class="w-20 h-20 bg-gray-50 dark:bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-heroicons-user-plus" class="w-10 h-10 text-gray-400" />
      </div>
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">No Team Members Yet</h3>
      <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">Start building your team by adding your first
        member.</p>
      <Button @click="showCreateModal = true" variant="primary" size="lg">
        Add First Team Member
      </Button>
    </div>

    <!-- Team Grid -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="member in team" :key="member.id"
        class="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full">

        <!-- Member Image -->
        <div class="bg-gray-100 dark:bg-gray-900 relative aspect-square overflow-hidden">
          <img v-if="member.image_url" :src="member.image_url" :alt="member.fullname"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div v-else class="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50 dark:bg-gray-800">
            <UIcon name="i-heroicons-user-circle" class="w-20 h-20 opacity-20" />
          </div>

          <!-- Overlay Actions -->
          <div
            class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm">
            <Button @click="editMember(member)" variant="secondary" size="sm" icon="i-heroicons-pencil-square"
              title="Edit" />
            <Button @click="confirmDelete(member)" variant="danger" size="sm" icon="i-heroicons-trash" title="Delete" />
          </div>

          <!-- Status Badge -->
          <div class="absolute top-3 left-3">
            <span v-if="!member.published"
              class="px-2.5 py-1 bg-gray-500/90 backdrop-blur-md text-white text-xs font-bold rounded-lg shadow-sm">
              Draft
            </span>
          </div>
        </div>

        <!-- Member Info -->
        <div class="p-5 flex-1 flex flex-col">
          <h3
            class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ member.fullname }}
          </h3>

          <div class="text-sm font-medium mb-3 flex items-center flex-wrap gap-1">
            <span class="text-gray-500 dark:text-gray-400">
              {{ member.division }}
            </span>

            <span class="text-gray-300 dark:text-gray-600">-</span>

            <span class="text-blue-600 dark:text-blue-400">
              {{ member.jobdesk }}
            </span>
          </div>

          <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 flex-1">
            {{ member.job_description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeModals">
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700">
        <div class="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white font-syne">
              {{ showEditModal ? 'Edit Team Member' : 'Add Team Member' }}
            </h2>
            <button @click="closeModals"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Profile Image -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Profile Photo
            </label>
            <div class="space-y-2">
              <input ref="imageInput" type="file" accept="image/*" @change="handleImageUpload"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
              <div v-if="imagePreview" class="relative group">
                <img :src="imagePreview" alt="Profile preview"
                  class="w-32 h-32 object-cover rounded-xl border border-gray-200 dark:border-gray-700" />
                <button type="button" @click="removeImage"
                  class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Basic Info -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input v-model="form.fullname" type="text" required
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Job Title *
              </label>
              <input v-model="form.jobdesk" type="text" required
                class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Lead Developer" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Division *
            </label>
            <input v-model="form.division" type="text" required
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Engineering, Design, Management, etc." />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description
            </label>
            <textarea v-model="form.job_description" rows="4"
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe the role, responsibilities, and expertise..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Display Order
            </label>
            <input v-model.number="form.sort_order" type="number" min="0"
              class="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="0" />
            <p class="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
          </div>

          <!-- Settings -->
          <div
            class="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700">
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
            <Button type="submit" :loading="isLoading" variant="primary">
              {{ isLoading ? 'Saving...' : (showEditModal ? 'Update Member' : 'Add Member') }}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { compressForThumbnail, formatFileSize } from '@/utils/imageCompression'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const supabase = useNuxtApp().$supabase

const team = ref([])
const isLoading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedMember = ref(null)

const form = ref({
  fullname: '',
  jobdesk: '',
  job_description: '',
  division: '',
  image_url: '',
  sort_order: 0,
  published: true,
})

const imageInput = ref(null)
const imagePreview = ref('')
const imageFile = ref(null)

const uniqueDivisions = computed(() => {
  const divisions = team.value.map(m => m.division).filter(Boolean)
  return [...new Set(divisions)]
})

const loadTeam = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('team')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    team.value = data || []
  } catch (error) {
    console.error('Load team failed:', error)
    toast.error('Failed to load team members')
  } finally {
    isLoading.value = false
  }
}

const refreshTeam = () => loadTeam()

const editMember = (member) => {
  selectedMember.value = member
  form.value = {
    fullname: member.fullname || '',
    jobdesk: member.jobdesk || '',
    job_description: member.job_description || '',
    division: member.division || '',
    image_url: member.image_url || '',
    sort_order: member.sort_order || 0,
    published: member.published !== undefined ? member.published : true,
  }
  imagePreview.value = member.image_url || ''
  showEditModal.value = true
}

const confirmDelete = async (member) => {
  if (confirm(`Are you sure you want to delete "${member.fullname}"? This action cannot be undone.`)) {
    try {
      const { error } = await supabase.from('team').delete().eq('id', member.id)
      if (error) throw error
      toast.success('Team member deleted successfully!')
      await loadTeam()
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete team member')
    }
  }
}

const handleSubmit = async () => {
  try {
    isLoading.value = true

    let finalImageUrl = form.value.image_url
    if (imageFile.value) {
      toast.info('Uploading image...')
      finalImageUrl = await uploadFile(imageFile.value, 'team')
    }

    const payload = {
      ...form.value,
      image_url: finalImageUrl,
    }

    let error
    if (showEditModal.value && selectedMember.value?.id) {
      const result = await supabase.from('team').update(payload).eq('id', selectedMember.value.id)
      error = result.error
    } else {
      const result = await supabase.from('team').insert([payload])
      error = result.error
    }

    if (error) throw error

    toast.success(showEditModal.value ? 'Team member updated successfully!' : 'Team member added successfully!')
    closeModals()
    resetForm()
    await loadTeam()
  } catch (error) {
    console.error('Submit failed:', error)
    toast.error('Failed to save team member')
  } finally {
    isLoading.value = false
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      toast.info('Compressing image...')
      const compressed = await compressForThumbnail(file)
      console.log(`Image compressed: ${formatFileSize(compressed.originalSize)} → ${formatFileSize(compressed.compressedSize)} (${compressed.compressionRatio}% reduction)`)

      imageFile.value = compressed.file
      imagePreview.value = compressed.dataUrl
      toast.success(`Image compressed (${compressed.compressionRatio}% smaller)`)
    } catch (error) {
      console.error('Image compression failed:', error)
      toast.error('Failed to compress image')
    }
  }
}

const uploadFile = async (file, folder = 'team') => {
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file, {
      contentType: 'image/webp',
      cacheControl: '3600',
    })

  if (error) throw error

  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return publicUrl
}

const removeImage = () => {
  imagePreview.value = ''
  imageFile.value = null
  form.value.image_url = ''
  if (imageInput.value) {
    imageInput.value.value = ''
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedMember.value = null
  resetForm()
}

const resetForm = () => {
  form.value = {
    fullname: '',
    jobdesk: '',
    job_description: '',
    division: '',
    image_url: '',
    sort_order: 0,
    published: true,
  }
  imagePreview.value = ''
  imageFile.value = null
  if (imageInput.value) imageInput.value.value = ''
}

onMounted(() => {
  loadTeam()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
