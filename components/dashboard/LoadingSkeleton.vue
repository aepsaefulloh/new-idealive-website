<template>
  <div class="animate-pulse">
    <div v-if="type === 'card'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between">
        <div class="flex-1">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-4"></div>
      </div>
    </div>

    <div v-else-if="type === 'table'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      </div>
      <div class="p-6 space-y-4">
        <div v-for="i in 5" :key="i" class="flex space-x-4">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        </div>
      </div>
    </div>

    <div v-else-if="type === 'chart'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div class="flex items-center justify-between mb-6">
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
      <div class="h-80 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>

    <div v-else-if="type === 'form'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 4" :key="i" class="space-y-2">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
          <div class="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div class="flex justify-end space-x-4">
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>

    <!-- Default skeleton -->
    <div v-else class="space-y-4">
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/6"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'card', 'table', 'chart', 'form'].includes(value)
  }
})
</script>