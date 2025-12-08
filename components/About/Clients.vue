<template>
    <section class="py-16 md:py-24 px-desktop">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div v-for="client in clients" :key="client.name"
                class="relative aspect-video overflow-hidden flex items-center justify-center">
                <img :src="client.logo" :alt="client.name" class="w-4/5 h-4/5 object-contain" />
            </div>
        </div>
    </section>
</template>

<script setup>
const clients = [
    {
        name: 'TechCrunch',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'Western Australia',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'Deloitte',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'AgriFutures',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'Cancer Council WA',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'TechCrunch',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'Western Australia',
        logo: 'https://placehold.co/300x200',
    },
    {
        name: 'Deloitte',
        logo: 'https://placehold.co/300x200',
    },
];
</script>