<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="visible" class="fixed inset-0 z-[9999] bg-black/10 flex flex-col items-center justify-center px-4" @click.self="close">
                <button
                    class="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-2xl font-bold z-20 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    @click="$emit('close')">
                    ✕
                </button>
                <div>
                    <img :src="imageSrc" alt="lightbox image"
                        class="max-w-full max-h-[80vh] object-contain rounded shadow-lg" />
                </div>

                <div v-if="title" class="text-white text-lg mt-4 text-center">
                    {{ title }}
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
const props = defineProps({
    imageSrc: { type: String, required: true },
    visible: { type: Boolean, required: true },
    title: { type: String, default: '' },
})

const emit = defineEmits(['close'])

function close() {
    emit('close')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>