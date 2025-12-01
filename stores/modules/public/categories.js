import { defineStore } from 'pinia'

export const usePublicCategoriesStore = defineStore('public-categories', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: '',
  }),

  getters: {
    projectCategories: (state) => state.categories.filter(cat => cat.type === 'project'),
    articleCategories: (state) => state.categories.filter(cat => cat.type === 'article'),
    generalCategories: (state) => state.categories.filter(cat => cat.type === 'general'),
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchCategories() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (error) {
          this.error = error.message || 'Failed to fetch categories'
          return { success: false, error: this.error }
        }

        this.categories = data || []
        return { success: true, data: this.categories }
      } catch (err) {
        this.error = err.message || 'Failed to fetch categories'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    getCategoryBySlug(slug) {
      return this.categories.find(cat => cat.slug === slug)
    }
  }
})
