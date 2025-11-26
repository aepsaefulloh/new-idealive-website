<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between px-6 py-4">
      <button @click="toggleSidebar"
        class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
      </button>

      <button @click="toggleSidebar"
        class="hidden lg:block p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        <UIcon name="i-heroicons-bars-3" class="w-5 h-5" />
      </button>

      <div class="flex-1 max-w-md mx-4">
        <div class="relative">
          <input type="text" placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <button
          class="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        <button @click="themeStore.toggleTheme"
          class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <UIcon v-if="themeStore.isDark" name="i-heroicons-sun" class="w-5 h-5" />
          <UIcon v-else name="i-heroicons-moon" class="w-5 h-5" />
        </button>

        <Dropdown>
          <template #trigger>
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">{{ userInitials }}</span>
              </div>
              <span class="text-gray-700 dark:text-gray-300 hidden sm:block">{{ userEmail }}</span>
              <UIcon name="i-heroicons-chevron-down" class="w-4 h-4" />
            </div>
          </template>

          <template #content>
            <div class="py-1">
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">{{ userInitials }}</span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ userEmail }}</p>
                  </div>
                </div>
              </div>

              <div class="py-1">
                <a href="#"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-3" />
                  Settings
                </a>
                <a href="#"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4 mr-3" />
                  Help & Support
                </a>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-600"></div>

              <div class="py-1">
                <button @click="handleLogout"
                  class="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </div>
            </div>
          </template>
        </Dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useThemeStore } from '~/stores'
import { useAuthStore } from '~/stores/modules/auth'
import Dropdown from '~/components/dashboard/ui/Dropdown.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const themeStore = useThemeStore()
const authStore = useAuthStore()
const router = useRouter()

const emit = defineEmits(['toggle-sidebar'])

const toggleSidebar = () => {
  emit('toggle-sidebar')
}

const userEmail = computed(() => {
  return authStore.user?.email || 'Admin'
})

const userInitials = computed(() => {
  if (!authStore.user?.email) return 'A'
  const parts = authStore.user.email.split('@')[0].split('.')
  return parts.map(p => p.charAt(0).toUpperCase()).join('').substring(0, 2) || 'A'
})

const handleLogout = async () => {
  await authStore.logout()
  await router.push('/xms/login')
}
</script>