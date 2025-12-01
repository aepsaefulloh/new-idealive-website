import { defineStore } from 'pinia'

export const usePublicCmsStore = defineStore('public-cms', {
  state: () => ({
    heroSection: null,
    aboutSection: null,
    contactInfo: null,
    isLoading: false,
    error: '',
  }),

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchContent() {
      this.isLoading = true
      this.error = ''

      try {
        // Use the public API endpoint
        const { data, error } = await useFetch('/api/public/content')

        if (error.value) {
          this.error = error.value.message || 'Failed to fetch content'
          return { success: false, error: this.error }
        }

        if (data.value) {
          this.heroSection = data.value.hero_section
          this.aboutSection = data.value.about_section
          this.contactInfo = data.value.contact_info
        }

        return { success: true, data: data.value }
      } catch (err) {
        this.error = err.message || 'Failed to fetch content'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchHeroSection() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('hero_section')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') {
          this.error = error.message || 'Failed to fetch hero section'
          return { success: false, error: this.error }
        }

        this.heroSection = data
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to fetch hero section'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchAboutSection() {
      this.isLoading = true
      this.error = ''

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
          this.error = error.message || 'Failed to fetch about section'
          return { success: false, error: this.error }
        }

        this.aboutSection = data
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to fetch about section'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async fetchContactInfo() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('contact_info')
          .select('*')
          .single()

        if (error && error.code !== 'PGRST116') {
          this.error = error.message || 'Failed to fetch contact info'
          return { success: false, error: this.error }
        }

        this.contactInfo = data
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to fetch contact info'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }
  }
})
