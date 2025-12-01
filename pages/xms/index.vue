<template>
  <div class="space-y-8">
    <!-- Header -->
    <div
      class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div
        class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl">
      </div>
      <div class="relative z-10">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white font-syne">Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">Welcome back! Here's what's happening with your
          portfolio today.</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Projects -->
      <div
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-folder" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span
            class="text-xs font-medium px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            +{{ stats.publishedProjects }} new
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalProjects }}</h3>
        </div>
      </div>

      <!-- Contact Messages -->
      <div
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <span v-if="stats.unreadMessages > 0"
            class="text-xs font-medium px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
            {{ stats.unreadMessages }} unread
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalMessages }}</h3>
        </div>
      </div>

      <!-- Articles Count -->
      <div
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-document-text" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <span
            class="text-xs font-medium px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            {{ stats.publishedArticles }} published
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Articles</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalArticles }}</h3>
        </div>
      </div>

      <!-- CMS Users -->
      <div
        class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div
            class="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-users" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <span
            class="text-xs font-medium px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
            Active
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">CMS Users</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalUsers }}</h3>
        </div>
      </div>
    </div>


    <div
      class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

      <div class="relative z-10">
        <h3 class="text-xl font-bold font-syne mb-6">Project Status Overview</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span class="text-2xl font-bold">{{ stats.publishedProjects }}</span>
            </div>
            <div>
              <p class="text-sm text-gray-300">Published Projects</p>
              <div class="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                <div class="h-full bg-green-400" style="width: 70%"></div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span class="text-2xl font-bold">{{ stats.draftProjects }}</span>
            </div>
            <div>
              <p class="text-sm text-gray-300">Draft Projects</p>
              <div class="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                <div class="h-full bg-yellow-400" style="width: 30%"></div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <span class="text-2xl font-bold">{{ stats.featuredProjects }}</span>
            </div>
            <div>
              <p class="text-sm text-gray-300">Featured Projects</p>
              <div class="w-full bg-white/10 h-1 mt-2 rounded-full overflow-hidden">
                <div class="h-full bg-purple-400" style="width: 50%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore, useContactStore, useArticlesStore } from '@/stores'
import Button from '@/components/dashboard/ui/Button.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

// Use stores
const projectsStore = useProjectsStore()
const contactStore = useContactStore()
const articlesStore = useArticlesStore()

// Computed stats
const stats = computed(() => ({
  totalProjects: projectsStore.projects.length,
  publishedProjects: projectsStore.projects.filter(p => p.published).length,
  draftProjects: projectsStore.projects.filter(p => !p.published).length,
  featuredProjects: projectsStore.projects.filter(p => p.featured).length,
  totalMessages: contactStore.totalMessages,
  unreadMessages: contactStore.messages.filter(m => !m.read).length,
  totalArticles: articlesStore.totalArticles,
  publishedArticles: articlesStore.publishedArticles.length,
  totalUsers: 1, // This would need to be fetched from users API
  activeUsers: 1  // This would need to be fetched from users API
}))

// Load data on mount
onMounted(async () => {
  // Load projects if not already loaded
  if (projectsStore.projects.length === 0) {
    await projectsStore.fetchProjects()
  }

  // Load contact messages if not already loaded
  if (contactStore.messages.length === 0) {
    await contactStore.fetchMessages()
  }

  // Load articles if not already loaded
  if (articlesStore.articles.length === 0) {
    await articlesStore.fetchArticles()
  }
})
</script>

<style scoped></style>