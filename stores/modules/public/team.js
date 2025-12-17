import { defineStore } from 'pinia'

export const usePublicTeamStore = defineStore('public-team', {
    state: () => ({
        team: [],
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
                    .eq('published', true)
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
    },
})
