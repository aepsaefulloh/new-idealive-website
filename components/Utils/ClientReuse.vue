<template>
  <div class="w-full py-10">
    <swiper :modules="[Autoplay]" :autoplay="{
      delay: intervalDelay,
      disableOnInteraction: false
    }" :loop="loopEnabled" :slides-per-view="1" :space-between="20" :navigation="false" :pagination="false" :breakpoints="{
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40
        }
      }" class="w-full" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-if="clientsStore.isLoading" v-for="i in 6" :key="`skeleton-${i}`">
          <SkeletonLoading  type="image" class="h-24 w-full" />
      </swiper-slide>

      <swiper-slide v-else v-for="(logo, index) in logos" :key="logo.id || index">
        <div class="flex items-center justify-center h-24 w-full">
          <img :src="logo.client_logo" :alt="logo.name || 'Client logo'" loading="lazy" class="h-24 object-contain" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { usePublicClientsStore } from '~/stores';
import SkeletonLoading from '~/components/Utils/SkeletonLoading.vue';

const intervalDelay = 2500;

const clientsStore = usePublicClientsStore();

const logos = computed(() => {
  const clients = (clientsStore.activeClients && clientsStore.activeClients.length) ? clientsStore.activeClients : (clientsStore.clients || []);
  return clients.map(c => ({
    id: c.id,
    client_logo: c.image_url || c.logo || '/images/placeholder-client.svg',
    name: c.name || 'Client logo'
  }));
});

// responsive slidesPerView detection
const slidesPerView = ref(1);
const updateSlidesPerView = () => {
  const w = window.innerWidth;
  slidesPerView.value = w >= 1024 ? 5 : w >= 768 ? 3 : 1;
};

const loopEnabled = computed(() => {
  if (clientsStore.isLoading) return false;
  const count = logos.value.length || 0;
  return count > 1 && count >= slidesPerView.value;
});

onMounted(async () => {
  updateSlidesPerView();
  window.addEventListener('resize', updateSlidesPerView);

  if (!clientsStore.clients || clientsStore.clients.length === 0) {
    await clientsStore.fetchClients();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateSlidesPerView);
});

const onSwiper = (swiper) => {
  // noop
};

const onSlideChange = () => {
  // noop
};
</script>

<style scoped></style>