<template>
  <div>
    <div class="container-xl px-desktop md:py-[2.646vw] py-[40px]">
      <div class="border-b border-[#2054FA] md:pb-10 pb-4">
        <div class="grid md:grid-cols-6 md:gap-0 gap-[40px]">
          <div class="flex flex-col md:col-span-4">
            <h5 class="md:text-[4.63vw] text-[10.256vw] leading-[110%] flex items-center gap-4">
              {{ content.brandText }}
              <svg
                class="mt-[0.8vw] md:w-[3vw] w-[6vw]"
                viewBox="0 0 41 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.92892 17.0027H2.19678V20.8749H31.5235L19.7858 32.2845L19.2791 32.7751L19.7536 33.2978L21.4023 35.1084L21.9119 35.6662L22.4566 35.1405L38.5813 19.4586L39.1202 18.9388L38.5813 18.4132L22.4566 2.74001L21.9119 2.21436L21.4023 2.77213L19.7536 4.5827L19.2791 5.10251L19.7858 5.59604L31.5235 17.0056L2.92892 17.0027Z"
                  fill="#2054FA"
                  stroke="#2054FA"
                  stroke-width="0.537946"
                />
              </svg>
            </h5>
            <h5 class="md:text-[4.63vw] text-[10.256vw] leading-[110%] flex md:gap-6 gap-2">
              <span v-html="content.brandText2"></span>
              <UtilsWording />
            </h5>
          </div>
          <div class="flex md:col-span-2 gap-[34.615vw] copy md:gap-[11.64vw] w-full">
            <ul v-for="(links, section) in content.links" :key="section">
              <li class="mb-2 font-bold">{{ section }}</li>
              <li v-for="(link, label) in links" :key="label" class="mb-2">
                <NuxtLink :to="link">{{ label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <div class="">
          <div class="flex md:flex-row flex-col md:mt-0 mt-[7.692vw] items-end md:justify-between md:gap-0 gap-[20.513vw]">
            <a href="" class="md:w-[25vw] md:pt-[10.582vw] copy">{{ content.address }}</a>
            <ul class="flex md:gap-20 md:justify-end justify-between w-full">
              <li v-for="(url, platform) in content.social" :key="platform" class="mb-2">
                <a :href="url" target="_blank" class="">
                  {{ platform }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="md:pt-10 pt-4 flex justify-between items-end">
        <img src="/images/logo-idealive.svg" class="filter invert contrast-200 md:w-[8.995vw] w-[90px]" alt="Idealive Logo">
        <p class="md:text-[12px] text-[10px] md:w-auto w-[50%] text-black/60 leading-[100%]">{{ content.copyright }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const content = {
  brandText: "Make your",
  brandText2: "brand ",
  copyright: "Copyright © 2022 Idealive. PT Raksasa Sembilan Media All Rights Reserved.",
  address: "Jl. H. Ismail No.12 1, RT.1/RW.4, Cilandak Bar., Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12430",
  links: {
    Content: {
      Home: "/",
      About: "/about",
      Work: "/work",
      Career: "/career",
      Contact: "/contact",
    },
    Contact: {
      "hello@idealive.co.id": "mailto:hello@idealive.co.id",
      "+627377123733213": "tel:+627377123733213",
    },
  },
  social: {
    Instagram: "https://instagram.com",
    "Linked In": "https://linkedin.com",
    Facebook: "https://facebook.com",
  },
};
</script>

<style scoped>
.copy {
  @apply md:text-[1.19vw] text-[14px];
}
</style>