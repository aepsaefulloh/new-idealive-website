<template>
    <div :class="[
        'fixed inset-y-0 left-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out',
        'w-64 lg:w-64 md:w-72 sm:w-80',
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
    ]">
        <div class="flex items-center justify-center h-20 border-b border-gray-100 dark:border-gray-800 px-4">
            <h2
                class="text-xl md:text-2xl font-bold font-syne bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <img src="/images/logo-idealive-blue.svg" alt="logo-idealive" class="h-8 md:h-10 w-auto" />
            </h2>
        </div>

        <nav
            class="mt-6 px-3 md:px-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-5rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <!-- Regular menu items -->
            <NuxtLink v-for="item in regularMenuItems" :key="item.name" :to="item.path"
                class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden"
                :class="[
                    $route.path === item.path
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                ]"
                active-class="!bg-blue-50 !dark:bg-blue-900/20 !text-blue-600 !dark:text-blue-400 !border-l-2 !border-blue-500">

                <UIcon :name="item.icon"
                    class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                    :class="$route.path === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'" />
                <span class="relative z-10 truncate">{{ item.name }}</span>
            </NuxtLink>

            <!-- Data Master Section -->
            <div class="pt-4">
                <div class="px-3 md:px-4 py-2">
                    <h3
                        class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
                        <UIcon name="i-heroicons-cog-6-tooth" class="w-3 h-3 mr-2" />
                        Data Master
                    </h3>
                </div>
                <div class="space-y-1">
                    <NuxtLink v-for="item in dataMasterItems" :key="item.name" :to="item.path"
                        class="flex items-center px-3 md:px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden ml-2"
                        :class="[
                            $route.path === item.path
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                        ]"
                        active-class="!bg-blue-50 !dark:bg-blue-900/20 !text-blue-600 !dark:text-blue-400 !border-l-2 !border-blue-500">

                        <UIcon :name="item.icon"
                            class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                            :class="$route.path === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'" />
                        <span class="relative z-10 truncate">{{ item.name }}</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Other menu items -->
            <div class="pt-4">
                <div class="px-3 md:px-4 py-2">
                    <h3
                        class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center">
                        <UIcon name="i-heroicons-wrench-screwdriver" class="w-3 h-3 mr-2" />
                        Management
                    </h3>
                </div>
                <div class="space-y-1">
                    <NuxtLink v-for="item in otherMenuItems" :key="item.name" :to="item.path"
                        class="flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden ml-2"
                        :class="[
                            $route.path === item.path
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-2 border-blue-500'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                        ]"
                        active-class="!bg-blue-50 !dark:bg-blue-900/20 !text-blue-600 !dark:text-blue-400 !border-l-2 !border-blue-500">

                        <UIcon :name="item.icon"
                            class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110 flex-shrink-0"
                            :class="$route.path === item.path ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'" />
                        <span class="relative z-10 truncate">{{ item.name }}</span>
                    </NuxtLink>
                </div>
            </div>

            <!-- Dropdown menu items -->
            <div v-for="dropdown in dropdownMenuItems" :key="dropdown.name" class="relative">
                <button @click="toggleDropdown(dropdown.name)"
                    class="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group"
                    :class="[
                        isDropdownOpen(dropdown.name)
                            ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                    ]">
                    <UIcon :name="dropdown.icon"
                        class="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110"
                        :class="isDropdownOpen(dropdown.name) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'" />
                    <span class="flex-1 text-left">{{ dropdown.name }}</span>
                    <UIcon :name="isDropdownOpen(dropdown.name) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                        class="w-4 h-4 text-gray-400 transition-transform duration-200" />
                </button>

                <!-- Submenu -->
                <div v-show="isDropdownOpen(dropdown.name)" class="mt-1 space-y-1 px-2">
                    <NuxtLink v-for="subItem in dropdown.children" :key="subItem.name" :to="subItem.path"
                        class="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors pl-11"
                        :class="[
                            $route.path === subItem.path
                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10'
                                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                        ]">
                        <span>{{ subItem.name }}</span>
                    </NuxtLink>
                </div>
            </div>
        </nav>
    </div>

    <!-- Mobile Overlay -->
    <div v-if="!isCollapsed" @click="toggleSidebar"
        class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden md:hidden"></div>

    <!-- Floating toggle button when collapsed (Mobile & Tablet) -->
    <Button v-if="isCollapsed" @click="toggleSidebar" variant="secondary" size="sm" icon="i-heroicons-bars-3"
        class="fixed top-4 left-4 z-50 shadow-lg lg:hidden md:hidden" />
</template>

<script setup>
import Button from '~/components/dashboard/ui/Button.vue'
import { computed, ref } from 'vue'

const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['toggle'])

const isCollapsed = computed({
    get: () => props.isCollapsed,
    set: (value) => emit('toggle')
})

const toggleSidebar = () => {
    emit('toggle')
}

// Reactive state for dropdowns
const openDropdowns = ref(new Set())

const toggleDropdown = (dropdownName) => {
    if (openDropdowns.value.has(dropdownName)) {
        openDropdowns.value.delete(dropdownName)
    } else {
        openDropdowns.value.add(dropdownName)
    }
}

const isDropdownOpen = (dropdownName) => {
    return openDropdowns.value.has(dropdownName)
}

const regularMenuItems = [
    {
        name: 'Back to Home',
        path: '/',
        icon: 'i-heroicons-home'
    },
    {
        name: 'Dashboard',
        path: '/xms',
        icon: 'i-heroicons-chart-bar'
    },
    {
        name: 'Portfolio CMS',
        path: '/xms/portfolio',
        icon: 'i-heroicons-document-text'
    },
    
]

const dataMasterItems = [
    {
        name: 'Categories',
        path: '/xms/categories',
        icon: 'i-heroicons-tag'
    },
    {
        name: 'Clients',
        path: '/xms/clients',
        icon: 'i-heroicons-building-office'
    }
]

const otherMenuItems = [
    {
        name: 'Projects',
        path: '/xms/projects',
        icon: 'i-heroicons-folder'
    },
    {
        name: 'Articles',
        path: '/xms/articles',
        icon: 'i-heroicons-document-text'
    },
    {
        name: 'Contact Messages',
        path: '/xms/contact',
        icon: 'i-heroicons-envelope'
    },
    {
        name: 'User Management',
        path: '/xms/users',
        icon: 'i-heroicons-users'
    }
]

// Dropdown menu items (empty for now)
const dropdownMenuItems = []
</script>

<style scoped>
/* Custom scrollbar for sidebar navigation */
.scrollbar-thin {
    scrollbar-width: thin;
}

.scrollbar-thin::-webkit-scrollbar {
    width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
    background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgb(156 163 175);
    border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgb(107 114 128);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb {
    background-color: rgb(75 85 99);
}

.dark .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background-color: rgb(107 114 128);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .sidebar-mobile {
        width: 280px;
    }
}

@media (max-width: 640px) {
    .sidebar-mobile {
        width: 260px;
    }
}
</style>