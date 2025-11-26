<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Monitor your portfolio performance and visitor insights</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Projects -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Projects</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalProjects }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ stats.publishedProjects }} published</p>
          </div>
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <UIcon name="i-heroicons-folder" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <!-- Contact Messages -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Contact Messages</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalMessages }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ stats.unreadMessages }} unread</p>
          </div>
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <!-- Skills Count -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Skills Listed</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalSkills }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ stats.skillCategories }} categories</p>
          </div>
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>

      <!-- CMS Users -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">CMS Users</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.totalUsers }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ stats.activeUsers }} active</p>
          </div>
          <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <UIcon name="i-heroicons-users" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Skills Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills by Category</h3>
        <div v-if="skillsByCategory.length > 0" class="space-y-3">
          <div v-for="category in skillsByCategory" :key="category.name" class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: category.color }"></div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{{ category.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ category.count }} skills</span>
              <div class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div class="h-2 rounded-full" :style="{ width: category.percentage + '%', backgroundColor: category.color }"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-32 flex items-center justify-center">
          <span class="text-gray-500 dark:text-gray-400">No skills data available</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="p-2 rounded-full" :class="activity.iconBg">
              <UIcon :name="activity.icon" class="w-4 h-4" :class="activity.iconColor" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ activity.description }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">{{ formatDate(activity.timestamp) }}</p>
            </div>
          </div>
          <div v-if="recentActivities.length === 0" class="text-center py-4">
            <span class="text-gray-500 dark:text-gray-400 text-sm">No recent activity</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Status Overview -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Status Overview</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.publishedProjects }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Published</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.draftProjects }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Drafts</div>
        </div>
        <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
          <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.featuredProjects }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Featured</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProjectsStore } from '@/stores/modules/projects'
import { useContactStore } from '@/stores/modules/contact'
import { useCmsStore } from '@/stores/modules/cms'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

// Use stores
const projectsStore = useProjectsStore()
const contactStore = useContactStore()
const cmsStore = useCmsStore()

// Computed stats
const stats = computed(() => ({
  totalProjects: projectsStore.projects.length,
  publishedProjects: projectsStore.projects.filter(p => p.published).length,
  draftProjects: projectsStore.projects.filter(p => !p.published).length,
  featuredProjects: projectsStore.projects.filter(p => p.featured).length,
  totalMessages: contactStore.totalMessages,
  unreadMessages: contactStore.messages.filter(m => !m.read).length,
  totalSkills: cmsStore.skills.length,
  skillCategories: new Set(cmsStore.skills.map(s => s.category)).size,
  totalUsers: 1, // This would need to be fetched from users API
  activeUsers: 1  // This would need to be fetched from users API
}))

// Skills by category with colors
const skillsByCategory = computed(() => {
  const categories = {}
  cmsStore.skills.forEach(skill => {
    if (!categories[skill.category]) {
      categories[skill.category] = { count: 0, color: getCategoryColor(skill.category) }
    }
    categories[skill.category].count++
  })

  const total = cmsStore.skills.length
  return Object.entries(categories).map(([name, data]) => ({
    name,
    count: data.count,
    percentage: total > 0 ? (data.count / total) * 100 : 0,
    color: data.color
  }))
})

// Recent activities (mock data - in real app this would come from a database)
const recentActivities = ref([
  {
    id: 1,
    title: 'New contact message received',
    description: 'John Doe sent a message about project collaboration',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    icon: 'i-heroicons-envelope',
    iconBg: 'bg-green-100 dark:bg-green-900/30',
    iconColor: 'text-green-600 dark:text-green-400'
  },
  {
    id: 2,
    title: 'Project updated',
    description: 'Updated "E-commerce Platform" project details',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    icon: 'i-heroicons-pencil',
    iconBg: 'bg-blue-100 dark:bg-blue-900/30',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 3,
    title: 'New skill added',
    description: 'Added "TypeScript" to skills list',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    icon: 'i-heroicons-sparkles',
    iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
    iconColor: 'text-yellow-600 dark:text-yellow-400'
  }
])

// Helper function for category colors
const getCategoryColor = (category) => {
  const colors = {
    frontend: '#3B82F6',    // blue
    backend: '#10B981',     // green
    language: '#F59E0B',    // yellow
    database: '#8B5CF6',    // purple
    tool: '#EF4444',        // red
    other: '#6B7280'        // gray
  }
  return colors[category] || colors.other
}

// Format date helper
const formatDate = (date) => {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else {
    return `${days}d ago`
  }
}

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

  // Load CMS data if not already loaded
  if (cmsStore.skills.length === 0) {
    await cmsStore.loadAllCmsData()
  }
})
</script>

<style scoped>
</style>
