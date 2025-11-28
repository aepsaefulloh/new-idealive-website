<template>
  <div class="w-full">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">Manage incoming contact form submissions</p>
        </div>
        <div class="text-right">
          <div class="text-4xl font-bold text-gray-900 dark:text-white">{{ contactStore.totalMessages }}</div>
          <p class="text-gray-600 dark:text-gray-400">Total Messages</p>
          <div class="mt-2 text-2xl font-bold text-gray-500 dark:text-gray-400">
            <span v-if="contactStore.unreadCount > 0">{{ contactStore.unreadCount }} Unread</span>
            <span v-else>All Read</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Success & Error Messages -->
    <Transition name="fade">
      <div
        v-if="successMessage"
        class="mb-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg"
      >
        <p class="text-green-800 dark:text-green-200">✓ {{ successMessage }}</p>
      </div>
    </Transition>

    <Transition name="fade">
      <div
        v-if="errorMessage"
        class="mb-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg"
      >
        <p class="text-red-800 dark:text-red-200">✗ {{ errorMessage }}</p>
      </div>
    </Transition>

    <!-- Loading State -->
    <div v-if="contactStore.isLoading && !contactStore.messages.length" class="text-center py-12">
      <div class="inline-block">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
        <p class="mt-4 text-gray-600 dark:text-gray-400">Loading messages...</p>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!contactStore.messages.length"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center"
    >
      <div class="text-5xl mb-4">📭</div>
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Messages Yet</h3>
      <p class="text-gray-600 dark:text-gray-400">Contact form submissions will appear here</p>
    </div>

    <!-- Messages List -->
    <div v-else class="space-y-4">
      <div
        v-for="message in contactStore.messages"
        :key="message.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow overflow-hidden"
        :class="!message.read ? 'border-l-4 border-l-gray-600' : ''"
      >
        <div class="p-6">
          <!-- Message Header -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ message.name }}</h3>
                <span
                  v-if="!message.read"
                  class="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold rounded-full"
                >
                  NEW
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400 ml-auto">
                  {{ formatDate(message.created_at) }}
                </span>
              </div>
              <p class="text-gray-600 dark:text-gray-400 font-medium">{{ message.email }}</p>
            </div>
          </div>

          <!-- Message Subject -->
          <div class="mb-4">
            <p class="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Subject</p>
            <p class="text-gray-900 dark:text-white font-semibold">{{ message.subject }}</p>
          </div>

          <!-- Message Content -->
          <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <p class="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">{{ message.message }}</p>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <Button
              v-if="!message.read"
              @click="handleMarkAsRead(message.id)"
              :loading="contactStore.isLoading"
              variant="success"
              size="sm"
            >
              ✓ Mark as Read
            </Button>
            <Button
              v-else
              @click="handleMarkAsUnread(message.id)"
              :loading="contactStore.isLoading"
              variant="secondary"
              size="sm"
            >
              ↻ Mark as Unread
            </Button>

            <Button
              :to="`mailto:${message.email}`"
              variant="primary"
              size="sm"
            >
              📧 Reply
            </Button>

            <Button
              @click="handleDelete(message.id)"
              :loading="contactStore.isLoading"
              variant="danger"
              size="sm"
              class="ml-auto"
            >
              🗑️ Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vue3-toastify'
import { useContactStore } from '@/stores/modules/contact'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const contactStore = useContactStore()
let subscription = null

// Reactive variables for toast messages
const successMessage = ref('')
const errorMessage = ref('')

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const handleMarkAsRead = async (id) => {
  const result = await contactStore.markAsRead(id)
  if (result.success) {
    toast.success('Message marked as read!')
  } else {
    toast.error(result.error || 'Failed to mark message as read')
  }
}

const handleMarkAsUnread = async (id) => {
  const result = await contactStore.markAsUnread(id)
  if (result.success) {
    toast.success('Message marked as unread!')
  } else {
    toast.error(result.error || 'Failed to mark message as unread')
  }
}

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this message?')) {
    const result = await contactStore.deleteMessage(id)
    if (result.success) {
      toast.success('Message deleted successfully!')
    } else {
      toast.error(result.error || 'Failed to delete message')
    }
  }
}

onMounted(async () => {
  // Load messages
  await contactStore.fetchMessages()

  // Subscribe to real-time updates
  subscription = contactStore.subscribeToUpdates((payload) => {
    console.log('Real-time update received:', payload)
    // Auto-refresh messages on changes
    contactStore.fetchMessages()
  })
})

onUnmounted(() => {
  // Unsubscribe when component unmounts
  if (subscription) {
    subscription.unsubscribe()
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
