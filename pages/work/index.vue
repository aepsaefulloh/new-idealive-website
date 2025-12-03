<template>
    <div>
 <div v-for="project in projectsStore.projects" :key="project.id" ref="projectCards">
    {{ project.title }}
 </div>
    </div>

</template>

<script setup>
import { usePublicProjectsStore } from '~/stores/modules/public/projects'


const header = ref()
const projectCards = ref([])

const projectsStore = usePublicProjectsStore()

onMounted(async () => {
  await projectsStore.fetchProjects()
})
</script>
