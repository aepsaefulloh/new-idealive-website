<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div v-for="card in kpiCards" :key="card.id"
      class="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 group hover:scale-105">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ card.title }}</p>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ card.value }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span :class="card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'">
              {{ card.change }}
            </span>
            {{ card.changeText }}
          </p>
        </div>
        <div :class="[
          'w-12 h-12 flex items-center justify-center rounded-full group-hover:scale-110 transition-transform duration-300',
          card.gradient
        ]">
          <UIcon :name="card.icon" class="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const kpiCards = ref([
  {
    id: 1,
    title: 'Total Users',
    value: '12,345',
    change: '+12.5%',
    changeText: 'from last month',
    changeType: 'positive',
    icon: 'i-heroicons-users',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    title: 'Revenue',
    value: '$45,678',
    change: '+8.2%',
    changeText: 'from last month',
    changeType: 'positive',
    icon: 'i-heroicons-currency-dollar',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-500'
  },
  {
    id: 3,
    title: 'Orders',
    value: '1,234',
    change: '-2.1%',
    changeText: 'from last month',
    changeType: 'negative',
    icon: 'i-heroicons-shopping-bag',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-500'
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '3.24%',
    change: '+0.8%',
    changeText: 'from last month',
    changeType: 'positive',
    icon: 'i-heroicons-chart-bar',
    gradient: 'bg-gradient-to-br from-purple-500 to-pink-500'
  }
])
</script>