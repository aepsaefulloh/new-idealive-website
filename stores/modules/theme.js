import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),

  getters: {},

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark
      if (process.client) {
        const html = document.documentElement
        if (this.isDark) {
          html.classList.add('dark')
        } else {
          html.classList.remove('dark')
        }
      }
    },

    initTheme() {
      if (process.client) {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
          this.isDark = true
          document.documentElement.classList.add('dark')
        }
      }
    },
  }
})
