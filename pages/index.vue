<template>
  <div>
    <HomeHero />
    <HomeProject />
    <HomeCta />
  </div>
</template>

<script setup>
import { homeSeo } from '~/utils/seo/homepage.js'

useHead({
  ...homeSeo,
  meta: [
    ...homeSeo.meta,
    { property: 'og:image', content: '/images/og/og-home.png' }
  ]
})
</script>
