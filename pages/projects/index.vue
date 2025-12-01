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

const { animateFadeInUp, animateStagger } = useGsap()

const header = ref()
const projectCards = ref([])

const projectsStore = usePublicProjectsStore()

onMounted(async () => {
  await projectsStore.fetchProjects()

  if (header.value) animateFadeInUp(header.value, 0)
  if (projectCards.value.length) animateStagger(projectCards.value, 0.2)
})
</script>
