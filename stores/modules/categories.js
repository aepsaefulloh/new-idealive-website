import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],
    isLoading: false,
    error: '',
    successMessage: '',
    selectedCategory: null,
  }),

  getters: {
    activeCategories: (state) => state.categories.filter(category => category.is_active),
    projectCategories: (state) => state.categories.filter(category => category.type === 'project'),
    articleCategories: (state) => state.categories.filter(category => category.type === 'article'),
    generalCategories: (state) => state.categories.filter(category => category.type === 'general'),
    totalCategories: (state) => state.categories.length,
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchCategories() {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: fetchError } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true })

        if (fetchError) {
          this.error = fetchError.message || 'Failed to fetch categories'
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

    async createCategory(payload) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        // Generate slug from name if not provided
        const slug = payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        const { data, error: insertError } = await supabase
          .from('categories')
          .insert([{
            name: payload.name,
            slug,
            description: payload.description,
            type: payload.type || 'general',
            parent_id: payload.parent_id || null,
            sort_order: payload.sort_order || 0,
            is_active: payload.is_active !== undefined ? payload.is_active : true,
          }])
          .select()

        if (insertError) {
          this.error = insertError.message || 'Failed to create category'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          this.categories.push(data[0])
          this.successMessage = 'Category created successfully!'
          return { success: true, data: data[0], message: this.successMessage }
        }

        return { success: false, error: 'No data returned from insert' }
      } catch (err) {
        this.error = err.message || 'Failed to create category'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateCategory(id, payload) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        // Generate slug from name if not provided
        const slug = payload.slug || payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

        const { data, error: updateError } = await supabase
          .from('categories')
          .update({
            name: payload.name,
            slug,
            description: payload.description,
            type: payload.type,
            parent_id: payload.parent_id,
            sort_order: payload.sort_order,
            is_active: payload.is_active,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()

        if (updateError) {
          this.error = updateError.message || 'Failed to update category'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          const index = this.categories.findIndex(cat => cat.id === id)
          if (index !== -1) {
            this.categories[index] = data[0]
          }
          this.successMessage = 'Category updated successfully!'
          return { success: true, data: data[0], message: this.successMessage }
        }

        return { success: false, error: 'No data returned from update' }
      } catch (err) {
        this.error = err.message || 'Failed to update category'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async deleteCategory(id) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { error: deleteError } = await supabase
          .from('categories')
          .delete()
          .eq('id', id)

        if (deleteError) {
          this.error = deleteError.message || 'Failed to delete category'
          return { success: false, error: this.error }
        }

        this.categories = this.categories.filter(cat => cat.id !== id)
        this.successMessage = 'Category deleted successfully!'
        return { success: true, message: this.successMessage }
      } catch (err) {
        this.error = err.message || 'Failed to delete category'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async toggleActive(id) {
      const category = this.categories.find(cat => cat.id === id)
      if (!category) {
        return { success: false, error: 'Category not found' }
      }

      return await this.updateCategory(id, {
        ...category,
        is_active: !category.is_active
      })
    },

    selectCategory(category) {
      this.selectedCategory = category
    },

    clearSelection() {
      this.selectedCategory = null
    },

    getCategoryById(id) {
      return this.categories.find(cat => cat.id === id)
    },

    getCategoryBySlug(slug) {
      return this.categories.find(cat => cat.slug === slug)
    },

    // Real-time subscription
    subscribeToUpdates(callback) {
      const supabase = this.getSupabase()
      if (!supabase) return null

      const subscription = supabase
        .channel('categories_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'categories'
        }, (payload) => {
          callback(payload)
        })
        .subscribe()

      return subscription
    }
  }
})