<template>
  <div>
    <!-- Header -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Portfolio CMS</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content, hero section, and contact form submissions</p>
    </div>

    <!-- Content Sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Hero Section Management -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center mb-6">
          <UIcon name="i-heroicons-star" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Hero Section</h2>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
            <input v-model="heroSection.title" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="Enter hero title" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
            <input v-model="heroSection.subtitle" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500" placeholder="Enter hero subtitle" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <textarea v-model="heroSection.description" rows="3" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 resize-none" placeholder="Enter hero description"></textarea>
          </div>
          <button @click="saveHeroSection" class="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Save Hero Section' }}
          </button>
        </div>
      </div>

      <!-- About Section Management -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <div class="flex items-center mb-6">
          <UIcon name="i-heroicons-user" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">About Me</h2>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
            <textarea v-model="aboutSection.bio" rows="4" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Enter your bio"></textarea>
          </div>
          <button @click="saveAboutSection" class="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50" :disabled="isLoading">
            {{ isLoading ? 'Saving...' : 'Save About Section' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Skills Expertise</h2>
        </div>
      </div>

      <!-- Add New Skill Form -->
      <div class="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Skill</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Name</label>
            <input v-model="newSkillName" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500" placeholder="e.g. JavaScript" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Level (%)</label>
            <input v-model.number="newSkillLevel" type="number" min="0" max="100" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
            <select v-model="newSkillCategory" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500">
              <option v-for="category in skillCategories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
          </div>
        </div>
        <button @click="addSkill" class="mt-4 px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50" :disabled="isLoading">
          {{ isLoading ? 'Adding...' : 'Add Skill' }}
        </button>
      </div>

      <!-- Skills List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="skill in skills" :key="skill.id" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 relative group">
          <button @click="deleteSkill(skill.id)" class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs">
            <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          </button>
          <p class="font-semibold text-gray-900 dark:text-white">{{ skill.name }}</p>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ skill.level }}%</p>
          <div class="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div class="bg-gray-600 dark:bg-gray-400 h-2 rounded-full" :style="{ width: skill.level + '%' }"></div>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-500 mt-1 capitalize">{{ skill.category }}</p>
        </div>
      </div>
      <div v-if="skills.length === 0" class="text-center py-8">
        <p class="text-gray-500 dark:text-gray-400">No skills added yet. Add your first skill above.</p>
      </div>
    </div>

    <!-- Contact Information Management -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-center mb-6">
        <UIcon name="i-heroicons-phone" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input v-model="contactInfo.email" type="email" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="your.email@example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
            <input v-model="contactInfo.phone" type="tel" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="+1 (234) 567-890" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
            <input v-model="contactInfo.location" type="text" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="City, Country" />
          </div>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
            <input v-model="contactInfo.github_url" type="url" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="https://github.com/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
            <input v-model="contactInfo.linkedin_url" type="url" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="https://linkedin.com/in/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Twitter URL</label>
            <input v-model="contactInfo.twitter_url" type="url" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="https://twitter.com/username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Dribbble URL</label>
            <input v-model="contactInfo.dribbble_url" type="url" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500" placeholder="https://dribbble.com/username" />
          </div>
        </div>
      </div>
      <div class="mt-6">
        <button @click="saveContactInfo" class="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50" :disabled="isLoading">
          {{ isLoading ? 'Saving...' : 'Save Contact Information' }}
        </button>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-folder" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Projects</h2>
        </div>
        <NuxtLink
          to="/xms/projects"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
        >
          Manage Projects
        </NuxtLink>
      </div>
      <div class="space-y-4">
        <div v-for="project in projectsStore.projects.slice(0, 4)" :key="project.id" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">{{ project.icon || '🚀' }}</span>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">{{ project.description }}</p>
                <div class="flex gap-2 mt-2">
                  <span v-if="project.featured" class="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-full">
                    Featured
                  </span>
                  <span v-if="!project.published" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    Draft
                  </span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <span
                v-for="tag in project.tags?.slice(0, 2)"
                :key="tag"
                class="text-xs px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
        <div v-if="projectsStore.projects.length === 0" class="text-center py-8">
          <p class="text-gray-500 dark:text-gray-400">No projects yet. <NuxtLink to="/xms/projects" class="text-purple-600 hover:text-purple-700">Add your first project</NuxtLink></p>
        </div>
      </div>
    </div>

    <!-- Contact Form Messages -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-gray-600 dark:text-gray-400 mr-2" />
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Recent Contact Messages</h2>
        </div>
        <NuxtLink
          to="/xms/contact"
          class="px-4 py-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors text-sm"
        >
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
        <div
          v-for="message in recentMessages"
          :key="message.id"
          class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
          :class="!message.read ? 'border-l-4 border-l-red-600' : ''"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ message.name }}</h3>
                <span v-if="!message.read" class="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-200 text-xs font-semibold rounded">
                  NEW
                </span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ message.email }}</p>
              <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mt-1">{{ message.subject }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-2">{{ formatDate(message.created_at) }}</p>
            </div>
            <NuxtLink
              to="/xms/contact"
              class="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded transition-colors"
            >
              View
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useSupabaseStore } from '~/stores/modules/supabase'
import { useAuthStore } from '~/stores/modules/auth'
import { useContactStore } from '~/stores/modules/contact'
import { useProjectsStore } from '~/stores/modules/projects'
import { useCmsStore } from '~/stores/modules/cms'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

// Use Pinia stores
const supabaseStore = useSupabaseStore()
const authStore = useAuthStore()
const contactStore = useContactStore()
const projectsStore = useProjectsStore()
const cmsStore = useCmsStore()

// Reactive variables
const isLoading = ref(false)

// Format date helper
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Show only recent 3 messages
const recentMessages = computed(() => contactStore.messages.slice(0, 3))

// Use CMS store data
const heroSection = computed(() => cmsStore.heroSection)
const aboutSection = computed(() => cmsStore.aboutSection)
const skills = computed(() => cmsStore.skills)
const contactInfo = computed(() => cmsStore.contactInfo)

// Skill management
const newSkillName = ref('')
const newSkillLevel = ref(75)
const newSkillCategory = ref('technical')
const skillCategories = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'language', label: 'Language' },
  { value: 'database', label: 'Database' },
  { value: 'tool', label: 'Tool' },
  { value: 'other', label: 'Other' }
]

// Projects
const projects = computed(() => projectsStore.projects)

/**
 * Load contact messages and CMS data on mount
 */
const loadContactMessages = async () => {
  await contactStore.fetchMessages()
}

/**
 * Load projects data
 */
const loadProjects = async () => {
  await projectsStore.fetchProjects()
}

/**
 * Load CMS data on mount
 */
const loadCmsData = async () => {
  await cmsStore.loadAllCmsData()
}

/**
 * Save hero section
 */
const saveHeroSection = async () => {
  const result = await cmsStore.updateHeroSection(heroSection.value)
  if (result.success) {
    toast.success(cmsStore.heroSuccess)
  } else {
    toast.error(result.error || 'Failed to save hero section')
  }
}

/**
 * Save about section
 */
const saveAboutSection = async () => {
  const result = await cmsStore.updateAboutSection(aboutSection.value)
  if (result.success) {
    toast.success(cmsStore.aboutSuccess)
  } else {
    toast.error(result.error || 'Failed to save about section')
  }
}

/**
 * Add new skill
 */
const addSkill = async () => {
  if (newSkillName.value.trim()) {
    const result = await cmsStore.createSkill({
      name: newSkillName.value.trim(),
      level: newSkillLevel.value,
      category: newSkillCategory.value
    })
    if (result.success) {
      toast.success(cmsStore.skillsSuccess)
      newSkillName.value = ''
      newSkillLevel.value = 75
      newSkillCategory.value = 'technical'
    } else {
      toast.error(result.error || 'Failed to add skill')
    }
  }
}

/**
 * Delete skill
 */
const deleteSkill = async (skillId) => {
  if (confirm('Are you sure you want to delete this skill?')) {
    const result = await cmsStore.deleteSkill(skillId)
    if (result.success) {
      toast.success(cmsStore.skillsSuccess)
    } else {
      toast.error(result.error || 'Failed to delete skill')
    }
  }
}

/**
 * Save contact information
 */
const saveContactInfo = async () => {
  const result = await cmsStore.updateContactInfo(contactInfo.value)
  if (result.success) {
    toast.success(cmsStore.contactInfoSuccess)
  } else {
    toast.error(result.error || 'Failed to save contact information')
  }
}

/**
 * Load messages and CMS data on mount
 */
onMounted(async () => {
  await loadContactMessages()
  await loadProjects()
  await loadCmsData()
})
</script>

<style scoped>
</style>
