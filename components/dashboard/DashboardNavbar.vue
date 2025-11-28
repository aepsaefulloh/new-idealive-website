<template>
  <header class="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center gap-4">
        <Button @click="toggleSidebar" variant="ghost" size="sm" icon="i-heroicons-bars-3-bottom-left" class="text-gray-500" />
        
        <!-- Breadcrumbs or Page Title could go here -->
      </div>

      <div class="flex items-center gap-3 sm:gap-4">
        <!-- Search (Hidden on mobile for now or expandable) -->
        <div class="hidden md:block relative group">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-heroicons-magnifying-glass" class="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input type="text" 
                class="block w-64 pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 sm:text-sm"
                placeholder="Search anything...">
        </div>

        <div class="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block"></div>

        <!-- Theme Toggle -->
        <Button @click="themeStore.toggleTheme" variant="ghost" size="sm" class="text-gray-500 group">
          <UIcon v-if="themeStore.isDark" name="i-heroicons-sun" class="w-5 h-5 text-yellow-500 transition-transform group-hover:rotate-90" />
          <UIcon v-else name="i-heroicons-moon" class="w-5 h-5 text-blue-600 transition-transform group-hover:-rotate-12" />
        </Button>

        <!-- Notifications -->
        <Button variant="ghost" size="sm" class="text-gray-500 relative">
          <UIcon name="i-heroicons-bell" class="w-5 h-5" />
          <span class="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
        </Button>

        <!-- User Profile -->
        <Dropdown>
          <template #trigger>
            <button class="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                <div class="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                    <span class="text-xs font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">{{ userInitials }}</span>
                </div>
              </div>
              <div class="hidden sm:block text-left mr-2">
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-200 leading-none">{{ userEmail }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Administrator</p>
              </div>
              <UIcon name="i-heroicons-chevron-down" class="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>
          </template>

          <template #content>
            <div class="py-1 w-56">
              <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <p class="text-sm font-medium text-gray-900 dark:text-white">Signed in as</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ userEmail }}</p>
              </div>

              <div class="p-1">
                <a href="#"
                  class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-3 text-gray-400" />
                  Settings
                </a>
                <a href="#"
                  class="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <UIcon name="i-heroicons-question-mark-circle" class="w-4 h-4 mr-3 text-gray-400" />
                  Help & Support
                </a>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>

              <div class="p-1">
                <Button @click="handleLogout" variant="ghost" block class="justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-4 h-4 mr-3" />
                  Sign out
                </Button>
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
import Button from '~/components/dashboard/ui/Button.vue'
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