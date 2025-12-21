<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <UIcon name="i-heroicons-folder" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
      </div>
      <NuxtLink to="/xms/projects"
        class="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors">
        Manage Projects
      </NuxtLink>
    </div>
    <div class="space-y-4">
      <div v-for="project in projectsStore.projects.slice(0, 4)" :key="project.id"
        class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-3">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ project.description }}</p>
              <div v-if="project.clients" class="text-xs text-blue-600 dark:text-blue-400 mt-1">
                Client: {{ project.clients.name }}
              </div>
              <div class="flex gap-2 mt-2">
                <span v-if="project.featured"
                  class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full">
                  Featured
                </span>
                <span v-if="!project.published"
                  class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                  Draft
                </span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <span v-for="tag in project.tags?.slice(0, 2)" :key="tag"
              class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div v-if="projectsStore.projects.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No projects yet. <NuxtLink to="/xms/projects"
            class="text-purple-600 hover:text-purple-700">Add your first project</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminProjectsStore } from '@/stores'

const projectsStore = useAdminProjectsStore()

onMounted(async () => {
  await projectsStore.fetchProjects()
})
</script>
