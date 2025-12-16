import { defineStore } from 'pinia'

export const usePublicProjectsStore = defineStore('public-projects', {
  state: () => ({
    projects: [],
    project: null,
    isLoading: false,
    error: '',
  }),

  getters: {
    featuredProjects: (state) => state.projects.filter(p => p.is_featured),
    publishedProjects: (state) => state.projects.filter(p => p.published),
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchProjects(options = {}) {
      const { limit } = options
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        let query = supabase
          .from('projects')
          .select(`
            *,
            categories(id, name, slug),
            clients(id, name, image_url)
          `)
          .eq('published', true)
          .order('created_at', { ascending: false })

        if (Number.isInteger(limit) && limit > 0) {
          query = query.limit(limit)
        }

        if (options && Number.isInteger(options.categoryId)) {
          query = query.eq('category_id', options.categoryId)
        }

        const { data, error } = await query

        if (error) {
          this.error = error.message || 'Failed to fetch projects'
          return { success: false, error: this.error }
        }

        this.projects = data || []
        return { success: true, data: this.projects }
      } catch (err) {
        this.error = err.message || 'Failed to fetch projects'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },


    async getProjectBySlug(slug) {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('projects')
          .select(`
            *,
            categories(id, name, slug),
            clients(id, name, image_url)
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single()

        if (error) {
          this.error = error.message || 'Project not found'
          return { success: false, error: this.error }
        }

        this.project = data
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to fetch project'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }
  }
})
