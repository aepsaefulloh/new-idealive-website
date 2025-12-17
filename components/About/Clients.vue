<template>
    <section class="py-16 md:py-24">
        <div v-if="clientsStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div v-for="i in 8" :key="i" class="relative aspect-video overflow-hidden flex items-center justify-center">
                <SkeletonLoading type="image" />
            </div>
        </div>
        <div v-else-if="clients && clients.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div v-for="client in clients" :key="client.id || client.name"
                class="relative aspect-video overflow-hidden flex items-center justify-center">
                <a v-if="client.website_url" :href="client.website_url" target="_blank" rel="noopener noreferrer" :aria-label="`Visit ${client.name}`" class="w-full h-full flex items-center justify-center">
                  <img
                    :src="client.image_url"
                    :alt="client.name || 'Client logo'"
                    loading="lazy"
                    class="w-4/5 h-4/5 object-contain"
                  />
                </a>
                <img v-else
                  :src="client.image_url"
                  :alt="client.name || 'Client logo'"
                  loading="lazy"
                  class="w-4/5 h-4/5 object-contain"
                />
            </div>
        </div>
        <div v-else class="text-center text-sm text-gray-500">No clients found.</div>
    </section>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { usePublicClientsStore } from '~/stores'
import SkeletonLoading from '~/components/Utils/SkeletonLoading.vue'

const clientsStore = usePublicClientsStore()

const clients = computed(() => {
    return (clientsStore.activeClients && clientsStore.activeClients.length) ? clientsStore.activeClients : clientsStore.clients || []
})

onMounted(async () => {
    if (!clientsStore.clients || clientsStore.clients.length === 0) {
        await clientsStore.fetchClients()
    }
})
</script>