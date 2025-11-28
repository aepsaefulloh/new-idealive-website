<template>
    <div :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out',
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
    ]">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 class="text-xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
        </div>

        <nav class="mt-4">
            <div class="px-4 space-y-2">
                <!-- Regular menu items -->
                <NuxtLink v-for="item in regularMenuItems" :key="item.name" :to="item.path"
                    class="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                    active-class="bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                    <UIcon :name="item.icon" class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span>{{ item.name }}</span>
                </NuxtLink>

                <!-- Dropdown menu items -->
                <div v-for="dropdown in dropdownMenuItems" :key="dropdown.name" class="relative">
                    <button @click="toggleDropdown(dropdown.name)"
                        class="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                        :class="{ 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400': isDropdownOpen(dropdown.name) }">
                        <UIcon :name="dropdown.icon" class="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                        <span class="flex-1 text-left">{{ dropdown.name }}</span>
                        <UIcon
                            :name="isDropdownOpen(dropdown.name) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
                            class="w-4 h-4 transition-transform duration-200" />
                    </button>

                    <!-- Submenu -->
                    <Transition enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform opacity-0 scale-95 max-h-0"
                        enter-to-class="transform opacity-100 scale-100 max-h-96"
                        leave-active-class="transition ease-in duration-150"
                        leave-from-class="transform opacity-100 scale-100 max-h-96"
                        leave-to-class="transform opacity-0 scale-95 max-h-0">
                        <div v-if="isDropdownOpen(dropdown.name)" class="ml-6 mt-1 space-y-1 overflow-hidden">
                            <NuxtLink v-for="subItem in dropdown.children" :key="subItem.name" :to="subItem.path"
                                class="flex items-center px-4 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                                active-class="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <UIcon :name="subItem.icon" class="w-4 h-4 mr-3" />
                                <span>{{ subItem.name }}</span>
                            </NuxtLink>
                        </div>
                    </Transition>
                </div>
            </div>
        </nav>
    </div>

    <!-- Floating toggle button when collapsed -->
    <button v-if="isCollapsed" @click="toggleSidebar"
        class="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors lg:hidden">
        <UIcon name="i-heroicons-bars-3" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>
</template>

<script setup>
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

// Regular menu items (tanpa submenu)
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
    {
        name: 'Projects',
        path: '/xms/projects',
        icon: 'i-heroicons-folder'
    },
    {
        name: 'Categories',
        path: '/xms/categories',
        icon: 'i-heroicons-tag'
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