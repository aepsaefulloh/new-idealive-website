<template>
    <!-- Card Skeleton -->
    <div :class="classes" v-if="type === 'card'">
        <div role="status" class="flex items-center justify-center h-56 max-w-full bg-gray-300 rounded-lg animate-pulse"
            v-for="i in count" :key="'card-' + i">
            <svg class="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                fill="currentColor" viewBox="0 0 16 20">
                <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                <path
                    d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
            </svg>
        </div>
    </div>

    <!-- Badge Skeleton -->
    <div :class="classes" v-if="type === 'badge'">
        <div role="status" class="space-y-3.5 animate-pulse max-w-full">
            <div class="flex items-center w-full justify-between" v-for="i in count" :key="'badge-' + i">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40"></div>
                <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-10"></div>
            </div>
        </div>
    </div>

    <!-- Tab Bar Skeleton -->
    <div :class="classes" v-if="type === 'tab'">
        <div role="status" class="flex flex-wrap gap-2 animate-pulse">
            <div v-for="i in count" :key="'tab-' + i" class="h-10 w-24 bg-gray-300 rounded-t-lg"></div>
        </div>
    </div>

    <!-- Tab + Content Skeleton -->
    <div :class="classes" v-if="type === 'tab-content'">
        <!-- Tab bar -->
        <div class="flex flex-wrap gap-2 animate-pulse mb-4">
            <div v-for="i in count" :key="'tabc-tab-' + i" class="h-10 w-24 bg-gray-300 rounded-t-lg"></div>
        </div>
        <!-- Frame content -->
        <div class="animate-pulse bg-white/10 border border-white rounded-[20px] p-6 space-y-4">
            <div class="h-6 bg-gray-300 rounded w-1/2"></div>
            <div class="h-4 bg-gray-300 rounded w-full"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
            <div class="h-4 bg-gray-300 rounded w-2/3"></div>
            <div class="h-10 w-40 bg-gray-300 rounded-full mt-4"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'card'
    },
    classes: {
        type: String,
        default: ''
    },
    count: {
        type: Number,
        default: 1
    }
})
</script>
