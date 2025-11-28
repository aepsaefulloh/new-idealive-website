import { defineStore } from 'pinia'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [],
    isLoading: false,
    error: '',
    successMessage: '',
    selectedArticle: null,
  }),

  getters: {
    publishedArticles: (state) => state.articles.filter(article => article.published),
    featuredArticles: (state) => state.articles.filter(article => article.featured && article.published),
    totalArticles: (state) => state.articles.length,
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchArticles() {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: fetchError } = await supabase
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
          .order('created_at', { ascending: false })

        if (fetchError) {
          this.error = fetchError.message || 'Failed to fetch articles'
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

    async createArticle(payload) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        // Generate slug from title if not provided
        const slug = payload.slug || payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        const { data, error: insertError } = await supabase
          .from('articles')
          .insert([{
            slug,
            title: payload.title,
            excerpt: payload.excerpt,
            content: payload.content,
            thumbnail_url: payload.thumbnail_url,
            banner_url: payload.banner_url,
            category_id: payload.category_id,
            author_id: payload.author_id || null,
            tags: payload.tags || [],
            read_time: payload.read_time || 0,
            featured: payload.featured || false,
            published: payload.published !== undefined ? payload.published : false,
            published_at: payload.published ? new Date().toISOString() : null,
          }])
          .select()

        if (insertError) {
          this.error = insertError.message || 'Failed to create article'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          this.articles.unshift(data[0])
          this.successMessage = 'Article created successfully!'
          return { success: true, data: data[0], message: this.successMessage }
        }

        return { success: false, error: 'No data returned from insert' }
      } catch (err) {
        this.error = err.message || 'Failed to create article'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateArticle(id, updates) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: updateError } = await supabase
          .from('articles')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()

        if (updateError) {
          this.error = updateError.message || 'Failed to update article'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          const index = this.articles.findIndex(article => article.id === id)
          if (index !== -1) {
            this.articles[index] = data[0]
          }
          this.successMessage = 'Article updated successfully!'
          return { success: true, data: data[0], message: this.successMessage }
        }

        return { success: false, error: 'No data returned from update' }
      } catch (err) {
        this.error = err.message || 'Failed to update article'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async deleteArticle(id) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { error: deleteError } = await supabase
          .from('articles')
          .delete()
          .eq('id', id)

        if (deleteError) {
          this.error = deleteError.message || 'Failed to delete article'
          return { success: false, error: this.error }
        }

        this.articles = this.articles.filter(article => article.id !== id)
        this.successMessage = 'Article deleted successfully!'
        return { success: true, message: this.successMessage }
      } catch (err) {
        this.error = err.message || 'Failed to delete article'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async toggleFeatured(id) {
      const article = this.articles.find(article => article.id === id)
      if (!article) {
        return { success: false, error: 'Article not found' }
      }

      return await this.updateArticle(id, {
        ...article,
        featured: !article.featured
      })
    },

    async togglePublished(id) {
      const article = this.articles.find(article => article.id === id)
      if (!article) {
        return { success: false, error: 'Article not found' }
      }

      const now = new Date().toISOString()
      return await this.updateArticle(id, {
        ...article,
        published: !article.published,
        published_at: !article.published ? now : null,
      })
    },

    selectArticle(article) {
      this.selectedArticle = article
    },

    clearSelection() {
      this.selectedArticle = null
    },

    getArticleById(id) {
      return this.articles.find(article => article.id === id)
    },

    getArticleBySlug(slug) {
      return this.articles.find(article => article.slug === slug)
    },

    // Real-time subscription
    subscribeToUpdates(callback) {
      const supabase = this.getSupabase()
      if (!supabase) return null

      const subscription = supabase
        .channel('articles_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'articles'
        }, (payload) => {
          callback(payload)
        })
        .subscribe()

      return subscription
    }
  }
})