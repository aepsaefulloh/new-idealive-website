<template>
  <div>
    <div class="text-center my-auto">
      <div 
      ref="containerRef" 
      class="relative md:w-[30vw] md:h-[5vw] h-[11vw] !w-[60vw] overflow-hidden reveal-mask animate-invisible "
    >
      <div 
        v-for="(text, index) in texts" 
        :key="index" 
        class="text absolute inset-0 flex items-center justify-start md:text-[4.63vw] text-[10.256vw] leading-[130%]"
      >
        {{ text }}
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { gsap } from "gsap";

const containerRef = ref()
const texts = ["Engage", "Stand Out", "Impactful"]

const sme = () => {
  const masks = document.querySelectorAll(".reveal-mask.animate-invisible");
  const container = containerRef.value;
  const textElements = container.querySelectorAll('.text');

  gsap.set(textElements, { yPercent: 100 });

  const tl = gsap.timeline({ repeat: -1 }); // Loop infinitely without delay
  tl.add(() => {
    masks.forEach((el) => el.classList.remove("animate-invisible"));
  });
  textElements.forEach((text, index) => {
    const isLastText = index === textElements.length - 1;

    tl.to(text, {
      yPercent: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(text, {
      yPercent: isLastText ? 0 : -100,  // Stop the last text from moving out of view
      duration: 0.3,
      ease: "power2.in",
      delay: 1
    });
  });
};

onMounted(() => {
  sme()
});
</script>

<style scoped>
.translate-y-full {
  transform: translateY(-100%);
  transition: transform 1s ease-in-out;
}

.animate-invisible {
  visibility: hidden;
}
</style>
