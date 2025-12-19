<template>
  <div
    class="min-h-screen bg-idealive text-white flex flex-col relative overflow-hidden font-secondary px-desktop py-20 md:py-32">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 w-full max-w-[1920px] mx-auto">
      <div class="lg:col-span-6 flex flex-col h-full">
        <div>
          <h1 class="mb-3 text-6xl md:text-8xl lg:text-[100px] leading-tight font-normal">
            Get In Touch
          </h1>
        </div>
        <div
          class="my-6 md:my-12 w-full md:h-[500px] h-[250px] rounded-2xl overflow-hidden bg-white/5 grayscale hover:grayscale-0 transition-all duration-500 border border-white/10">
          <iframe :src="contactInfo?.[0]?.map_url_iframe || ''" width="100%" height="100%" style="border:0;"
            allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
      <div class="lg:col-span-6 lg:pl-10">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="group">
            <label for="name" class="block text-sm font-medium mb-2 opacity-80">Name</label>
            <input type="text" id="name" v-model="form.name"
              class="w-full bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-white/30"
              placeholder="Your Name">
          </div>
          <div class="group">
            <label for="email" class="block text-sm font-medium mb-2 opacity-80">Email</label>
            <input type="email" id="email" v-model="form.email"
              class="w-full bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-white/30"
              placeholder="your@email.com">
          </div>
          <div class="group">
            <label for="subject" class="block text-sm font-medium mb-2 opacity-80">Subject</label>
            <input type="text" id="subject" v-model="form.subject"
              class="w-full bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-white/30"
              placeholder="Project Inquiry">
          </div>
          <div class="group">
            <label for="message" class="block text-sm font-medium mb-2 opacity-80">Message</label>
            <textarea id="message" v-model="form.message" rows="4"
              class="w-full bg-transparent border-b border-white/30 py-4 text-xl focus:outline-none focus:border-white transition-colors placeholder-white/30 resize-none"
              placeholder="Tell us about your project..."></textarea>
          </div>

          <div class="pt-4">
            <button type="submit" :disabled="isSubmitting"
              class="bg-white text-idealive px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2">
              <span v-if="isSubmitting">Sending...</span>
              <span v-else>Send Message</span>
              <svg v-if="!isSubmitting" width="12" height="12" viewBox="0 0 12 12" fill="none"
                xmlns="http://www.w3.org/2000/svg" class="w-3 h-3">
                <path d="M12 6L0 12L0 0L12 6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContactStore } from '@/stores'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useContactInfo } from '@/composables/useContactInfo'

const contactStore = useContactStore()
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()
const { contactInfo, fetchIfNeeded } = useContactInfo()

useHead({
  title: 'Contact | Idealive',
  meta: [
    { name: 'description', content: 'Get in touch with Idealive.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const { $toast } = useNuxtApp()
const isSubmitting = computed(() => contactStore.isLoading)

const handleSubmit = async () => {
  if (isSubmitting.value) return

  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    $toast.error('Please fill in all fields')
    return
  }

  try {
    if (!recaptchaLoaded) {
      $toast.warning('reCAPTCHA is not loaded yet, please wait...')
      return
    }

    const token = await executeRecaptcha('contact_form_submit')

    if (!token) {
      $toast.error('reCAPTCHA verification failed, please try again')
      return
    }

    const result = await contactStore.createMessage({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
      recaptcha_token: token,
    })

    if (result.success) {
      $toast.success(result.message || 'Message sent successfully! I will get back to you soon.')
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
      }
      contactStore.clearSuccess()
    } else {
      $toast.error(result.error || 'Failed to send message')
      contactStore.clearError()
    }
  } catch (error) {
    console.error('Submit error:', error)
    $toast.error('An error occurred while submitting the form')
  }
}

onMounted(async () => {
  await fetchIfNeeded()
})
</script>
