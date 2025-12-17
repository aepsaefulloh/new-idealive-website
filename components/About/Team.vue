<template>
    <section class="py-16 md:py-24 px-desktop">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div v-for="member in teams" :key="member.id"
                class="relative aspect-square bg-gray-200 overflow-hidden group">
                <img :src="member.image_url" :alt="member.fullname" class="w-full h-full object-cover" />

                <div
                    class="absolute inset-0 bg-custom-primary text-white flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out">
                    <div>
                        <h3 class="text-3xl md:text-4xl font-primary leading-tight">{{ member.fullname }}</h3>
                        <p class="mt-4 text-lg md:text-xl text-white/80">{{ member.jobdesk }}</p>
                        <div class="mt-3 text-white/80">{{ member.job_description  }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { usePublicTeamStore } from '~/stores'

const teamStore = usePublicTeamStore()

const teams = computed(() => teamStore.team)

onMounted(async () => {
    await teamStore.fetchTeam()

})
</script>