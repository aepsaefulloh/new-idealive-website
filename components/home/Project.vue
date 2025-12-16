<template>
  <div class="">
    <section class="container-xl agis px-desktop md:py-[10.582vw] py-[12.821vw]">
      <h5 ref="workHeading" class="md:text-[3.968vw] text-center text-idealive text-[6.667vw] overflow-hidden">
        <span class="work-text">
          <span v-for="(char, index) in 'Work'.split('')" :key="index" class="char inline-block">
            {{ char }}
          </span>
        </span>
      </h5>
      <div class="md:mt-[4.63vw] mt-[10.256vw] grid grid-cols-1 md:gap-[40px] gap-[100px] md:grid-cols-2">
        <NuxtLink v-for="(project, index) in highlight" :key="project.id || index" :to="`/work/${project.slug}`" :class="[
          index === 0 || index === 3 ? 'md:col-span-2' : '',
          getImageClass(index),
        ]" class="w-full relative">
          <UtilsFreeze :gifSrc="project.thumbnail_url || (project.banner_images && project.banner_images[0]) || project.banner_url" :alt="project.title" />
          <div class="absolute top-0 left-0 inset-0 text-white bg-black/30 md:flex hidden flex-col md:p-8">
            <p>{{ project.title }}</p>
            <p class="mt-auto sticky bottom-8 md:pt-10">
              {{ project.year || (project.created_at ? new Date(project.created_at).getFullYear() : '') }}
            </p>
          </div>
          <div class="absolute -bottom-14 md:hidden flex flex-col gap-1">
            <p class="leading-[100%] text-[18px]">{{ project.title }}</p>
            <p class="text-[14px] text-[#424242]/60">
              {{ project.year || (project.created_at ? new Date(project.created_at).getFullYear() : '') }}
            </p>
          </div>
        </NuxtLink>
      </div>
      <div class="md:text-center md:mt-[3.968vw] mt-[25.821vw]">
        <UtilsButtonCta :title="'See all projects'" :root="'/work'" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { usePublicProjectsStore } from '~/stores'

const workHeading = ref(null);
const projectsStore = usePublicProjectsStore()

const highlight = computed(() => {
  // Use latest 4 projects (store fetch orders by created_at desc)
  const projects = projectsStore.projects || []
  return projects.slice(0, 4)
})

function getImageClass(index) {
  const classes = {
    0: "aspect-video",
    1: "md:h-[60vw] h-[99.231vw]",
    2: "md:h-[60vw] h-[99.231vw]",
    3: "aspect-video",
  };
  return classes[index] || "";
}

let ctx;

const animateWorkHeading = () => {
  const chars = workHeading.value.querySelectorAll('.char');

  gsap.set(chars, {
    y: "100%",
    opacity: 0
  });

  gsap.to(chars, {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: workHeading.value,
      start: "top 80%",
      toggleActions: "play none none none",
    }
  });
};

onMounted(async () => {
  ctx = gsap.context(() => {
    animateWorkHeading();
  });

  // Fetch latest projects if not loaded
  if (!projectsStore.projects || projectsStore.projects.length === 0) {
    await projectsStore.fetchProjects()
  }
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>

<style scoped>
.bg-cover {
  background-position: center center;
  background-size: cover;
}

.work-text {
  display: inline-block;
  position: relative;
}

.char {
  display: inline-block;
  transform-origin: center bottom;
  position: relative;
}
</style>
