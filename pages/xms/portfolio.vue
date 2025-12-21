<template>
  <div>
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Portfolio CMS</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content, hero section, and contact form
        submissions</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <HeroSection />
      <AboutSection />
    </div>

    <ContactInfo />

    <Services />

    <RecentProjects />

    <ContactMessages />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAdminCmsStore } from '@/stores'
import HeroSection from '@/components/dashboard/portfolio/HeroSection.vue'
import AboutSection from '@/components/dashboard/portfolio/AboutSection.vue'
import ContactInfo from '@/components/dashboard/portfolio/ContactInfo.vue'
import Services from '@/components/dashboard/portfolio/Services.vue'
import RecentProjects from '@/components/dashboard/portfolio/RecentProjects.vue'
import ContactMessages from '@/components/dashboard/portfolio/ContactMessages.vue'

definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})

const cmsStore = useAdminCmsStore()

const loadCmsData = async () => {
  await cmsStore.loadAllCmsData()
}

onMounted(async () => {
  await loadCmsData()
})
</script>
