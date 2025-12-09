<template>
    <section class="py-16 md:py-24 px-desktop">
        <div class="flex justify-between items-end mb-8">
            <h2 class="text-3xl md:text-4xl">Other Work</h2>
            <NuxtLink to="/work"
                class="text-lg hover:opacity-70 transition-opacity flex items-center gap-2 group">
                Back to portfolio <span class="text-xl transition-transform group-hover:translate-x-1">→</span>
            </NuxtLink>
        </div>

            <div class="w-full h-[1px] bg-gray-700 mb-8"></div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <NuxtLink v-for="item in otherProjects" :key="item.id" :to="`/work/${item.slug}`" class=" group block">
                <div class="relative aspect-[4/3] bg-gray-200 overflow-hidden rounded-sm mb-4">
                    <div>
                        <img v-if="item.thumbnail_url" :src="item.thumbnail_url" :alt="item.title"
                            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div
                        class="absolute inset-0 bg-custom-primary/90 text-white flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <div
                            class="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-center w-full">
                            <span class="md:text-lg uppercase tracking-wide line-clamp-2">{{ item.clients?.name ||
                                item.role
                            }}</span>
                            <span class="hidden md:block w-8 md:w-10 h-[1px] bg-white shrink-0"></span>
                            <h3 class="md:text-lg uppercase tracking-wide line-clamp-2">{{ item.title }}</h3>
                        </div>
                        <div class="absolute bottom-8 left-0 right-0 text-center">
                            <p class="text-xs text-white/80 uppercase tracking-wide">{{ item.year }}</p>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { usePublicProjectsStore } from '~/stores'

const props = defineProps({
    currentSlug: {
        type: String,
        required: true
    }
})

const projectsStore = usePublicProjectsStore()

const otherProjects = computed(() => {
    return projectsStore.projects
        .filter(p => p.slug !== props.currentSlug)
        .slice(0, 3)
})
</script>
