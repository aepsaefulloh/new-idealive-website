<template>
    <div>
 <div v-for="project in projectsStore.publishedProjects" :key="project.id" ref="projectCards">
    {{ project.title }}
 </div>
    </div>

</template>

<script setup>
import { useProjectsStore } from '~/stores/modules/projects'


const { animateFadeInUp, animateStagger } = useGsap()

const header = ref()
const projectCards = ref([])

const projectsStore = useProjectsStore()

onMounted(async () => {
  await projectsStore.fetchProjects()

  if (header.value) animateFadeInUp(header.value, 0)
  if (projectCards.value.length) animateStagger(projectCards.value, 0.2)
})
</script>
