<template>
    <div class="w-full">
        <!-- Header -->
        <div
            class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Clients Management</h1>
                    <p class="text-gray-600 dark:text-gray-400 mt-2">Create, edit, and manage client data</p>
                </div>
                <div class="text-right">
                    <div class="text-4xl font-bold text-gray-900 dark:text-white">{{ clientsStore.totalClients }}</div>
                    <p class="text-gray-600 dark:text-gray-400">Total Clients</p>
                    <div class="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">
                        {{ clientsStore.activeClients.length }} Active
                    </div>
                </div>
            </div>
        </div>

        <div class="mb-6 flex gap-4">
            <Button @click="openCreateModal" variant="primary" icon="i-heroicons-plus">
                Add New Client
            </Button>
            <Button @click="refreshClients" :loading="clientsStore.isLoading" variant="outline"
                icon="i-heroicons-arrow-path">
                Refresh
            </Button>
        </div>

        <div class="mb-6">
            <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                <button @click="activeTab = 'all'"
                    :class="activeTab === 'all' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="px-4 py-2 border-b-2 font-medium transition-colors">
                    All Clients ({{ clientsStore.totalClients }})
                </button>
                <button @click="activeTab = 'active'"
                    :class="activeTab === 'active' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="px-4 py-2 border-b-2 font-medium transition-colors">
                    Active ({{ clientsStore.activeClients.length }})
                </button>
                <button @click="activeTab = 'inactive'"
                    :class="activeTab === 'inactive' ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
                    class="px-4 py-2 border-b-2 font-medium transition-colors">
                    Inactive ({{clientsStore.clients.filter(c => !c.is_active).length}})
                </button>
            </div>
        </div>

        <div v-if="clientsStore.isLoading && !clientsStore.clients.length" class="text-center py-12">
            <div class="inline-block">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p class="mt-4 text-gray-600 dark:text-gray-400">Loading clients...</p>
            </div>
        </div>

        <div v-else-if="!filteredClients.length"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center">
            <div class="text-5xl mb-4">🏢</div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Clients Yet</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">Start managing your clients by adding your first client</p>
            <Button @click="openCreateModal" variant="primary" size="lg">
                Add Your First Client
            </Button>
        </div>

        <div v-else
            class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Image</th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Client</th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Description</th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Website</th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Status</th>
                            <th
                                class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Created</th>
                            <th
                                class="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr v-for="client in filteredClients" :key="client.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <img v-if="client.image_url" :src="client.image_url" :alt="client.name"
                                    class="w-12 h-12 rounded-lg object-cover" />
                                <div v-else
                                    class="w-12 h-12 rounded-lg bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                    <span class="text-gray-600 dark:text-gray-400 text-lg font-semibold">{{
                                        client.name.charAt(0) }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <div class="text-sm font-medium text-gray-900 dark:text-white">{{ client.name }}
                                    </div>
                                    <div v-if="client.website_url" class="text-sm text-gray-500 dark:text-gray-400">{{
                                        client.website_url }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">{{
                                client.description || '-' }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                <a v-if="client.website_url" :href="client.website_url" target="_blank"
                                    class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                    Visit Website
                                </a>
                                <span v-else>-</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span v-if="client.is_active"
                                    class="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 text-xs font-semibold rounded-full">
                                    Active
                                </span>
                                <span v-else
                                    class="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300 text-xs font-semibold rounded-full">
                                    Inactive
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {{ formatDate(client.created_at, 'type1') }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div class="flex justify-end gap-2">
                                    <Button @click="openEditModal(client)" variant="ghost" size="sm"
                                        icon="i-heroicons-pencil"
                                        class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                        title="Edit Client" />
                                    <Button @click="toggleActive(client.id)" variant="ghost" size="sm"
                                        icon="i-heroicons-eye"
                                        :class="client.is_active ? 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'"
                                        :title="client.is_active ? 'Deactivate' : 'Activate'" />
                                    <Button @click="deleteClient(client.id)" variant="ghost" size="sm"
                                        icon="i-heroicons-trash"
                                        class="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        title="Delete Client" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Modal :show="showModal" @close="closeModal">
            <template #header>
                <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ isEditing ? 'Edit Client' : 'Create New Client' }}
                    </h2>
                </div>
            </template>

            <form @submit.prevent="saveClient" class="p-6 space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Name *
                        </label>
                        <input v-model="form.name" type="text" required
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter client name" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Client Image
                        </label>
                        <div class="space-y-2">
                            <input ref="imageInput" type="file" accept="image/*" @change="handleImageUpload"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            <div v-if="imagePreview" class="relative group">
                                <img :src="imagePreview" alt="Client image preview"
                                    class="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700" />
                                <button @click="removeImage"
                                    class="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <i class="i-heroicons-x-mark w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                    </label>
                    <textarea v-model="form.description" rows="3"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief description of this client"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Website URL
                    </label>
                    <input v-model="form.website_url" type="url"
                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="https://client-website.com" />
                </div>

                <div class="flex items-center gap-6">
                    <label class="flex items-center gap-2">
                        <input v-model="form.is_active" type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                </div>
            </form>

            <template #footer>
                <div class="flex justify-end gap-4">
                    <Button type="button" @click="closeModal" variant="outline">
                        Cancel
                    </Button>
                    <Button type="button" @click="saveClient" :loading="clientsStore.isLoading" variant="primary">
                        {{ clientsStore.isLoading ? 'Saving...' : (isEditing ? 'Update Client' : 'Create Client') }}
                    </Button>
                </div>
            </template>
        </Modal>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useAdminClientsStore } from '~/stores'
import { compressForThumbnail, formatFileSize } from '@/utils/imageCompression'
import { formatDate } from '@/utils'
import Button from '~/components/dashboard/ui/Button.vue'
import Modal from '~/components/dashboard/ui/Modal.vue'

definePageMeta({
    layout: 'dashboard',
    middleware: 'cms-auth'
})

const clientsStore = useAdminClientsStore()

const showModal = ref(false)
const isEditing = ref(false)
const activeTab = ref('all')

const form = ref({
    name: '',
    image_url: '',
    description: '',
    website_url: '',
    is_active: true
})

const imageInput = ref(null)
const imagePreview = ref('')
const imageFile = ref(null) 

const filteredClients = computed(() => {
    switch (activeTab.value) {
        case 'active':
            return clientsStore.activeClients
        case 'inactive':
            return clientsStore.clients.filter(c => !c.is_active)
        default:
            return clientsStore.clients
    }
})


const openCreateModal = () => {
    isEditing.value = false
    form.value = {
        name: '',
        image_url: '',
        description: '',
        website_url: '',
        is_active: true
    }
    imagePreview.value = ''
    imageFile.value = null
    showModal.value = true
}

const openEditModal = (client) => {
    isEditing.value = true
    form.value = { ...client }
    imagePreview.value = client.image_url || ''
    imageFile.value = null
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
}

const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
        try {
            toast.info('Compressing image...')
            const compressed = await compressForThumbnail(file)
            console.log(`Client image compressed: ${formatFileSize(compressed.originalSize)} → ${formatFileSize(compressed.compressedSize)} (${compressed.compressionRatio}% reduction)`)

            imageFile.value = compressed.file
            imagePreview.value = compressed.dataUrl
            toast.success(`Image compressed (${compressed.compressionRatio}% smaller) - will upload on save`)
        } catch (error) {
            console.error('Image compression failed:', error)
            toast.error('Failed to compress image')
        }
    }
}

const uploadFile = async (file, folder = 'clients') => {
    const supabase = useNuxtApp().$supabase
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.webp`
    const filePath = `${folder}/${fileName}`

    const { data, error } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
            contentType: 'image/webp',
            cacheControl: '3600',
        })

    if (error) {
        throw error
    }

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

const saveClient = async () => {
    try {
        let finalImageUrl = form.value.image_url

        if (imageFile.value) {
            toast.info('Uploading image...')
            finalImageUrl = await uploadFile(imageFile.value, 'clients')
        }

        const payload = {
            ...form.value,
            image_url: finalImageUrl,
        }

        let result
        if (isEditing.value) {
            result = await clientsStore.updateClient(form.value.id, payload)
        } else {
            result = await clientsStore.createClient(payload)
        }

        if (result.success) {
            toast.success(`Client ${isEditing.value ? 'updated' : 'created'} successfully!`)
            closeModal()
            await refreshClients()
        } else {
            toast.error(result.error || 'Failed to save client')
        }
    } catch (err) {
        console.error('Save failed:', err)
        toast.error('Failed to save client')
    }
}

const deleteClient = async (id) => {
    if (confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
        const result = await clientsStore.deleteClient(id)
        if (result.success) {
            toast.success('Client deleted successfully!')
            await refreshClients()
        } else {
            toast.error(result.error || 'Failed to delete client')
        }
    }
}

const toggleActive = async (id) => {
    const result = await clientsStore.toggleActive(id)
    if (result.success) {
        toast.success('Client status updated!')
    } else {
        toast.error(result.error || 'Failed to update client status')
    }
}

const refreshClients = async () => {
    await clientsStore.fetchClients()
}

onMounted(async () => {
    await refreshClients()
})
</script>