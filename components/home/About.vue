<template>
  <div>
    <div class="container-xl bg-idealive">
      <div
        class="container mx-auto md:min-h-screen flex h-auto flex-col items-center justify-center md:justify-start md:pt-[8vh] md:gap-[6vw] gap-[20.513vw] md:px-0 px-[20px] md:py-0 py-[22.564vw]">
        <div class="flex flex-col justify-center gap-4 main-trigger">
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
          <NuxtLink to="/about"
            class="text-white mx-auto md:text-[1.323vw] flex items-center gap-4 leading-[100%] md:mt-[1.984vw]">
            More about us
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1.07606 6.264H0.807129V7.69063H11.5793L7.26787 11.8941L7.08177 12.0749L7.25604 12.2675L7.86166 12.9345L8.04884 13.14L8.24892 12.9464L14.1718 7.16882L14.3697 6.97731L14.1718 6.78365L8.24892 1.00933L8.04884 0.815674L7.86166 1.02117L7.25604 1.68822L7.08177 1.87973L7.26787 2.06156L11.5793 6.26507L1.07606 6.264Z"
                fill="white" stroke="white" stroke-width="0.537946" />
            </svg>
          </NuxtLink>
        </div>
        <UtilsClientReuse />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const copy = {
  heading1: 'Founded in Jakarta in 2017, Idealive',
  heading2: 'bridges brands and audiences with',
  heading3: 'creativity and strategy, crafting impactful',
  heading4: 'connections that resonate.',
}

let ctx = null;

const headline = () => {
  const words = document.querySelectorAll(".reveal-words");
  const masks = document.querySelectorAll(".reveal-masks.animate-invisibles");

  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth < 768;
  const startPosition = isMobile ? "top 85%" : "top 80%";

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-trigger",
      start: startPosition,
      end: "bottom 25%",
      scrub: false,
      toggleActions: "play none none reverse",
      markers: false,
    },
    defaults: {
      ease: "power3.out",
      force3D: true,
    },
  });

  tl.set(words, { y: 50, opacity: 0 });
  tl.add(() => {
    masks.forEach((el) => el.classList.remove("animate-invisibles"));
  });
  tl.to(words, {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.05,
    ease: "power3.out"
  }, 0);
};

onMounted(() => {
  ctx = gsap.context(() => {
    headline();
  });
});

onBeforeUnmount(() => {
  if (ctx) ctx.revert();
});
</script>


<style scoped>
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
  will-change: transform;
}
</style>
