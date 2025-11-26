<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">{{ title }}</h3>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Text Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
        <UInput
          v-model="formData.name"
          type="text"
          placeholder="Enter your full name"
          :class="{ 'border-red-500 focus:ring-red-500': errors.name }"
          size="lg"
          variant="outline"
        />
          <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            v-model="formData.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500 focus:ring-red-500': errors.email }"
            placeholder="Enter your email"
          >
          <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <!-- Select Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Department
          </label>
          <select
            v-model="formData.department"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500 focus:ring-red-500': errors.department }"
          >
            <option value="">Select department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">Human Resources</option>
          </select>
          <p v-if="errors.department" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.department }}
          </p>
        </div>

        <!-- Number Input -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Age
          </label>
          <input
            v-model.number="formData.age"
            type="number"
            min="18"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            :class="{ 'border-red-500 focus:ring-red-500': errors.age }"
            placeholder="Enter your age"
          >
          <p v-if="errors.age" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.age }}
          </p>
        </div>
      </div>

      <!-- Textarea -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          v-model="formData.message"
          rows="4"
          class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
          :class="{ 'border-red-500 focus:ring-red-500': errors.message }"
          placeholder="Enter your message"
        ></textarea>
        <p v-if="errors.message" class="mt-1 text-sm text-red-600 dark:text-red-400">
          {{ errors.message }}
        </p>
      </div>

      <!-- Checkbox -->
      <div class="flex items-center">
        <input
          v-model="formData.agree"
          type="checkbox"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
          :class="{ 'border-red-500': errors.agree }"
        >
        <label class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          I agree to the terms and conditions
        </label>
      </div>
      <p v-if="errors.agree" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.agree }}
      </p>

      <!-- Submit Button -->
      <div class="flex justify-end space-x-4">
        <UButton
          type="button"
          @click="resetForm"
          variant="outline"
          size="lg"
        >
          Reset
        </UButton>
        <UButton
          type="submit"
          :disabled="isSubmitting"
          size="lg"
          :loading="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Contact Form'
  }
})

const formData = ref({
  name: '',
  email: '',
  department: '',
  age: null,
  message: '',
  agree: false
})

const errors = ref({})
const isSubmitting = ref(false)

// Validation rules
const validateForm = () => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Name is required'
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Email is invalid'
  }

  if (!formData.value.department) {
    errors.value.department = 'Department is required'
  }

  if (!formData.value.age || formData.value.age < 18 || formData.value.age > 100) {
    errors.value.age = 'Age must be between 18 and 100'
  }

  if (!formData.value.message.trim()) {
    errors.value.message = 'Message is required'
  }

  if (!formData.value.agree) {
    errors.value.agree = 'You must agree to the terms'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  // Show success message (you can replace this with a toast notification)
  alert('Form submitted successfully!')

  resetForm()
  isSubmitting.value = false
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    department: '',
    age: null,
    message: '',
    agree: false
  }
  errors.value = {}
}
</script>