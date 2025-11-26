<script setup lang="ts">
import { ref, onMounted, onUnmounted, type PropType } from "vue";
import { gsap } from "gsap";

const linkRef = ref<HTMLElement | null>(null);
const textContainerRef = ref<HTMLDivElement | null>(null);
const textTopRef = ref<HTMLDivElement | null>(null);
const textBottomRef = ref<HTMLDivElement | null>(null);
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  root: {
    type: String,
    default: "",
  },
  onClick: {
    type: Function as PropType<() => void>,
    default: () => {},
  },
});

let tl: GSAPTimeline;

onMounted(() => {
  if (
    !linkRef.value ||
    !textContainerRef.value ||
    !textTopRef.value ||
    !textBottomRef.value
  )
    return;

  const textContainer = textContainerRef.value;
  const textTop = textTopRef.value;
  const textBottom = textBottomRef.value;

  gsap.set(textContainer, { clipPath: "inset(0 0 0 0)" });
  gsap.set(textBottom, { yPercent: 100 });

  tl = gsap.timeline({ paused: true });

  tl.to(textTop, {
    yPercent: -100,
    duration: 0.4,
    ease: "power2.inOut",
  }).to(
    textBottom,
    {
      yPercent: 0,
      duration: 0.4,
      ease: "power2.inOut",
    },
    "-=0.3"
  ); // Start slightly before the first animation ends
});

const handleMouseEnter = () => {
  tl.play();
};

const handleMouseLeave = () => {
  tl.reverse();
};

const handleClick = () => {
  props.onClick && props.onClick();
};
</script>

<template>
  <NuxtLink
    ref="linkRef"
    :to="root"
    class="btn-main cursor-pointer"
    @click="handleClick" 
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div ref="textContainerRef" class="relative">
      <div ref="textTopRef" class="relative flex gap-2 items-center">
        {{ title }}
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.07606 6.26424H0.807129V7.69087H11.5793L7.26787 11.8944L7.08177 12.0751L7.25604 12.2677L7.86166 12.9348L8.04884 13.1403L8.24892 12.9466L14.1718 7.16906L14.3697 6.97756L14.1718 6.7839L8.24892 1.00958L8.04884 0.815918L7.86166 1.02141L7.25604 1.68847L7.08177 1.87998L7.26787 2.0618L11.5793 6.26532L1.07606 6.26424Z"
            fill="white"
            stroke="white"
            stroke-width="0.537946"
          />
        </svg>
      </div>
      <div ref="textBottomRef" class="absolute top-0 left-0 flex gap-2 items-center">
        {{ title }}
        <svg
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.07606 6.26424H0.807129V7.69087H11.5793L7.26787 11.8944L7.08177 12.0751L7.25604 12.2677L7.86166 12.9348L8.04884 13.1403L8.24892 12.9466L14.1718 7.16906L14.3697 6.97756L14.1718 6.7839L8.24892 1.00958L8.04884 0.815918L7.86166 1.02141L7.25604 1.68847L7.08177 1.87998L7.26787 2.0618L11.5793 6.26532L1.07606 6.26424Z"
            fill="white"
            stroke="white"
            stroke-width="0.537946"
          />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>
