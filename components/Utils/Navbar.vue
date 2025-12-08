<template>
  <nav :class="navbarClass" class="w-full fixed top-0 z-50 transition-all duration-300 container-xl px-desktop">
    <div class="mx-auto flex md:py-8 py-6 items-center justify-between">
      <NuxtLink to="/">
        <img src="/images/logo-idealive-blue.svg" class="md:w-[107px] w-[90px]" :class="{
          'filter grayscale brightness-[999999]': isSpecialPage,
        }" alt="Idealive Logo" />
      </NuxtLink>
      <!-- Desktop Nav -->
      <div class="hidden md:flex gap-8 items-center">
        <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.link"
          class="text-[#2054FA]/60 transition-all duration-300 pb-1 border-b-2 border-transparent" :class="{
            '!text-[#2054FA] !border-custom-primary heading': isActive(item.link) && !isSpecialPage,
            '!text-white !border-white heading': isSpecialPage && isActive(item.link),
            'text-white/60': isSpecialPage && !isActive(item.link)
          }">
          {{ item.name }}
        </NuxtLink>
      </div>
      <NuxtLink to="/" class="text-idealive md:block hidden" :class="{ '!text-white': isSpecialPage }">
        {{ contactInfo?.email || 'Loading...' }}
      </NuxtLink>

      <!-- Mobile Hamburger Menu -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-idealive">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            :stroke="isSpecialPage ? '#ffff' : '#2054FA'" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu (fullscreen slide left) -->
    <transition name="slide-fade" @enter="animateMobileNavItems">
      <div v-if="menuOpen" class="fixed top-0 left-0 w-full h-full bg-idealive text-white shadow-lg md:hidden">
        <div class="flex flex-col items-start justify-start px-[20px] pb-[20px] pt-[80px] min-h-dvh space-y-6">
          <div class="absolute top-0 left-0 flex justify-between w-full py-6 px-[20px]">
            <NuxtLink to="/" @click="toggleMenu"><img src="/images/logo-idealive.svg" class="w-[90px]"
                alt="Idealive Logo" /></NuxtLink>
            <button @click="toggleMenu" class="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <NuxtLink v-for="(item, index) in navItems" :key="index" :to="item.link"
            class="nav-item text-2xl text-white/60 w-full pb-3 flex items-center gap-2 overflow-hidden"
            @click="toggleMenu" :class="{
              '!text-white': isActive(item.link),
            }">
            <div class="nav-item-content flex items-center gap-2">
              <svg v-if="isActive(item.link)" width="12" height="14" viewBox="0 0 12 14" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7L0 13.9282V0.0717969L12 7Z" fill="white" />
              </svg>

              {{ item.name }}
            </div>
            <div class="nav-item-border absolute bottom-0 left-0 h-[1px] bg-white/60 w-0"></div>
          </NuxtLink>
          <div class="!mt-auto">
            <h5 class="md:text-[4.63vw] text-[10.256vw] leading-[110%] flex items-center gap-4">
              Make your
              <svg class="mt-[0.8vw] md:w-[3vw] w-[6vw]" viewBox="0 0 41 38" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.92892 17.0027H2.19678V20.8749H31.5235L19.7858 32.2845L19.2791 32.7751L19.7536 33.2978L21.4023 35.1084L21.9119 35.6662L22.4566 35.1405L38.5813 19.4586L39.1202 18.9388L38.5813 18.4132L22.4566 2.74001L21.9119 2.21436L21.4023 2.77213L19.7536 4.5827L19.2791 5.10251L19.7858 5.59604L31.5235 17.0056L2.92892 17.0027Z"
                  fill="white" stroke="white" stroke-width="0.537946" />
              </svg>
            </h5>
            <h5 class="md:text-[4.63vw] text-[10.256vw] leading-[110%] flex items-center gap-4">
              brand
              <UtilsWording />
            </h5>
            <div class="flex text-[12px] justify-between mt-6">
              <a href="tel:+628129011923412">+628129011923412</a>
              <a href="mailto:hello@idealive.co.id">hello@idealive.co.id</a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { useContactInfo } from "@/composables/useContactInfo";

const { contactInfo, fetchIfNeeded } = useContactInfo();
const route = useRoute();
const navbarClass = ref("bg-transparent");
const lastScrollY = ref(0);
const menuOpen = ref(false);


const navItems = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Work", link: "/work" },
  { name: "Career", link: "/career" },
  { name: "Contact", link: "/contact" },
];

const specialPages = ['/about', '/career', '/contact', '/login'];

const isSpecialPage = computed(() => {
  return specialPages.includes(route.path);
});

const isActive = (link) => {
  return route.path === link;
};

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const animateMobileNavItems = (el) => {
  const navItems = el.querySelectorAll('.nav-item-content');
  const navBorders = el.querySelectorAll('.nav-item-border');

  gsap.set(navItems, { x: '-100%', opacity: 0 });
  gsap.set(navBorders, { width: 0 });

  gsap.to(navItems, {
    x: '0%',
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out"
  });

  gsap.to(navBorders, {
    width: '100%',
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.inOut",
    delay: 0.2
  });
};

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY < 50) {
    navbarClass.value = 'bg-transparent';
  } else {
    navbarClass.value = isSpecialPage.value ? 'bg-idealive' : 'bg-white';
  }

  lastScrollY.value = currentScrollY;
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
  await fetchIfNeeded();
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
