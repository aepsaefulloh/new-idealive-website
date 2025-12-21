<template>
  <section class="bg-idealive text-white py-20 md:py-32 px-desktop">
    <div class="w-full">
      <img :src="aboutSection?.image_url" class="w-full h-auto object-cover min-h-[400px]" alt="Idealive Team" />
    </div>

    <div class="w-full">
      <h2 class="mt-12 md:mt-18 text-3xl md:text-5xl lg:text-[3.5rem] !leading-[1.3]">
        {{ aboutSection?.bio }}
      </h2>
      <p class="mt-6 md:mt-8 md:text-[22px] text-[18px] text-gray-300">
        {{ aboutSection?.description }}
      </p>
    </div>
  </section>
</template>

<script setup>
const { aboutSection } = defineProps(['aboutSection'])

</script>

<style scoped></style>