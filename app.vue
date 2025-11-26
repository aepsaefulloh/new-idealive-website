<template>
    <NuxtLayout>
      <NuxtRouteAnnouncer/>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
import { useThemeStore } from '~/stores'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})

useHead({
    titleTemplate: '%s'
})
</script>
