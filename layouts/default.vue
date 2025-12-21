<template>
  <div>
    <UtilsTransition v-if="!isLoginPage" />
    <CustomCursor v-if="!isLoginPage" />
    <Navbar v-if="!isLoginPage" />

    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <slot />
        </main>
        <Footer v-if="!isLoginPage" />
      </div>
    </div>
  </div>
</template>

<script setup>
import CustomCursor from '~/components/CustomCursor.vue'
import Navbar from '~/components/Utils/Navbar.vue'
import Footer from '~/components/Utils/Footer.vue'
import { useRoute } from 'vue-router'
import { onMounted, onBeforeUnmount, watch } from 'vue'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

const route = useRoute()

console.log('Current route:', route.path)

const isLoginPage = route.path === '/xms/login'

let smoother;

onMounted(() => {
  if (process.client && !isLoginPage) {
    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      effects: true,
      smoothTouch: 0.1,
    });
  }
});

onBeforeUnmount(() => {
  if (smoother) {
    smoother.kill();
  }
});

watch(() => route.path, () => {
  if (smoother) {
    smoother.scrollTop(0);
  }
});
</script>
