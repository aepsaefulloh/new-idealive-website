<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <UIcon name="i-heroicons-wrench" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Services</h2>
      </div>
      <Button @click="openModal" variant="primary" size="sm">
        <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
        Add Service
      </Button>
    </div>

    <!-- Services List -->
    <div class="space-y-4">
      <div v-if="cmsStore.servicesLoading && !cmsStore.services.length" class="text-center py-4">
        Loading services...
      </div>
      <div v-else-if="!cmsStore.services.length" class="text-center py-4 text-gray-500">
        No services added yet.
      </div>
      <div v-else v-for="service in cmsStore.services" :key="service.id"
        class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between group">
        <div>
          <h3 class="font-semibold text-gray-900 dark:text-white">{{ service.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{{ service.description }}</p>
          <div class="mt-2 text-xs text-gray-500">Order: {{ service.order_num }}</div>
        </div>
        <div class="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button @click="editService(service)"
            class="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
            title="Edit">
            <UIcon name="i-heroicons-pencil" class="w-5 h-5" />
          </button>
          <button @click="confirmDelete(service)"
            class="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete">
            <UIcon name="i-heroicons-trash" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <client-only>
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6 animate-fade-in">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {{ isEditing ? 'Edit Service' : 'Add New Service' }}
          </h3>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input v-model="form.title" type="text" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Subtitle)</label>
              <textarea v-model="form.description" rows="3" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order Number</label>
              <input v-model="form.order_num" type="number" required
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <div class="flex justify-end gap-3 mt-6">
              <button type="button" @click="closeModal"
                class="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                Cancel
              </button>
              <Button type="submit" variant="primary" :loading="cmsStore.servicesLoading">
                {{ isEditing ? 'Update' : 'Create' }}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAdminCmsStore } from '@/stores'
import { toast } from 'vue3-toastify'
import Button from '@/components/dashboard/ui/Button.vue'

const cmsStore = useAdminCmsStore()
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)

const form = reactive({
  title: '',
  description: '',
  order_num: 0
})

const openModal = () => {
  isEditing.value = false
  editingId.value = null
  form.title = ''
  form.description = ''
  form.order_num = cmsStore.services.length + 1
  showModal.value = true
}

const editService = (service) => {
  isEditing.value = true
  editingId.value = service.id
  form.title = service.title
  form.description = service.description
  form.order_num = service.order_num
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const handleSubmit = async () => {
  if (isEditing.value) {
    const result = await cmsStore.updateService(editingId.value, form)
    if (result.success) {
      toast.success('Service updated')
      closeModal()
    } else {
      toast.error(result.error || 'Failed to update service')
    }
  } else {
    const result = await cmsStore.createService(form)
    if (result.success) {
      toast.success('Service created')
      closeModal()
    } else {
      toast.error(result.error || 'Failed to create service')
    }
  }
}

const confirmDelete = async (service) => {
  if (confirm(`Are you sure you want to delete "${service.title}"?`)) {
    const result = await cmsStore.deleteService(service.id)
    if (result.success) {
      toast.success('Service deleted')
    } else {
      toast.error(result.error || 'Failed to delete service')
    }
  }
}
</script>
