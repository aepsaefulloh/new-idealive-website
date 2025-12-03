<template>
 <div></div>
</template>

<script setup>
import { usePublicProjectsStore } from '~/stores/modules/public/projects'

useHead({
  title: 'Selected Works | Aep Saefulloh - Digital Artisan',
  meta: [
    { name: 'description', content: 'Explore the portfolio of Aep Saefulloh, featuring creative web projects, applications, and digital experiments.' }
  ]
})

const header = ref()
const projectCards = ref([])

const projectsStore = usePublicProjectsStore()

onMounted(async () => {
  await projectsStore.fetchProjects()
})
</script>
