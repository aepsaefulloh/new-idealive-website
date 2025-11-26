import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * Supabase Database Store
 * Manage semua operasi database untuk contact messages
 */
export const useSupabaseStore = defineStore('supabase', () => {
  const nuxtApp = useNuxtApp()
  const supabase = ref()

  // Initialize Supabase
  const initializeSupabase = () => {
    supabase.value = nuxtApp.$supabase as any
    return supabase.value
  }

  // State
  const contactMessages = ref<any[]>([])
  const isLoading = ref(false)
  const error = ref('')

  /**
   * Fetch contact messages dari database
   */
  const fetchContactMessages = async () => {
    isLoading.value = true
    error.value = ''
    try {
      if (!supabase.value) {
        initializeSupabase()
      }

      const { data, error: dbError } = await supabase.value
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (dbError) {
        error.value = dbError.message
        console.error('Error fetching contact messages:', dbError)
        return null
      }

      contactMessages.value = data || []
      return data
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Unexpected error:', err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Insert new contact message
   */
  const insertContactMessage = async (payload: any) => {
    isLoading.value = true
    error.value = ''
    try {
      if (!supabase.value) {
        initializeSupabase()
      }

      const { data, error: dbError } = await supabase.value
        .from('contact_messages')
        .insert([
          {
            ...payload,
            read: false,
            created_at: new Date().toISOString(),
          },
        ])
        .select()

      if (dbError) {
        error.value = dbError.message
        console.error('Error inserting contact message:', dbError)
        return { success: false, error: dbError.message }
      }

      // Add to local state
      contactMessages.value.unshift(data[0])
      return { success: true, data }
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Unexpected error:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Delete contact message
   */
  const deleteContactMessage = async (id: number) => {
    isLoading.value = true
    error.value = ''
    try {
      if (!supabase.value) {
        initializeSupabase()
      }

      const { error: dbError } = await supabase.value
        .from('contact_messages')
        .delete()
        .eq('id', id)

      if (dbError) {
        error.value = dbError.message
        console.error('Error deleting contact message:', dbError)
        return { success: false, error: dbError.message }
      }

      // Remove from local state
      contactMessages.value = contactMessages.value.filter(m => m.id !== id)
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Unexpected error:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Update contact message (mark as read/unread)
   */
  const updateContactMessage = async (id: number, updates: Record<string, any>) => {
    isLoading.value = true
    error.value = ''
    try {
      if (!supabase.value) {
        initializeSupabase()
      }

      const { data, error: dbError } = await supabase.value
        .from('contact_messages')
        .update(updates)
        .eq('id', id)
        .select()

      if (dbError) {
        error.value = dbError.message
        console.error('Error updating contact message:', dbError)
        return { success: false, error: dbError.message }
      }

      // Update in local state
      const index = contactMessages.value.findIndex(m => m.id === id)
      if (index !== -1) {
        contactMessages.value[index] = data[0]
      }

      return { success: true, data }
    } catch (err: any) {
      error.value = err.message || 'An unexpected error occurred'
      console.error('Unexpected error:', err)
      return { success: false, error: err.message }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Clear error
   */
  const clearError = () => {
    error.value = ''
  }

  return {
    // State
    contactMessages,
    isLoading,
    error,

    // Actions
    initializeSupabase,
    fetchContactMessages,
    insertContactMessage,
    deleteContactMessage,
    updateContactMessage,
    clearError,
  }
})
