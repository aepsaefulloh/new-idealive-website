<template>
  <div class="w-full py-10">
    <div v-if="clientsStore.isLoading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
      <SkeletonLoading v-for="i in 5" :key="`skeleton-${i}`" type="image" class="h-24 w-full" />
    </div>

    <swiper v-else-if="clients.length > 0" :modules="[Autoplay]" :autoplay="{
      delay: intervalDelay,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }" :loop="shouldLoop" :slides-per-view="2" :space-between="20" :breakpoints="{
      640: { slidesPerView: 2, spaceBetween: 20 },
      768: { slidesPerView: 3, spaceBetween: 30 },
      1024: { slidesPerView: 5, spaceBetween: 40 }
    }" class="w-full select-none">
      <swiper-slide v-for="item in clients" :key="item.id || item.image_url">
        <a :href="item.website_url || '#'" :class="[item.website_url ? 'cursor-pointer' : 'cursor-default']"
          target="_blank" rel="noopener noreferrer" class="flex items-center justify-center h-28 w-full group">
          <img :src="item.image_url" :alt="item.name || 'Client logo'" loading="lazy"
            class="h-20 w-auto object-contain transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:scale-110" />
        </a>
      </swiper-slide>
    </swiper>

    <div v-else class="text-center text-gray-400 text-sm py-4">
      No clients available.
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { usePublicClientsStore } from '~/stores';
import SkeletonLoading from '~/components/Utils/SkeletonLoading.vue';

const intervalDelay = 2500;
const clientsStore = usePublicClientsStore();

const clients = computed(() => {
  return clientsStore.activeClients?.length
    ? clientsStore.activeClients
    : (clientsStore.clients || []);
});

const shouldLoop = computed(() => {
  return clients.value.length > 5;
});

onMounted(async () => {
  if (!clientsStore.clients || clientsStore.clients.length === 0) {
    await clientsStore.fetchClients();
  }
});
</script>

<style scoped>
:deep(.swiper-wrapper) {
  align-items: center;
}
</style>