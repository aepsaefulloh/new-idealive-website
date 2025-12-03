<template>
  <div>
    <LazyHomeHero />
    <LazyHomeProject />
    <LazyHomeCta />
  </div>
</template>

<script setup>
import { homeSeo } from '~/utils/seo/homepage.js'

definePageMeta({
  layout: 'default'
})

useHead({
  ...homeSeo,
  meta: [
    ...(homeSeo?.meta || []),
    { property: 'og:image', content: '/images/og/og-home.png' }
  ]
})
</script>
