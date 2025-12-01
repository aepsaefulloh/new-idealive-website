import { defineStore } from 'pinia'

export const useAdminCmsStore = defineStore('admin-cms', {
  state: () => ({
    // Hero Section
    heroSection: {
      title: 'Hello World',
      subtitle: 'Building Modern Web Experiences',
      description: 'Specialized in Vue.js, Nuxt, React, and modern JavaScript frameworks.'
    },

    // About Section
    aboutSection: {
      bio: 'I am a passionate web developer with expertise in creating modern, responsive web applications.'
    },

    // Contact Info
    contactInfo: {
      email: 'hello@example.com',
      phone: '+1 (234) 567-890',
      location: 'San Francisco, CA',
      github_url: 'https://github.com/username',
      linkedin_url: 'https://linkedin.com/in/username',
      twitter_url: 'https://twitter.com/username',
      dribbble_url: 'https://dribbble.com/username',
      instagram_url: '',
      website_url: ''
    },

    // Loading states
    isLoading: false,
    heroLoading: false,
    aboutLoading: false,
    contactInfoLoading: false,

    // Error states
    error: '',
    heroError: '',
    aboutError: '',
    contactInfoError: '',

    // Success messages
    successMessage: '',
    heroSuccess: '',
    aboutSuccess: '',
    contactInfoSuccess: '',
  }),

  getters: {
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    // Hero Section Actions
    async fetchHeroSection() {
      this.heroLoading = true
      this.heroError = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('hero_section')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw error
        }

        if (data) {
          this.heroSection = {
            title: data.title,
            subtitle: data.subtitle,
            description: data.description
          }
        }

        return { success: true, data: this.heroSection }
      } catch (err) {
        this.heroError = err.message || 'Failed to fetch hero section'
        return { success: false, error: this.heroError }
      } finally {
        this.heroLoading = false
      }
    },

    async updateHeroSection(updates) {
      this.heroLoading = true
      this.heroError = ''
      this.heroSuccess = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('hero_section')
          .upsert([{
            id: 1, // Always use ID 1 for single hero section
            ...updates
          }])
          .select()

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          this.heroSection = {
            title: data[0].title,
            subtitle: data[0].subtitle,
            description: data[0].description
          }
          this.heroSuccess = 'Hero section updated successfully!'
          return { success: true, data: this.heroSection }
        }

        return { success: false, error: 'No data returned' }
      } catch (err) {
        this.heroError = err.message || 'Failed to update hero section'
        return { success: false, error: this.heroError }
      } finally {
        this.heroLoading = false
      }
    },

    // About Section Actions
    async fetchAboutSection() {
      this.aboutLoading = true
      this.aboutError = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('about_section')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') {
          throw error
        }

        if (data) {
          this.aboutSection = {
            bio: data.bio
          }
        }

        return { success: true, data: this.aboutSection }
      } catch (err) {
        this.aboutError = err.message || 'Failed to fetch about section'
        return { success: false, error: this.aboutError }
      } finally {
        this.aboutLoading = false
      }
    },

    async updateAboutSection(updates) {
      this.aboutLoading = true
      this.aboutError = ''
      this.aboutSuccess = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('about_section')
          .upsert([{
            id: 1, // Always use ID 1 for single about section
            ...updates
          }])
          .select()

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          this.aboutSection = {
            bio: data[0].bio
          }
          this.aboutSuccess = 'About section updated successfully!'
          return { success: true, data: this.aboutSection }
        }

        return { success: false, error: 'No data returned' }
      } catch (err) {
        this.aboutError = err.message || 'Failed to update about section'
        return { success: false, error: this.aboutError }
      } finally {
        this.aboutLoading = false
      }
    },

    // Contact Info Actions
    async fetchContactInfo() {
      this.contactInfoLoading = true
      this.contactInfoError = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
          throw error
        }

        if (data) {
          this.contactInfo = {
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            github_url: data.github_url || '',
            linkedin_url: data.linkedin_url || '',
            twitter_url: data.twitter_url || '',
            dribbble_url: data.dribbble_url || '',
            instagram_url: data.instagram_url || '',
            website_url: data.website_url || ''
          }
        }

        return { success: true, data: this.contactInfo }
      } catch (err) {
        this.contactInfoError = err.message || 'Failed to fetch contact info'
        return { success: false, error: this.contactInfoError }
      } finally {
        this.contactInfoLoading = false
      }
    },

    async updateContactInfo(updates) {
      this.contactInfoLoading = true
      this.contactInfoError = ''
      this.contactInfoSuccess = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('contact_info')
          .upsert([{
            id: 1, // Always use ID 1 for single contact info
            ...updates
          }])
          .select()

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          this.contactInfo = {
            email: data[0].email || '',
            phone: data[0].phone || '',
            location: data[0].location || '',
            github_url: data[0].github_url || '',
            linkedin_url: data[0].linkedin_url || '',
            twitter_url: data[0].twitter_url || '',
            dribbble_url: data[0].dribbble_url || '',
            instagram_url: data[0].instagram_url || '',
            website_url: data[0].website_url || ''
          }
          this.contactInfoSuccess = 'Contact information updated successfully!'
          return { success: true, data: this.contactInfo }
        }

        return { success: false, error: 'No data returned' }
      } catch (err) {
        this.contactInfoError = err.message || 'Failed to update contact info'
        return { success: false, error: this.contactInfoError }
      } finally {
        this.contactInfoLoading = false
      }
    },

    // Utility actions
    clearError() {
      this.error = ''
      this.heroError = ''
      this.aboutError = ''
      this.contactInfoError = ''
    },

    clearSuccess() {
      this.successMessage = ''
      this.heroSuccess = ''
      this.aboutSuccess = ''
      this.contactInfoSuccess = ''
    },

    // Load all CMS data
    async loadAllCmsData() {
      this.isLoading = true
      this.error = ''

      try {
        await Promise.all([
          this.fetchHeroSection(),
          this.fetchAboutSection(),
          this.fetchContactInfo()
        ])

        return { success: true }
      } catch (err) {
        // Fallback ke endpoint publik jika Supabase client gagal atau RLS block
        const publicResult = await this.fetchPublicContent()
        if (publicResult.success) {
          return { success: true, fallback: true }
        }
        this.error = 'Failed to load CMS data'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchPublicContent() {
      // Ambil konten dari server API publik tanpa auth
      try {
        const res = await $fetch('/api/public/content')
        if (res?.success && res.data) {
          if (res.data.hero) {
            this.heroSection = {
              title: res.data.hero.title,
              subtitle: res.data.hero.subtitle,
              description: res.data.hero.description
            }
          }
          if (res.data.about) {
            this.aboutSection = { bio: res.data.about.bio }
          }
          if (res.data.contact) {
            this.contactInfo = {
              email: res.data.contact.email || '',
              phone: res.data.contact.phone || '',
              location: res.data.contact.location || '',
              github_url: res.data.contact.github_url || '',
              linkedin_url: res.data.contact.linkedin_url || '',
              twitter_url: res.data.contact.twitter_url || '',
              dribbble_url: res.data.contact.dribbble_url || '',
              instagram_url: res.data.contact.instagram_url || '',
              website_url: res.data.contact.website_url || ''
            }
          }
          return { success: true, data: res.data }
        }
        return { success: false, error: 'No public content returned' }
      } catch (err) {
        return { success: false, error: err.message || 'Failed to fetch public content' }
      }
    }
  }
})