import { defineStore } from 'pinia'

export const useAdminTeamStore = defineStore('admin-team', {
  state: () => ({
    team: [],
    selectedMember: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    totalMembers: (state) => state.team.length,
  },

  actions: {
    async fetchTeam() {
      this.isLoading = true
      this.error = null
      try {
        const supabase = useNuxtApp().$supabase
        const { data, error } = await supabase
          .from('team')
          .select('*')
          .order('sort_order', { ascending: true })

        if (error) throw error
        this.team = data || []
        return { success: true, data }
      } catch (error) {
        console.error('Fetch team error:', error)
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async createMember(memberData) {
      this.isLoading = true
      this.error = null
      try {
        const supabase = useNuxtApp().$supabase
        const { data, error } = await supabase
          .from('team')
          .insert([memberData])
          .select()
          .single()

        if (error) throw error
        this.team.push(data)
        return { success: true, data, message: 'Team member added successfully!' }
      } catch (error) {
        console.error('Create member error:', error)
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async updateMember(id, memberData) {
      this.isLoading = true
      this.error = null
      try {
        const supabase = useNuxtApp().$supabase
        const { data, error } = await supabase
          .from('team')
          .update(memberData)
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        
        const index = this.team.findIndex(m => m.id === id)
        if (index !== -1) {
          this.team[index] = data
        }
        
        return { success: true, data, message: 'Team member updated successfully!' }
      } catch (error) {
        console.error('Update member error:', error)
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async deleteMember(id) {
      this.isLoading = true
      this.error = null
      try {
        const supabase = useNuxtApp().$supabase
        const { error } = await supabase
          .from('team')
          .delete()
          .eq('id', id)

        if (error) throw error
        
        this.team = this.team.filter(m => m.id !== id)
        return { success: true, message: 'Team member deleted successfully!' }
      } catch (error) {
        console.error('Delete member error:', error)
        this.error = error.message
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    selectMember(member) {
      this.selectedMember = member
    },

    clearSelection() {
      this.selectedMember = null
    },

    subscribeToUpdates(callback) {
      const supabase = useNuxtApp().$supabase
      return supabase
        .channel('team-changes')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'team' }, callback)
        .subscribe()
    },
  },
})
