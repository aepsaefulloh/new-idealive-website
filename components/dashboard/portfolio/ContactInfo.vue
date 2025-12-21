<template>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Clients</label>
            <input v-model="contactInfo.total_clients" type="number"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Total Clients" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Projects</label>
            <input v-model="contactInfo.total_projects" type="number"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Total Projects" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Awards</label>
            <input v-model="contactInfo.total_awards" type="number"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
              placeholder="Total Awards" />
          </div>
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
</template>

<script setup>
import { ref, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useAdminCmsStore } from '@/stores'

const cmsStore = useAdminCmsStore()
const isLoading = ref(false)

const contactInfo = computed(() => cmsStore.contactInfo)

const saveContactInfo = async () => {
  isLoading.value = true
  const result = await cmsStore.updateContactInfo(contactInfo.value)
  if (result.success) {
    toast.success(cmsStore.contactInfoSuccess)
  } else {
    toast.error(result.error || 'Failed to save contact information')
  }
  isLoading.value = false
}

</script>
