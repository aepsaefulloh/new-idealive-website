<template>
  <div class="w-full py-10">
    <swiper :modules="[Autoplay]" :autoplay="{
      delay: intervalDelay,
      disableOnInteraction: false
    }" :loop="true" :slides-per-view="1" :space-between="20" :navigation="false" :pagination="false" :breakpoints="{
        // Tablet (md): >= 768px -> 3 item
        768: {
          slidesPerView: 3,
          spaceBetween: 30
        },
        // Desktop (lg): >= 1024px -> 5 item
        1024: {
          slidesPerView: 5,
          spaceBetween: 40
        }
      }" class="w-full" @swiper="onSwiper" @slideChange="onSlideChange">
      <swiper-slide v-for="(logo, index) in logos" :key="index">
        <div class="flex items-center justify-center h-24">
          <img :src="logo.client_logo" alt="Client logo" />
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Delay autoplay
const intervalDelay = 2500;

// Data dummy (pastikan path gambar benar)
const logos = ref([
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
]);

const onSwiper = (swiper) => {
  // console.log(swiper);
};

const onSlideChange = () => {
  // console.log('slide change');
};
</script>

<style scoped></style>