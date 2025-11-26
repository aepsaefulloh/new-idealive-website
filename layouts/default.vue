<template>
  <div>
    <UtilsTransition v-if="!isLoginPage" />
    <CustomCursor v-if="!isLoginPage" />
    <Navbar v-if="!isLoginPage" />
    <main>
      <slot />
    </main>
    <Footer v-if="!isLoginPage" />
  </div>
</template>

<script setup>
import CustomCursor from '~/components/CustomCursor.vue'
import Navbar from '~/components/Utils/Navbar.vue'
import Footer from '~/components/Utils/Footer.vue'
import { useRoute } from 'vue-router'
const route = useRoute()

console.log('Current route:', route.path)

const isLoginPage = route.path === '/xms/login'
</script>
