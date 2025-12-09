<template>
   <section class="py-16 md:py-32 px-desktop">
      <div class="text-center">
         <h1 class="text-4xl md:text-6xl text-custom-primary">Portfolio</h1>
      </div>
      <div class="mt-10 flex flex-nowrap overflow-x-auto md:flex-wrap justify-start md:justify-center gap-6 md:gap-10 text-lg md:text-xl pb-4 md:pb-0 scrollbar-hide">
         <button v-for="filter in filters" :key="filter" class="pb-2 border-b-2 transition-colors duration-200 whitespace-nowrap flex-shrink-0"
            :class="activeFilter === filter ? 'text-custom-primary border-custom-primary' : 'text-custom-primary/60 border-transparent hover:text-custom-primary'"
            @click="activeFilter = filter">
            {{ filter }}
         </button>
      </div>

      <MasonryWall :items="filteredProjects" :ssr-columns="3" :column-width="masonryConfig.columnWidth"
         :gap="masonryConfig.gap" :min-columns="1" :max-columns="3" class="mt-12 md:mt-16">
         <template #default="{ item }">
            <div class="group relative overflow-hidden shadow-sm bg-white border border-gray-100 mb-6 md:mb-8">
               <div class="overflow-hidden">
                  <img :src="item.thumbnail_url" :alt="item.title"
                     class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
               </div>

               <div
                  class="absolute inset-0 bg-custom-primary/90 text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center w-full">
                     <span class="md:text-lg uppercase tracking-wide line-clamp-2">{{ item.clients?.name || item.role
                        }}</span>
                     <span class="hidden md:block w-8 md:w-10 h-[1px] bg-white shrink-0"></span>
                     <h3 class="md:text-lg uppercase tracking-wide line-clamp-2">{{ item.title }}</h3>
                  </div>
                  <div class="absolute bottom-8 left-0 right-0 text-center">
                     <p class="text-xs text-white/80 uppercase tracking-wide">{{ item.year }}</p>
                  </div>
               </div>
            </div>
         </template>
      </MasonryWall>

      <div v-if="filteredProjects.length === 0" class="text-center text-custom-primary/60 mt-12">
         No portfolio found for this category.
      </div>
   </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { usePublicProjectsStore, usePublicCategoriesStore } from '~/stores'

const projectsStore = usePublicProjectsStore()
const categoriesStore = usePublicCategoriesStore()

const activeFilter = ref('All')

const projects = computed(() => projectsStore.projects)

const filters = computed(() => {
   const projectCategories = categoriesStore.projectCategories
   return ['All', ...projectCategories.map(c => c.name)]
})

const filteredProjects = computed(() => {
   if (activeFilter.value === 'All') {
      return projects.value
   }
   return projects.value.filter(p => p.categories?.name === activeFilter.value)
})

const masonryConfig = computed(() => {
   if (process.client) {
      const width = window.innerWidth
      if (width >= 1024) return { columns: 3, columnWidth: 350, gap: 24 }
      if (width >= 768) return { columns: 2, columnWidth: 320, gap: 20 }
      return { columns: 1, columnWidth: 300, gap: 16 }
   }
   return { columns: 3, columnWidth: 350, gap: 24 }
})

watch(filters, (newFilters) => {
   if (!newFilters.includes(activeFilter.value)) {
      activeFilter.value = 'All'
   }
})

onMounted(async () => {
   await Promise.all([
      projectsStore.fetchProjects(),
      categoriesStore.fetchCategories()
   ])

   const handleResize = () => {
      masonryConfig.value
   }

   window.addEventListener('resize', handleResize)

   onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
   })
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

:deep(.masonry-wall) {
   width: 100%;
}

:deep(.masonry-wall-column) {
   display: flex;
   flex-direction: column;
}

:deep(.masonry-wall-item img) {
   width: 100%;
   height: auto;
   display: block;
}

@media (max-width: 768px) {
   :deep(.masonry-wall) {
      gap: 16px;
   }
}

@media (max-width: 640px) {
   :deep(.masonry-wall) {
      gap: 12px;
   }
}
</style>