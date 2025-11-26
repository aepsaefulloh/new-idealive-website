<template>
  <div>
    <div>
      <div
        ref="logosWrapper"
        class="flex flex-wrap justify-center overflow-hidden md:gap-12 gap-0"
        :class="spacing"
      >
        <div
          v-for="(logo, index) in visibleLogos"
          :key="index"
          class="flex-shrink-0 logo-change"
          :class="[
            {'flex justify-center items-center': visibleLogos.length < imagesCount}, 
            width,
            'w-1/2 md:w-auto' // Force 2 per row on mobile, auto on desktop
          ]"
        >
          <img
            :src="logo.client_logo"
            class="w-full object-contain"
            :class="[imageClass, 'h-[12vw] md:h-[7vw]']"
            alt="Client logo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  imagesCount: {
    type: Number,
    default: 5,
  },
  imageClass: {
    type: String,
    default: "",
  },
  spacing: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "",
  },
  intervalDelay: {
    type: Number,
    default: 5000,
  },
});

const logos = ref([
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
  { client_logo: '/images/logo1.png' },
  { client_logo: '/images/logo2.png' },
]);
const visibleLogos = ref([]);
let currentIndex = 0;
const intervalId = ref(null);
const logosWrapper = ref(null);
let gsapCtx = null;

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
  gsap.killTweensOf(logoElements());
  if (gsapCtx) {
    gsapCtx.revert();
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

// Helper to get the logo elements within our scoped container
const logoElements = () => {
  return logosWrapper.value ? logosWrapper.value.querySelectorAll(".logo-change") : [];
};

const updateLogos = () => {
  gsap.to(logoElements(), {
    y: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power2.out",
    onComplete: () => {
      if (logos.value.length - currentIndex < props.imagesCount) {
        const firstPart = logos.value.slice(currentIndex);
        const remainingCount = props.imagesCount - firstPart.length;
        const secondPart = logos.value.slice(0, remainingCount);
        visibleLogos.value = firstPart.concat(secondPart);
      } else {
        visibleLogos.value = logos.value.slice(currentIndex, currentIndex + props.imagesCount);
      }
      currentIndex = (currentIndex + props.imagesCount) % logos.value.length;

      gsap.fromTo(
        logoElements(),
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
      );
    },
  });
};

onMounted(async () => {
  if (logos.value.length > 0) {
    visibleLogos.value = logos.value.slice(0, props.imagesCount);
    currentIndex = props.imagesCount;
    await nextTick();
    // Ensure logosWrapper is available, then create a GSAP context with its DOM element
    if (logosWrapper.value) {
      gsapCtx = gsap.context(() => {
        updateLogos();
        intervalId.value = setInterval(() => {
          updateLogos();
        }, props.intervalDelay);
      }, logosWrapper.value);
    }
  }
});
</script>

<style scoped>
/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .logo-change {
    padding: 0 10px;
    margin-bottom: 15px;
  }
}
</style>
