<template>
    <div class="relative bg-void py-20 overflow-hidden" id="projects">
        <div class="container mx-auto px-6 mb-12">
            <h2 class="font-syne font-bold text-4xl md:text-6xl text-white mb-4">Selected Works</h2>
            <p class="font-space text-gray-400 max-w-xl">A collection of digital products and experiences crafted with
                precision.</p>
        </div>

        <div ref="scrollContainer" class="flex gap-8 px-6 overflow-x-auto pb-12 hide-scrollbar">
            <div v-for="(project, index) in projects" :key="index"
                class="project-card flex-shrink-0 w-[85vw] md:w-[600px] group cursor-pointer relative"
                @click="navigateTo(`/projects/${project.slug}`)">

                <div class="relative aspect-video overflow-hidden rounded-2xl mb-6">
                    <div class="absolute inset-0 bg-gray-800 animate-pulse" v-if="!project.image"></div>
                    <NuxtImg v-if="project.image" :src="project.image" :alt="project.title"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div class="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500">
                    </div>

                    <!-- Floating Badge -->
                    <div
                        class="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                        <span class="font-space text-xs text-white uppercase tracking-wider">{{ project.category
                            }}</span>
                    </div>
                </div>

                <div class="flex justify-between items-end">
                    <div>
                        <h3
                            class="font-syne font-bold text-2xl md:text-3xl text-white mb-2 group-hover:text-electric-blue transition-colors">
                            {{ project.title }}
                        </h3>
                        <p class="font-space text-gray-400 text-sm md:text-base line-clamp-2 max-w-md">
                            {{ project.description }}
                        </p>
                    </div>

                    <div
                        class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-electric-blue group-hover:border-electric-blue transition-all duration-300">
                        <UIcon name="i-heroicons-arrow-up-right" class="w-6 h-6 text-white" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const projects = ref([
    {
        title: 'E-Commerce Platform',
        slug: 'ecommerce-platform',
        category: 'Web App',
        description: 'A full-featured e-commerce solution built with Nuxt 3 and Supabase.',
        image: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Finance Dashboard',
        slug: 'finance-dashboard',
        category: 'Dashboard',
        description: 'Real-time financial analytics dashboard with interactive charts.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'AI Content Generator',
        slug: 'ai-generator',
        category: 'SaaS',
        description: 'AI-powered content generation tool for marketers.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop'
    },
    {
        title: 'Portfolio V1',
        slug: 'portfolio-v1',
        category: 'Website',
        description: 'Previous version of my personal portfolio website.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop'
    }
])
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
