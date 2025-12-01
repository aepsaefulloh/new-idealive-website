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
      <div
        class="md:mt-[4.63vw] mt-[10.256vw] grid grid-cols-1 md:gap-[40px] gap-[100px] md:grid-cols-2"
      >
        <NuxtLink
          v-for="(item, index) in highlight"
          :key="index"
          :class="[
            index === 0 || index === 3 ? 'md:col-span-2' : '',
            getImageClass(index),
          ]"
          class="w-full relative"
        >
          <UtilsFreeze :gifSrc="item.work.cover" :alt="item.work.title" />
          <div
            class="absolute top-0 left-0 inset-0 text-white bg-black/30 md:flex hidden flex-col md:p-8"
          >
            <p>{{ item.work.title }}</p>
            <p class="mt-auto sticky bottom-8 md:pt-10">
              {{ item.work.project_date }}
            </p>
          </div>
          <div class="absolute -bottom-14 md:hidden flex flex-col gap-1">
            <p class="leading-[100%] text-[18px]">{{ item.work.title }}</p>
            <p class="text-[14px] text-[#424242]/60">
              {{ item.work.project_date }}
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
import { ref, onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const workHeading = ref(null);
const highlight = ref([
  {
    work: {
      slug: 'work-1',
      cover: '/images/dummy1.webp',
      title: 'Project One',
      project_date: '2023'
    }
  },
  {
    work: {
      slug: 'work-2',
      cover: '/images/dummy2.webp',
      title: 'Project Two',
      project_date: '2023'
    }
  },
  {
    work: {
      slug: 'work-3',
      cover: '/images/dummy3.jpg',
      title: 'Project Three',
      project_date: '2023'
    }
  },
  {
    work: {
      slug: 'work-4',
      cover: '/images/dummy4.jpg',
      title: 'Project Four',
      project_date: '2023'
    }
  }
]);

// Function to return the appropriate image class
function getImageClass(index) {
  const classes = {
    0: "aspect-video",
    1: "md:h-[60vw] h-[99.231vw]",
    2: "md:h-[60vw] h-[99.231vw]",
    3: "aspect-video",
  };
  return classes[index] || "";
}

// Fetch data from API or local storage
onMounted(() => {
  animateWorkHeading();
});

const animateWorkHeading = () => {
  // Get all character elements
  const chars = workHeading.value.querySelectorAll('.char');
  
  // Set initial state - move characters up and hide them
  gsap.set(chars, { 
    y: "100%",
    opacity: 0
  });
  
  // Create the animation
  gsap.to(chars, {
    y: "0%",
    opacity: 1,
    duration: 0.8,
    stagger: 0.1, // Stagger the animation for each character
    ease: "power3.out",
    scrollTrigger: {
      trigger: workHeading.value,
      start: "top 80%", // Start animation when the top of the heading is 80% from the top of the viewport
      toggleActions: "play none none none", // Play animation once when scrolled into view
      // markers: true, // Uncomment for debugging
    }
  });
};
</script>

<style scoped>
/* Remove background-attachment and fixed background positioning */
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
