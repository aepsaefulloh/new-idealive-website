<template>
  <div></div>
</template>

<script setup>
import { usePublicProjectsStore } from '~/stores/modules/public/projects'

const route = useRoute()

const header = ref()
const imageSection = ref()
const contentSection = ref()

const projectsStore = usePublicProjectsStore()

// Find project by slug
const project = computed(() => {
  const slug = route.params.slug
  return projectsStore.projects.find(p => p.slug === slug) || null
})

useHead({
  title: computed(() => project.value ? `${project.value.title} | Aep Saefulloh` : 'Project Not Found'),
  meta: [
    { name: 'description', content: computed(() => project.value ? project.value.description : 'Project details') }
  ]
})

onMounted(async () => {
  await projectsStore.fetchProjects()
})
</script>
