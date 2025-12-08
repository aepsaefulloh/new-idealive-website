<template>
    <section class="py-16 md:py-24 px-desktop">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div v-for="member in team" :key="member.name"
                class="relative aspect-square bg-gray-200 overflow-hidden group">
                <img :src="member.photo" :alt="member.name" class="w-full h-full object-cover" />

                <div
                    class="absolute inset-0 bg-custom-primary text-white flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div>
                        <h3 class="text-3xl md:text-4xl font-primary leading-tight">{{ member.name }}</h3>
                        <p class="mt-4 text-lg md:text-xl text-white/80">{{ member.role }}</p>
                    </div>
                    <div class="flex justify-end">
                        <span class="text-2xl">→</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
const team = [
    {
        name: 'Moch Aggiat Rachmana',
        role: 'IT Officer',
        photo: 'https://placehold.co/600x600?text=Team+1',
    },
    {
        name: 'Nayla Putri',
        role: 'Creative Strategist',
        photo: 'https://placehold.co/600x600?text=Team+2',
    },
    {
        name: 'Dimas Pratama',
        role: 'Art Director',
        photo: 'https://placehold.co/600x600?text=Team+3',
    },
    {
        name: 'Sinta Maharani',
        role: 'Project Manager',
        photo: 'https://placehold.co/600x600?text=Team+4',
    },
    {
        name: 'Farhan Yusuf',
        role: 'Media Planner',
        photo: 'https://placehold.co/600x600?text=Team+5',
    },
    {
        name: 'Clara Novia',
        role: 'Copywriter',
        photo: 'https://placehold.co/600x600?text=Team+6',
    },
];
</script>