<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
      <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
      <div class="relative z-10">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white font-syne">Analytics Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">Welcome back! Here's what's happening with your portfolio today.</p>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Projects -->
      <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-folder" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <span class="text-xs font-medium px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
            +{{ stats.publishedProjects }} new
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Projects</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalProjects }}</h3>
        </div>
      </div>

      <!-- Contact Messages -->
      <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <span v-if="stats.unreadMessages > 0" class="text-xs font-medium px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
            {{ stats.unreadMessages }} unread
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Messages</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalMessages }}</h3>
        </div>
      </div>

      <!-- Skills Count -->
      <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <span class="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
            {{ stats.skillCategories }} cats
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Skills Listed</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalSkills }}</h3>
        </div>
      </div>

      <!-- CMS Users -->
      <div class="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all duration-300">
        <div class="flex items-center justify-between mb-4">
          <div class="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-users" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
          </div>
          <span class="text-xs font-medium px-2.5 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
            Active
          </span>
        </div>
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">CMS Users</p>
          <h3 class="text-3xl font-bold text-gray-900 dark:text-white mt-1">{{ stats.totalUsers }}</h3>
        </div>
      </div>
    </div>

    <!-- Charts and Analytics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Skills Distribution -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white font-syne">Skills Distribution</h3>
            <Button variant="ghost" size="sm" class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">View All</Button>
        </div>
        
        <div v-if="skillsByCategory.length > 0" class="space-y-4">
          <div v-for="category in skillsByCategory" :key="category.name" class="group">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-3 h-3 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-sm" :style="{ backgroundColor: category.color }"></div>
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{{ category.name }}</span>
              </div>
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ category.count }}</span>
            </div>
            <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500 ease-out group-hover:opacity-80"
                :style="{ width: category.percentage + '%', backgroundColor: category.color }"></div>
            </div>
          </div>
        </div>
        <div v-else class="h-48 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
          <UIcon name="i-heroicons-chart-pie" class="w-12 h-12 mb-2 opacity-50" />
          <span>No skills data available</span>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white font-syne">Recent Activity</h3>
            <Button variant="ghost" size="sm" class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">View All</Button>
        </div>

        <div class="space-y-6">
          <div v-for="(activity, index) in recentActivities" :key="activity.id"
            class="relative pl-8 pb-6 last:pb-0">
            <!-- Timeline Line -->
            <div v-if="index !== recentActivities.length - 1" class="absolute left-3.5 top-8 bottom-0 w-px bg-gray-200 dark:bg-gray-700"></div>
            
            <!-- Icon -->
            <div class="absolute left-0 top-1 w-7 h-7 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800" :class="activity.iconBg">
              <UIcon :name="activity.icon" class="w-4 h-4" :class="activity.iconColor" />
            </div>

            <!-- Content -->
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ activity.title }}</p>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ activity.description }}</p>
              <p class="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                <UIcon name="i-heroicons-clock" class="w-3 h-3" />
                {{ formatDate(activity.timestamp) }}
              </p>
            </div>
          </div>
          
          <div v-if="recentActivities.length === 0" class="h-48 flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
            <UIcon name="i-heroicons-clock" class="w-12 h-12 mb-2 opacity-50" />
            <span>No recent activity</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Status Overview -->
    <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
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
import { useProjectsStore } from '@/stores/modules/projects'
import { useContactStore } from '@/stores/modules/contact'
import { useCmsStore } from '@/stores/modules/cms'
import Button from '@/components/dashboard/ui/Button.vue'

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

<style scoped></style>