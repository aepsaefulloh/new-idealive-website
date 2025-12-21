<template>
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
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formatDate(message.created_at,'type4') }}</p>
          </div>
          <NuxtLink to="/xms/contact"
            class="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors">
            View
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useContactStore } from '@/stores'
import { formatDate } from '@/utils'

const contactStore = useContactStore()
const recentMessages = computed(() => contactStore.messages.slice(0, 3))

onMounted(async () => {
  await contactStore.fetchMessages()
})
</script>
