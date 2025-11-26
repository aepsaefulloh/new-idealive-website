<template>
  <div></div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useGsap } from '@/composables/useGsap'
import { useContactStore } from '@/stores/modules/contact'
import { useCmsStore } from '@/stores/modules/cms'
import { useReCaptcha } from 'vue-recaptcha-v3'

const { animateFadeInUp } = useGsap()
const contactStore = useContactStore()
const cmsStore = useCmsStore()
const { executeRecaptcha, recaptchaLoaded } = useReCaptcha()

useHead({
  title: 'Contact | Aep Saefulloh - Digital Artisan',
  meta: [
    { name: 'description', content: 'Get in touch with Aep Saefulloh for project inquiries, collaborations, or just to say hello.' }
  ]
})

const header = ref()
const contactInfo = ref()
const contactForm = ref()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitMessage = ref('')

// Get contact info from CMS store
const contactInfoData = computed(() => cmsStore.contactInfo)

// Social links computed from contact info
const socials = computed(() => {
  const socialLinks = []
  if (contactInfoData.value.github_url) {
    socialLinks.push({ name: 'GitHub', icon: '', url: contactInfoData.value.github_url })
  }
  if (contactInfoData.value.linkedin_url) {
    socialLinks.push({ name: 'LinkedIn', icon: '', url: contactInfoData.value.linkedin_url })
  }
  if (contactInfoData.value.twitter_url) {
    socialLinks.push({ name: 'Twitter', icon: '', url: contactInfoData.value.twitter_url })
  }
  if (contactInfoData.value.dribbble_url) {
    socialLinks.push({ name: 'Dribbble', icon: '', url: contactInfoData.value.dribbble_url })
  }
  if (contactInfoData.value.instagram_url) {
    socialLinks.push({ name: 'Instagram', icon: '', url: contactInfoData.value.instagram_url })
  }
  return socialLinks
})

// Computed
const isSubmitting = computed(() => contactStore.isLoading)
const submitSuccess = computed(() => contactStore.successMessage && !contactStore.error)

const handleSubmit = async () => {
  // Validate form
  if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
    submitMessage.value = 'Please fill in all fields'
    return
  }

  try {
    // Execute reCAPTCHA
    if (!recaptchaLoaded) {
      submitMessage.value = 'reCAPTCHA is not loaded yet, please wait...'
      return
    }

    const token = await executeRecaptcha('contact_form_submit')

    if (!token) {
      submitMessage.value = 'reCAPTCHA verification failed, please try again'
      return
    }

    // Create message via store with reCAPTCHA token
    const result = await contactStore.createMessage({
      name: form.value.name,
      email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
      recaptcha_token: token,
    })

    if (result.success) {
      // Use message from API response
      submitMessage.value = result.message || 'Message sent successfully! I will get back to you soon.'
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
      }

      setTimeout(() => {
        contactStore.clearSuccess()
        submitMessage.value = ''
      }, 5000)
    } else {
      submitMessage.value = result.error || 'Failed to send message'
      setTimeout(() => {
        contactStore.clearError()
        submitMessage.value = ''
      }, 5000)
    }
  } catch (error) {
    console.error('Submit error:', error)
    submitMessage.value = 'An error occurred while submitting the form'
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }
}

onMounted(async () => {
  if (header.value) animateFadeInUp(header.value, 0)
  if (contactInfo.value) animateFadeInUp(contactInfo.value, 0.2)
  if (contactForm.value) animateFadeInUp(contactForm.value, 0.3)

  // Load contact info from CMS
  await cmsStore.fetchContactInfo()
})
</script>
