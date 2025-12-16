<template>
  <div class="animate-pulse">
    <!-- Text Types -->
    <div v-if="type === 'text'" class="h-4 bg-gray-200 rounded w-full"></div>
    <div v-else-if="type === 'heading'" class="h-8 bg-gray-200 rounded w-3/4"></div>
    <div v-else-if="type === 'subtitle'" class="h-6 bg-gray-200 rounded w-1/2"></div>
    <div v-else-if="type === 'paragraph'" class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
    <div v-else-if="type === 'sentences'" class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
    
    <!-- Basic Shapes -->
    <div v-else-if="type === 'avatar'" class="h-12 w-12 bg-gray-200 rounded-full"></div>
    <div v-else-if="type === 'button'" class="h-10 w-24 bg-gray-200 rounded"></div>
    <div v-else-if="type === 'chip'" class="h-8 w-16 bg-gray-200 rounded-full"></div>
    <div v-else-if="type === 'image'" class="w-full h-full min-h-[200px] bg-gray-200 rounded"></div>
    <div v-else-if="type === 'divider'" class="h-[1px] w-full bg-gray-200 my-2"></div>
    <div v-else-if="type === 'date-picker'" class="w-full h-64 bg-gray-200 rounded"></div>

    <!-- Complex Types -->
    <div v-else-if="type === 'card'" class="border border-gray-100 rounded-lg overflow-hidden bg-white">
      <div class="h-48 bg-gray-200 w-full"></div>
      <div class="p-4 space-y-3">
        <div class="h-6 bg-gray-200 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <div v-else-if="type === 'card-avatar'" class="border border-gray-100 rounded-lg overflow-hidden bg-white p-4">
      <div class="flex items-center space-x-4 mb-4">
        <div class="h-12 w-12 bg-gray-200 rounded-full shrink-0"></div>
        <div class="space-y-2 w-full">
          <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div class="h-32 bg-gray-200 rounded w-full"></div>
    </div>

    <div v-else-if="type === 'article'" class="space-y-4">
      <div class="h-8 bg-gray-200 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-64 bg-gray-200 rounded w-full"></div>
    </div>

    <!-- List Items -->
    <div v-else-if="type.startsWith('list-item')" class="flex items-center space-x-4 py-2">
      <div v-if="type.includes('avatar')" class="h-10 w-10 bg-gray-200 rounded-full shrink-0"></div>
      <div class="space-y-2 w-full">
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div v-if="type.includes('two-line') || type.includes('three-line')" class="h-3 bg-gray-200 rounded w-5/6"></div>
        <div v-if="type.includes('three-line')" class="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>

    <!-- Table -->
    <div v-else-if="type.startsWith('table')" class="w-full">
        <div v-if="type === 'table-heading' || type === 'table'" class="flex space-x-4 mb-4 border-b pb-2">
            <div v-for="i in 4" :key="i" class="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div v-if="type === 'table-tbody' || type === 'table'" class="space-y-4">
            <div v-for="i in 5" :key="i" class="flex space-x-4">
                <div v-for="j in 4" :key="j" class="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    </div>

    <div v-else class="h-full w-full bg-gray-200 rounded"></div>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  }
})
</script>

<style scoped>
</style>