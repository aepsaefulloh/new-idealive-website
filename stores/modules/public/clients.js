import { defineStore } from 'pinia'

export const usePublicClientsStore = defineStore('public-clients', {
  state: () => ({
    clients: [],
    client: null,
    isLoading: false,
    error: '',
  }),

  getters: {
    activeClients: (state) => state.clients.filter(c => c.is_active),
  },

  actions: {
    getSupabase() {
      return useNuxtApp().$supabase
    },

    async fetchClients() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('is_active', true)
          .order('name', { ascending: true })

        if (error) {
          this.error = error.message || 'Failed to fetch clients'
          return { success: false, error: this.error }
        }

        this.clients = data || []
        return { success: true, data: this.clients }
      } catch (err) {
        this.error = err.message || 'Failed to fetch clients'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    getClientById(id) {
      return this.clients.find(c => c.id === id)
    }
  }
})