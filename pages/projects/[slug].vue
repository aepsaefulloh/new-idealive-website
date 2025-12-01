<template>
  <div></div>
</template>

<script setup>
import { usePublicProjectsStore } from '~/stores/modules/public/projects'

const route = useRoute()
const { animateFadeInUp } = useGsap()

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

  if (project.value) {
    if (header.value) animateFadeInUp(header.value, 0)
    if (imageSection.value) animateFadeInUp(imageSection.value, 0.2)
    if (contentSection.value) animateFadeInUp(contentSection.value, 0.3)
  }
})
</script>
