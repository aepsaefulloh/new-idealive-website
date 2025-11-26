<template>
  <div>
    <div class="container-xl bg-idealive">
      <div
        class="container mx-auto md:h-dvh flex h-auto flex-col items-center justify-center md:gap-[11.64vw] gap-[20.513vw] md:px-0 px-[20px] md:py-0 py-[22.564vw]"
      >
        <div class="flex flex-col justify-center gap-4 main-trig">
          <h2 class="md:text-[4.299vw] text-[5.5vw] leading-[110%] text-center text-white">
            <span class="reveal-masks animate-invisibles">
              <span class="reveal-words py-1">{{ copy.heading1 }}</span>
            </span>
            <span class="reveal-masks animate-invisibles">
              <span class="reveal-words py-1">{{ copy.heading2 }}</span>
            </span>
            <span class="reveal-masks animate-invisibles">
              <span class="reveal-words py-1">{{ copy.heading3 }}</span>
            </span>
            <span class="reveal-masks animate-invisibles">
              <span class="reveal-words py-1">{{ copy.heading4 }}</span>
            </span>
          </h2>
          <NuxtLink to="/about" class="text-white mx-auto md:text-[1.323vw] flex items-center gap-4 leading-[100%] md:mt-[1.984vw]">
            More about us
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.07606 6.264H0.807129V7.69063H11.5793L7.26787 11.8941L7.08177 12.0749L7.25604 12.2675L7.86166 12.9345L8.04884 13.14L8.24892 12.9464L14.1718 7.16882L14.3697 6.97731L14.1718 6.78365L8.24892 1.00933L8.04884 0.815674L7.86166 1.02117L7.25604 1.68822L7.08177 1.87973L7.26787 2.06156L11.5793 6.26507L1.07606 6.264Z"
                fill="white"
                stroke="white"
                stroke-width="0.537946"
              />
            </svg>
          </NuxtLink>
        </div>
        <UtilsClientReuse :images-count="5"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const copy = {
  heading1: 'Jakarta-based since 2017, ',
  heading2: 'Idealive bridges brands and audiences ',
  heading3: 'with creativity and strategy, crafting',
  heading4: 'impactful connections that resonate.',
}

const headline = () => {
  const words = document.querySelectorAll(".reveal-words");
  const masks = document.querySelectorAll(".reveal-masks.animate-invisibles");

  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Set a breakpoint for mobile (adjust the value as needed)
  const isMobile = window.innerWidth < 768;
  const startPosition = isMobile ? "top 80%" : "bottom 2%";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-trig",
      start: startPosition, // Use the conditional start position
      end: "bottom top",
      markers: false,
    },
    defaults: { ease: "power4.out" },
  });

  tl.set(words, { yPercent: 100, skewX: -2 });
  tl.add(() => {
    masks.forEach((el) => el.classList.remove("animate-invisibles"));
  });
  tl.to(words, {
    yPercent: 0,
    skewX: 0,
    duration: 1,
    stagger: 0.19,
  });
};

onMounted(() => {
  headline()

  // Clear the interval when the component is unmounted
  onBeforeUnmount(() => {
    gsap.killTweensOf(".reveal-words"); // Clear ongoing headline animations
  gsap.killTweensOf(".reveal-masks"); // Clear any animations on reveal masks
   ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
  });
});
</script>


<style scoped>
/* Add custom styling for centering logos if there are less than 5 */
.md\:flex {
  display: flex;
}

.md\:flex.justify-center {
  justify-content: center;
}

.animate-invisibles {
  visibility: hidden !important;
}

.reveal-masks {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}

.reveal-words {
  display: inline-block;
}
</style>
