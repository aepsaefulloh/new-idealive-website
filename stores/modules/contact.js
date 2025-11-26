import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({
    messages: [],
    isLoading: false,
    error: '',
    successMessage: '',
    selectedMessage: null,
  }),

  getters: {
    unreadCount: (state) => state.messages.filter(m => !m.read).length,
    totalMessages: (state) => state.messages.length,
  },

  actions: {
    getSupabase() {
      const nuxtApp = useNuxtApp()
      return nuxtApp.$supabase
    },

    async fetchMessages() {
      this.isLoading = true
      this.error = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: fetchError } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (fetchError) {
          this.error = fetchError.message || 'Failed to fetch messages'
          return { success: false, error: this.error }
        }

        this.messages = data || []
        return { success: true, data: this.messages }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async createMessage(payload) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        // Use server API endpoint for reCAPTCHA verification and message creation
        const data = await $fetch('/api/contact', {
          method: 'POST',
          body: payload
        })

        if (data.success) {
          // Add the new message to local state if it doesn't exist
          if (data.data && !this.messages.find(m => m.id === data.data.id)) {
            this.messages.unshift(data.data)
          }
          this.successMessage = data.message || 'Message sent successfully!'
          // Return both success and message from API
          return { success: true, message: data.message, data: data.data }
        } else {
          this.error = data.message || 'Failed to send message'
          return { success: false, error: this.error }
        }
      } catch (err) {
        console.error('Create message error:', err)

        // Handle different error types
        if (err.response) {
          const status = err.response.status
          const data = err.response._data || err.response.data

          if (status === 400) {
            this.error = data?.statusMessage || 'Invalid form data'
          } else if (status === 500) {
            this.error = 'Server error. Please try again later.'
          } else {
            this.error = data?.statusMessage || 'Failed to send message'
          }
        } else {
          this.error = err.message || 'Network error. Please check your connection.'
        }

        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async updateMessage(id, updates) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { data, error: updateError } = await supabase
          .from('contact_messages')
          .update(updates)
          .eq('id', id)
          .select()

        if (updateError) {
          this.error = updateError.message || 'Failed to update message'
          return { success: false, error: this.error }
        }

        if (data && data.length > 0) {
          const index = this.messages.findIndex(m => m.id === id)
          if (index !== -1) {
            this.messages[index] = data[0]
          }
          this.successMessage = 'Message updated successfully!'
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

    async deleteMessage(id) {
      this.isLoading = true
      this.error = ''
      this.successMessage = ''

      try {
        const supabase = this.getSupabase()

        if (!supabase) {
          throw new Error('Supabase not initialized')
        }

        const { error: deleteError } = await supabase
          .from('contact_messages')
          .delete()
          .eq('id', id)

        if (deleteError) {
          this.error = deleteError.message || 'Failed to delete message'
          return { success: false, error: this.error }
        }

        this.messages = this.messages.filter(m => m.id !== id)
        this.successMessage = 'Message deleted successfully!'
        return { success: true }
      } catch (err) {
        this.error = err.message || 'An unexpected error occurred'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async markAsRead(id) {
      return this.updateMessage(id, { read: true })
    },

    async markAsUnread(id) {
      return this.updateMessage(id, { read: false })
    },

    selectMessage(message) {
      this.selectedMessage = message
      if (!message.read) {
        this.markAsRead(message.id)
      }
    },

    clearSelection() {
      this.selectedMessage = null
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
        .channel('contact_messages_channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'contact_messages' },
          (payload) => {
            callback(payload)
          }
        )
        .subscribe()

      return subscription
    },
  }
})
