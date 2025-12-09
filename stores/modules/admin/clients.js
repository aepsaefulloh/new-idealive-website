import { defineStore } from 'pinia'

export const useAdminClientsStore = defineStore('admin-clients', {
  state: () => ({
    clients: [],
    client: null,
    isLoading: false,
    error: '',
  }),

  getters: {
    activeClients: (state) => state.clients.filter(c => c.is_active),
    totalClients: (state) => state.clients.length,
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

    async createClient(clientData) {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        const { data, error } = await supabase
          .from('clients')
          .insert(clientData)
          .select()
          .single()

        if (error) {
          this.error = error.message || 'Failed to create client'
          return { success: false, error: this.error }
        }

        this.clients.push(data)
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to create client'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateClient(id, clientData) {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        const { data, error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', id)
          .select()
          .single()

        if (error) {
          this.error = error.message || 'Failed to update client'
          return { success: false, error: this.error }
        }

        const index = this.clients.findIndex(c => c.id === id)
        if (index !== -1) {
          this.clients[index] = data
        }
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to update client'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async deleteClient(id) {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        const { error } = await supabase
          .from('clients')
          .delete()
          .eq('id', id)

        if (error) {
          this.error = error.message || 'Failed to delete client'
          return { success: false, error: this.error }
        }

        this.clients = this.clients.filter(c => c.id !== id)
        return { success: true }
      } catch (err) {
        this.error = err.message || 'Failed to delete client'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async getClientById(id) {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', id)
          .single()

        if (error) {
          this.error = error.message || 'Client not found'
          return { success: false, error: this.error }
        }

        this.client = data
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to fetch client'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async toggleActive(id) {
      this.isLoading = true
      this.error = ''

      try {
        const client = this.clients.find(c => c.id === id)
        if (!client) {
          throw new Error('Client not found')
        }

        const supabase = this.getSupabase()

        const { data, error } = await supabase
          .from('clients')
          .update({ is_active: !client.is_active })
          .eq('id', id)
          .select()
          .single()

        if (error) {
          this.error = error.message || 'Failed to update client status'
          return { success: false, error: this.error }
        }

        const index = this.clients.findIndex(c => c.id === id)
        if (index !== -1) {
          this.clients[index] = data
        }
        return { success: true, data }
      } catch (err) {
        this.error = err.message || 'Failed to update client status'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    }  }
})
