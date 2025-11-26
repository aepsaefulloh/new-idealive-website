<template>
  <!-- Page Header -->
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 mb-6">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">Manage CMS administrator accounts</p>
      </div>

      <div>
        <button @click="showAddUserModal = true"
          class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
          <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
          Add New User
        </button>
      </div>
    </div>

  </div>

  <!-- Users Table -->
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto"></div>
      <p class="text-gray-600 mt-2">Loading users...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-8 text-center">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p class="text-red-600 font-medium">Error loading users</p>
      <p class="text-gray-600 text-sm mt-1">{{ error }}</p>
      <button @click="loadUsers"
        class="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
        Try Again
      </button>
    </div>

    <!-- Users List -->
    <div v-else-if="users.length > 0" class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Sign In
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
            <!-- User Info -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center">
                    <span class="text-white font-medium text-sm">
                      {{ user.email.charAt(0).toUpperCase() }}
                    </span>
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.email }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ID: {{ user.id.slice(0, 8) }}...
                  </div>
                </div>
              </div>
            </td>

            <!-- Status -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                user.email_confirmed_at ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ user.email_confirmed_at ? 'Active' : 'Pending' }}
              </span>
            </td>

            <!-- Created -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(user.created_at) }}
            </td>

            <!-- Last Sign In -->
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.last_sign_in_at ? formatDate(user.last_sign_in_at) : 'Never' }}
            </td>

            <!-- Actions -->
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button @click="handleEditUser(user)"
                  class="text-gray-600 hover:text-gray-900 transition-colors duration-200" title="Edit User">
                  <UIcon name="i-heroicons-pencil" class="w-5 h-5" />
                </button>
                <button v-if="currentUser?.id !== user.id" @click="confirmDeleteUser(user)"
                  class="text-red-600 hover:text-red-900 transition-colors duration-200" title="Delete User">
                  <UIcon name="i-heroicons-trash" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Empty State -->
    <div v-else class="p-8 text-center">
      <UIcon name="i-heroicons-users" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No users found</h3>
      <p class="text-gray-600 mb-4">Get started by adding your first CMS administrator.</p>
      <button @click="showAddUserModal = true"
        class="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200">
        <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
        Add First User
      </button>
    </div>
  </div>

  <!-- Add User Modal -->
  <Transition name="modal">
    <div v-if="showAddUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showAddUserModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Add New User</h3>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-4">
          <form @submit.prevent="handleAddUser" class="space-y-4">
            <!-- Email Input -->
            <div>
              <label for="newUserEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input id="newUserEmail" v-model="newUser.email" type="email" placeholder="admin@example.com" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>

            <!-- Password Input -->
            <div>
              <label for="newUserPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input id="newUserPassword" v-model="newUser.password" type="password" placeholder="••••••••" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              <p class="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <!-- Confirm Password Input -->
            <div>
              <label for="newUserConfirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input id="newUserConfirmPassword" v-model="newUser.confirmPassword" type="password"
                placeholder="••••••••" required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button @click="showAddUserModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200">
            Cancel
          </button>
          <button @click="handleAddUser" :disabled="addUserLoading"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200">
            <span v-if="addUserLoading">Creating...</span>
            <span v-else>Add User</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Edit User Modal -->
  <Transition name="modal">
    <div v-if="showEditUserModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showEditUserModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Edit User</h3>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-4">
          <form @submit.prevent="handleUpdateUser" class="space-y-4">
            <!-- Email Input (Read-only) -->
            <div>
              <label for="editUserEmail" class="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input id="editUserEmail" v-model="editUser.email" type="email" readonly
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" />
              <p class="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <!-- New Password Input -->
            <div>
              <label for="editUserPassword" class="block text-sm font-medium text-gray-700 mb-2">
                New Password (Optional)
              </label>
              <input id="editUserPassword" v-model="editUser.password" type="password"
                placeholder="Leave empty to keep current password"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
              <p class="text-xs text-gray-500 mt-1">Minimum 8 characters if changing</p>
            </div>

            <!-- Confirm New Password Input -->
            <div v-if="editUser.password">
              <label for="editUserConfirmPassword" class="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input id="editUserConfirmPassword" v-model="editUser.confirmPassword" type="password"
                placeholder="••••••••"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" />
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button @click="showEditUserModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200">
            Cancel
          </button>
          <button @click="handleUpdateUser" :disabled="updateUserLoading"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200">
            <span v-if="updateUserLoading">Updating...</span>
            <span v-else>Update User</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Delete Confirmation Modal -->
  <Transition name="modal">
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showDeleteModal = false">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Delete User</h3>
        </div>

        <!-- Modal Body -->
        <div class="px-6 py-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600" />
            </div>
            <div class="ml-3">
              <h4 class="text-sm font-medium text-gray-900">Are you sure?</h4>
              <p class="text-sm text-gray-500 mt-1">
                This action cannot be undone. This will permanently delete the user account for
                <strong>{{ userToDelete?.email }}</strong>.
              </p>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium rounded-lg transition-colors duration-200">
            Cancel
          </button>
          <button @click="handleDeleteUser" :disabled="deleteUserLoading"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200">
            <span v-if="deleteUserLoading">Deleting...</span>
            <span v-else>Delete User</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { toast } from 'vue3-toastify'
import { useAuthStore } from '@/stores/modules/auth'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue'
import DashboardNavbar from '@/components/dashboard/DashboardNavbar.vue'
definePageMeta({
  layout: 'dashboard',
  middleware: 'cms-auth'
})
const authStore = useAuthStore()

// State
const users = ref([])
const loading = ref(false)
const error = ref('')
const showAddUserModal = ref(false)
const showEditUserModal = ref(false)
const showDeleteModal = ref(false)
const addUserLoading = ref(false)
const updateUserLoading = ref(false)
const deleteUserLoading = ref(false)
const userToDelete = ref(null)
const currentUser = computed(() => authStore.user)

// Form data
const newUser = ref({
  email: '',
  password: '',
  confirmPassword: ''
})

const editUser = ref({
  id: '',
  email: '',
  password: '',
  confirmPassword: ''
})

/**
 * Load users from Supabase
 */
const loadUsers = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await $fetch('/api/auth/users')

    if (response && response.success) {
      users.value = response.users || []
    } else {
      throw new Error('Invalid response format')
    }
  } catch (err) {
    console.error('Error loading users:', err)

    // Handle different types of errors
    if (err.response) {
      // Server responded with error status
      error.value = err.response._data?.message || err.response.statusText || 'Server error'
    } else if (err.message) {
      // Network or other error
      error.value = err.message
    } else {
      // Unknown error
      error.value = 'Failed to load users'
    }
  } finally {
    loading.value = false
  }
}

/**
 * Handle add new user
 */
const handleAddUser = async () => {
  // Validate inputs
  if (!newUser.value.email || !newUser.value.password || !newUser.value.confirmPassword) {
    toast.error('Please fill in all fields')
    return
  }

  if (newUser.value.password.length < 8) {
    toast.error('Password must be at least 8 characters long')
    return
  }

  if (newUser.value.password !== newUser.value.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  addUserLoading.value = true

  try {
    const response = await $fetch('/api/auth/users', {
      method: 'POST',
      body: {
        email: newUser.value.email,
        password: newUser.value.password
      }
    })

    if (response && response.success) {
      toast.success('User created successfully!')
      showAddUserModal.value = false

      // Reset form
      newUser.value = {
        email: '',
        password: '',
        confirmPassword: ''
      }

      // Reload users list
      await loadUsers()
    } else {
      throw new Error(response?.message || 'Invalid response format')
    }
  } catch (err) {
    console.error('Error creating user:', err)

    // Handle different types of errors
    if (err.response) {
      // Server responded with error status
      toast.error(err.response._data?.message || err.response.statusText || 'Failed to create user')
    } else if (err.message) {
      // Network or other error
      toast.error(err.message)
    } else {
      // Unknown error
      toast.error('Failed to create user')
    }
  } finally {
    addUserLoading.value = false
  }
}

/**
 * Handle edit user
 */
const handleEditUser = (user) => {
  editUser.value = {
    id: user.id,
    email: user.email,
    password: '',
    confirmPassword: ''
  }
  showEditUserModal.value = true
}

/**
 * Handle update user
 */
const handleUpdateUser = async () => {
  // Validate password if provided
  if (editUser.value.password) {
    if (editUser.value.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    if (editUser.value.password !== editUser.value.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
  }

  updateUserLoading.value = true

  try {
    const updateData = {
      id: editUser.value.id
    }

    if (editUser.value.password) {
      updateData.password = editUser.value.password
    }

    const response = await $fetch(`/api/auth/users/${editUser.value.id}`, {
      method: 'PUT',
      body: updateData
    })

    if (response && response.success) {
      toast.success('User updated successfully!')
      showEditUserModal.value = false

      // Reset form
      editUser.value = {
        id: '',
        email: '',
        password: '',
        confirmPassword: ''
      }

      // Reload users list
      await loadUsers()
    } else {
      throw new Error(response?.message || 'Invalid response format')
    }
  } catch (err) {
    console.error('Error updating user:', err)

    // Handle different types of errors
    if (err.response) {
      // Server responded with error status
      toast.error(err.response._data?.message || err.response.statusText || 'Failed to update user')
    } else if (err.message) {
      // Network or other error
      toast.error(err.message)
    } else {
      // Unknown error
      toast.error('Failed to update user')
    }
  } finally {
    updateUserLoading.value = false
  }
}

/**
 * Handle delete user confirmation
 */
const confirmDeleteUser = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

/**
 * Handle delete user
 */
const handleDeleteUser = async () => {
  if (!userToDelete.value) return

  deleteUserLoading.value = true

  try {
    const response = await $fetch(`/api/auth/users/${userToDelete.value.id}`, {
      method: 'DELETE'
    })

    if (response && response.success) {
      toast.success('User deleted successfully!')
      showDeleteModal.value = false
      userToDelete.value = null

      // Reload users list
      await loadUsers()
    } else {
      throw new Error(response?.message || 'Invalid response format')
    }
  } catch (err) {
    console.error('Error deleting user:', err)

    // Handle different types of errors
    if (err.response) {
      // Server responded with error status
      toast.error(err.response._data?.message || err.response.statusText || 'Failed to delete user')
    } else if (err.message) {
      // Network or other error
      toast.error(err.message)
    } else {
      // Unknown error
      toast.error('Failed to delete user')
    }
  } finally {
    deleteUserLoading.value = false
  }
}

/**
 * Format date for display
 */
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Load users on component mount
onMounted(() => {
  loadUsers()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active>div,
.modal-leave-active>div {
  transition: transform 0.3s ease;
}

.modal-enter-from>div,
.modal-leave-to>div {
  transform: scale(0.95);
}
</style>