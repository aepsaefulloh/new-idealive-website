import { defineStore } from 'pinia'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    isLoading: false,
    error: '',
    successMessage: '',
    selectedProject: null,
  }),

  getters: {
    publishedProjects: (state) => state.projects.filter(project => project.published),
    featuredProjects: (state) => state.projects.filter(project => project.featured && project.published),
    totalProjects: (state) => state.projects.length,
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchProjects() {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          // Fallback to public API if Supabase not initialized
          return await this.fetchPublicProjects()
        }

        const { data, error: fetchError } = await supabase
          .from('projects')
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
          // If RLS blocks access, fallback to public API
          console.warn('Supabase fetch failed, trying public API:', fetchError.message)
          return await this.fetchPublicProjects()
        }

        this.projects = data || []
        return { success: true, data: this.projects }
      } catch (err) {
        // Final fallback to public API
        console.warn('Exception during fetch, trying public API:', err.message)
        return await this.fetchPublicProjects()
      } finally {
        this.isLoading = false
      }
    },

    async createProject(payload) {
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
          .from('projects')
          .insert([{
            slug,
            title: payload.title,
            description: payload.description,
            overview: payload.overview,
            icon: payload.icon || '🚀',
            thumbnail_url: payload.thumbnail_url,
            banner_url: payload.banner_url,
            tags: payload.tags || [],
            features: payload.features || [],
            year: payload.year,
            role: payload.role,
            duration: payload.duration,
            demo_url: payload.demo_url,
            github_url: payload.github_url,
            category_id: payload.category_id,
            featured: payload.featured || false,
            published: payload.published !== undefined ? payload.published : true,
          }])
          .select()

        if (insertError) {
          this.error = insertError.message || 'Failed to create project'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          this.projects.unshift(data[0])
          this.successMessage = 'Project created successfully!'
          return { success: true, data: data[0] }
        }

        return { success: false, error: 'No data returned' }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateProject(id, updates) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: updateError } = await supabase
          .from('projects')
          .update({
            ...updates,
            updated_at: new Date().toISOString(),
          })
          .eq('id', id)
          .select()

        if (updateError) {
          this.error = updateError.message || 'Failed to update project'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          const index = this.projects.findIndex(p => p.id === id)
          if (index !== -1) {
            this.projects[index] = data[0]
          }
          this.successMessage = 'Project updated successfully!'
          return { success: true, data: data[0] }
        }

        return { success: false, error: 'No data returned' }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async deleteProject(id) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { error: deleteError } = await supabase
          .from('projects')
          .delete()
          .eq('id', id)

        if (deleteError) {
          this.error = deleteError.message || 'Failed to delete project'
          return { success: false, error: this.error }
        }

        this.projects = this.projects.filter(p => p.id !== id)
        this.successMessage = 'Project deleted successfully!'
        return { success: true }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async toggleFeatured(id) {
      const project = this.projects.find(p => p.id === id)
      if (project) {
        return this.updateProject(id, { featured: !project.featured })
      }
      return { success: false, error: 'Project not found' }
    },

    async togglePublished(id) {
      const project = this.projects.find(p => p.id === id)
      if (project) {
        return this.updateProject(id, { published: !project.published })
      }
      return { success: false, error: 'Project not found' }
    },

    selectProject(project) {
      this.selectedProject = project
    },

    clearSelection() {
      this.selectedProject = null
    },

    clearError() {
      this.error = ''
    },

    clearSuccess() {
      this.successMessage = ''
    },

    subscribeToUpdates(callback) {
      const supabase = this.getSupabase()

      if (!supabase) {
        console.error('Supabase not initialized for subscription')
        return null
      }

      const subscription = supabase
        .channel('projects_channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'projects' },
          (payload) => {
            callback(payload)
          }
        )
        .subscribe()

      return subscription
    },

    async fetchPublicProjects() {
      this.isLoading = true
      this.error = ''

      try {
        const res = await $fetch('/api/public/projects')
        
        if (res?.success && Array.isArray(res.data)) {
          this.projects = res.data
          return { success: true, data: this.projects }
        }

        return { success: false, error: 'No projects returned' }
      } catch (err) {
        this.error = err.message || 'Failed to fetch public projects'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },
  }
})