<template>
  <div v-if="project" class="min-h-screen bg-white">
    <section class="py-16 md:py-32 px-desktop">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <!-- Left Column: Content -->
        <div class="lg:col-span-6">
          <div class="sticky top-32 h-[calc(100vh-10rem)] overflow-hidden flex flex-col">
            <!-- Category -->
            <div class="flex items-center gap-2 text-custom-primary mb-6">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L0 12L0 0L12 6Z" fill="currentColor" />
              </svg>
              <span class="text-lg md:text-xl font-medium">{{ project.categories?.name }}</span>
            </div>

            <!-- Title -->
            <h1 class="text-xl md:text-5xl text-custom-primary leading-tight mb-8">
              {{ project.title }}
            </h1>

            <!-- Meta Info -->
            <div class="space-y-2 mb-8">
              <div class="flex gap-2">
                <span class="md:text-xl">Client:</span>
                <span class="md:text-xl">{{ project.clients?.name || 'Client Name' }}</span>
              </div>
              <div class="flex gap-2">
                <span class="md:text-xl">Project Date:</span>
                <span class="md:text-xl">{{ project.year || '2025' }}</span>
              </div>
            </div>

            <!-- Divider -->
            <div class="w-full h-[1px] bg-gray-700"></div>

            <!-- Description -->
            <div class="flex-1 flex flex-col justify-between min-h-0">
              <div class="prose prose-lg md:text-xl text-gray-700 overflow-y-auto scrollbar-hide">
                <div v-if="paginatedOverview" v-html="paginatedOverview"></div>
                <div v-else>
                  <p>
                    nothing beats a placeholder description to show how the final text will appear on the
                    page. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="totalPages > 1" class="flex items-center gap-4 mt-8 pt-4 border-t border-gray-100 shrink-0">
                <NuxtLink :to="{ query: { ...route.query, page: currentPage - 1 } }"
                  class="text-sm font-medium transition-colors"
                  :class="currentPage > 1 ? 'text-custom-primary hover:text-custom-primary/70' : 'text-gray-300 pointer-events-none'">
                  Previous
                </NuxtLink>
                <span class="text-sm text-gray-500">Page {{ currentPage }} of {{ totalPages }}</span>
                <NuxtLink :to="{ query: { ...route.query, page: currentPage + 1 } }"
                  class="text-sm font-medium transition-colors"
                  :class="currentPage < totalPages ? 'text-custom-primary hover:text-custom-primary/70' : 'text-gray-300 pointer-events-none'">
                  Next
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-6 h-[calc(100vh-10rem)] overflow-y-auto scrollbar-hide">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(item, index) in dummyImages" :key="item.id"
              :class="[(index === 1 || index === 2) ? 'md:col-span-1' : 'md:col-span-2']">
              <img :src="item.url" :alt="project.title" class="w-full h-auto object-cover rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Other Work Section -->
    <WorkOther :current-slug="String(route.params.slug)" />
  </div>
  <div v-else-if="isLoading" class="min-h-screen flex items-center justify-center">
    <div class="animate-pulse text-custom-primary text-xl">Loading...</div>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="text-custom-primary text-xl">Project not found</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePublicProjectsStore } from '~/stores'

const route = useRoute()
const projectsStore = usePublicProjectsStore()

const isLoading = ref(true)
const project = ref(null)

const currentPage = computed(() => Number(route.query.page) || 1)
const itemsPerPage = 3

const overviewPages = computed(() => {
  const content = project.value?.overview || `
      <p>Nothing Overview available.</p>
   `

  if (process.server) return [content]

  try {
    const div = document.createElement('div')
    div.innerHTML = content

    const pages = []
    let currentChunk = ''
    let count = 0

    Array.from(div.children).forEach((child) => {
      currentChunk += child.outerHTML
      count++

      if (count >= itemsPerPage) {
        pages.push(currentChunk)
        currentChunk = ''
        count = 0
      }
    })

    if (currentChunk) pages.push(currentChunk)
    return pages.length ? pages : [content]
  } catch (e) {
    console.error('Error parsing overview content:', e)
    return [content]
  }
})

const totalPages = computed(() => overviewPages.value.length)

const paginatedOverview = computed(() => {
  if (overviewPages.value.length === 0) return ''
  const index = Math.max(0, Math.min(currentPage.value - 1, totalPages.value - 1))
  return overviewPages.value[index]
})

const dummyImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80' },
  { id: 2, url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80' },
  { id: 3, url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80' },
  { id: 4, url: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80' },
  { id: 5, url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
]

onMounted(async () => {
  isLoading.value = true
  const slug = route.params.slug

  const [projectResult] = await Promise.all([
    projectsStore.getProjectBySlug(slug),
    projectsStore.projects.length === 0 ? projectsStore.fetchProjects() : Promise.resolve()
  ])

  if (projectResult.success) {
    project.value = projectResult.data
  }
  isLoading.value = false
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>