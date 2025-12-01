<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-500">
    <div class="flex">
      <!-- Sidebar -->
      <DashboardSidebar :is-collapsed="isSidebarCollapsed" @toggle="toggleSidebar" />

      <!-- Main Content -->
      <div :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'
      ]">
        <!-- Top Navbar -->
        <DashboardNavbar @toggle-sidebar="toggleSidebar" />

        <!-- Page Content -->
        <main class="flex-1 p-6 overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isSidebarCollapsed = ref(false)

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

onMounted(() => {
  if (process.client && window.innerWidth < 1024) {
    isSidebarCollapsed.value = true
  }
})
</script>