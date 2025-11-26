<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ title }}</h3>
      <select
        v-model="selectedChartType"
        class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="line">Line Chart</option>
        <option value="bar">Bar Chart</option>
        <option value="area">Area Chart</option>
      </select>
    </div>

    <div class="h-80">
      <apexchart
        :type="selectedChartType"
        :options="chartOptions"
        :series="chartSeries"
        height="100%"
      ></apexchart>
    </div>
  </div>
</template>

<script setup>
// import VueApexCharts from 'vue3-apexcharts' // Removed - registered globally in plugin

const props = defineProps({
  title: {
    type: String,
    default: 'Analytics Chart'
  }
})

const selectedChartType = ref('line')

// Mock chart data
const chartSeries = ref([
  {
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100, 85, 92, 78, 95, 110]
  },
  {
    name: 'Users',
    data: [11, 32, 45, 32, 34, 52, 41, 38, 45, 52, 48, 55]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: selectedChartType.value,
    toolbar: {
      show: false
    },
    background: 'transparent'
  },
  colors: ['#3B82F6', '#10B981'],
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: selectedChartType.value === 'bar' ? 0 : 3
  },
  fill: {
    type: selectedChartType.value === 'area' ? 'gradient' : 'solid',
    gradient: {
      shade: 'light',
      type: 'vertical',
      opacityFrom: 0.4,
      opacityTo: 0.1
    }
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: {
      style: {
        colors: '#6B7280'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6B7280'
      }
    }
  },
  grid: {
    borderColor: '#E5E7EB',
    strokeDashArray: 3
  },
  tooltip: {
    theme: 'dark'
  },
  legend: {
    labels: {
      colors: '#6B7280'
    }
  }
}))
</script>