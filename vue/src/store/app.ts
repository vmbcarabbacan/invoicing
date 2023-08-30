// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    page_title: '',
    search: ''
  }),

  actions: {
    setPageTitle(value: string) {
      this.page_title = value
    }
  }
})
