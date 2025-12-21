<template>
  <div>
    <AboutHero :aboutSection="aboutSection" />
    <AboutStrategy />
    <AboutQuote />
    <AboutTeam />
    <AboutClients />
    <AboutCta />
  </div>
</template>

<script setup>
useHead({
  title: 'About Us - Idealive',
  meta: [
    { name: 'description', content: 'Founded in Jakarta in 2017, Idealive bridges brands and audiences with creativity and strategy.' }
  ]
})

import { usePublicCmsStore } from '@/stores'

const cmsStore = usePublicCmsStore()
const aboutSection = computed(() => cmsStore.getAboutSection)

onMounted(async () => {
  await cmsStore.fetchAboutSection()
})
</script>
