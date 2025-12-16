<template>
  <div class="min-h-screen bg-idealive text-white flex flex-col relative overflow-hidden font-secondary">
    <!-- Center Content -->
    <div class="flex-1 flex flex-col items-center justify-center text-center z-10 px-4">
      <h1 class="text-6xl md:text-8xl lg:text-[120px] leading-tight mb-4 md:mb-8 font-normal">
        Get In Touch
      </h1>
      
      <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xl md:text-3xl lg:text-4xl">
        <a :href="`mailto:${contactInfo?.email || 'hello@idealive.co.id'}`" class="border-b border-white/50 hover:border-white transition-colors pb-1">
          {{ contactInfo?.email || 'hello@idealive.co.id' }}
        </a>
        <a :href="`tel:${contactInfo?.phone || '+628129011923412'}`" class="border-b border-white/50 hover:border-white transition-colors pb-1">
          {{ contactInfo?.phone || '+628129011923412' }}
        </a>
      </div>
    </div>

    <!-- Bottom Content -->
    <div class="w-full px-desktop pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 z-10">
      <!-- Office -->
      <div class="md:col-span-6 lg:col-span-4">
        <h3 class="text-lg font-bold mb-4">Office</h3>
        <p class="text-base md:text-lg leading-relaxed opacity-90 max-w-md">
          {{ contactInfo?.address || 'Jl. H. Ismail No.12 1, RT.1/RW.4, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430' }}
        </p>
      </div>

      <!-- Social -->
      <div class="md:col-span-6 lg:col-span-4 md:col-start-8 lg:col-start-8">
        <h3 class="text-lg font-bold mb-4">Social</h3>
        <div class="flex flex-col gap-2">
          <template v-if="socials.length">
            <a v-for="social in socials" :key="social.name" :href="social.url" target="_blank" rel="noopener noreferrer" 
               class="text-base md:text-lg hover:opacity-70 transition-opacity">
              {{ social.name }}
            </a>
          </template>
          <template v-else>
             <a href="#" class="text-base md:text-lg hover:opacity-70 transition-opacity">Instagram</a>
             <a href="#" class="text-base md:text-lg hover:opacity-70 transition-opacity">Linkedin</a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePublicCmsStore } from '@/stores/modules/public/cms'

const cmsStore = usePublicCmsStore()

useHead({
  title: 'Contact | Idealive',
  meta: [
    { name: 'description', content: 'Get in touch with Idealive.' }
  ]
})

const contactInfo = computed(() => cmsStore.contactInfo)

const socials = computed(() => {
  const data = contactInfo.value || {}
  const socialLinks = []
  
  // Prioritize Instagram and Linkedin as per design
  if (data.instagram_url) socialLinks.push({ name: 'Instagram', url: data.instagram_url })
  if (data.linkedin_url) socialLinks.push({ name: 'Linkedin', url: data.linkedin_url })
  
  // Other socials
  if (data.github_url) socialLinks.push({ name: 'GitHub', url: data.github_url })
  if (data.twitter_url) socialLinks.push({ name: 'Twitter', url: data.twitter_url })
  if (data.dribbble_url) socialLinks.push({ name: 'Dribbble', url: data.dribbble_url })
  
  return socialLinks
})

onMounted(async () => {
  await cmsStore.fetchContactInfo()
})
</script>
