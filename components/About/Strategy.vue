<template>
    <section class="py-20 md:py-32 px-desktop">
        <div class="md:max-w-4xl mx-auto text-center px-6 md:px-0">
            <h2 class="text-3xl md:text-5xl lg:text-7xl text-custom-primary">Transforming Brands</h2>
            <h2 class="mt-6 md:mt-18 text-3xl md:text-5xl lg:text-7xl text-custom-primary">With Creative Strategy</h2>
            <p class="mt-6 md:mt-12 md:text-[18px] text-[14px] text-custom-primary/50">
                At Idealive, we bridge the gap between brands and audiences through powerful storytelling, creative
                strategies,
                and cutting-edge solutions. Let us help you connect, engage, and inspire your audience with impactful
                experiences.
            </p>
        </div>

        <div class="mt-12 md:mt-16 grid gap-10 md:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="(item, idx) in strategies" :key="item.title"
                class="group border-b border-[#323232] pb-4 flex flex-col gap-2 cursor-pointer" role="button"
                tabindex="0" :aria-expanded="openIndex === idx" @click="toggle(idx)" @keyup.enter.space="toggle(idx)">
                <div class="flex items-start justify-between gap-6">
                    <h3 class="text-2xl md:text-3xl font-primary leading-[1.2] transition-colors duration-200 hover:text-custom-primary"
                        :class="openIndex === idx ? '' : ''">
                        {{ item.title }}
                    </h3>
                    <span
                        class="flex-shrink-0 w-10 h-10 rounded-full border  flex items-center justify-center text-2xl leading-none transition-colors duration-200"
                        :class="openIndex === idx ? 'bg-custom-primary text-white' : 'group-hover:bg-custom-primary group-hover:text-white'"
                        aria-hidden="true">
                        {{ openIndex === idx ? '×' : '+' }}
                    </span>
                </div>

                <div class="transition-all duration-300 ease-out overflow-hidden"
                    :class="openIndex === idx ? 'max-h-40 opacity-100 translate-y-0 pt-2' : 'max-h-0 opacity-0 -translate-y-1'">
                    <p class="text-sm md:text-base font-primary leading-relaxed md:pr-2">
                        {{ item.subtitle }}
                    </p>
                </div>
            </div>
        </div>

        <div class="mt-14 md:mt-16 flex justify-center">
            <UtilsButtonCta :title="'See all portfolio'" :root="'/work'" />
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePublicCmsStore } from '@/stores';

const publicCmsStore = usePublicCmsStore();

const strategies = computed(() => {
    if (publicCmsStore.services && publicCmsStore.services.length > 0) {
        return publicCmsStore.services.map(s => ({
            title: s.title,
            subtitle: s.description
        }));
    }
    return [
        {
            title: 'Brand Strategy & Story Building',
            subtitle: 'Crafting narratives that align business goals with audience insight and market trends.',
        },
        {
            title: '360 Integrated Marketing Experience',
            subtitle: 'Holistic campaigns across channels to deliver consistent, memorable brand experiences.',
        },
        {
            title: 'Digital Media Planning & Buying',
            subtitle: 'Performance-focused planning with smart placement, targeting, and optimization.',
        },
        {
            title: 'Content & Creative Production',
            subtitle: 'From concept to delivery—visuals, motion, and copy that convert and captivate.',
        },
        {
            title: 'Social & Community Engagement',
            subtitle: 'Building loyal communities with always-on content, activations, and influencer strategy.',
        },
        {
            title: 'Analytics & Growth Strategy',
            subtitle: 'Data-driven insights to iterate, scale, and sustain brand momentum.',
        },
    ];
});

const openIndex = ref(null);

const toggle = (idx) => {
    openIndex.value = openIndex.value === idx ? null : idx;
};

onMounted(async () => {
    await publicCmsStore.fetchServices();
});
</script>