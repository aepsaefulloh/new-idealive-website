import { defineStore } from 'pinia'

export const usePublicArticlesStore = defineStore('public-articles', {
  state: () => ({
    articles: [],
    isLoading: false,
    error: '',
  }),

  getters: {
    featuredArticles: (state) => state.articles.filter(article => article.featured),
    totalArticles: (state) => state.articles.length,
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchArticles() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('articles')
          .select(`
            *,
            categories (
              id,
              name,
              slug,
              type
            )
          `)
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (error) {
          this.error = error.message || 'Failed to fetch articles'
          return { success: false, error: this.error }
        }

        this.articles = data || []
        return { success: true, data: this.articles }
      } catch (err) {
        this.error = err.message || 'Failed to fetch articles'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    getArticleBySlug(slug) {
      return this.articles.find(article => article.slug === slug)
    }
  }
})
