import { defineStore } from "pinia"
import { signin } from "@/types"
import axios from "@/plugins/axios"
import links from "@/utils/links"



export const useAuthStore = defineStore('auth', {
    state: () => ({
       token: window.localStorage.getItem('tp') || ''
    }),
    getters: {
        isLoggedIn: (state) => state.token ? true : false
    },
    actions: {
        async login(form: signin) {
            try {
                const response = await axios().post(links.signin, form)
                window.localStorage.setItem('tp', response.data.token)
                this.token = response.data.token
                return response
            } catch (error) {
                return error
            }
        },

        async refresh() {
            try {
                const response = await axios().get(links.refresh)
                window.localStorage.setItem('tp', response.data.token)
                this.token = response.data.token
                return response
            } catch (error) {
                window.localStorage.removeItem('tp')
                return error
            }
        },

        async logout() {
            try {
                const response = await axios().get(links.logout)
                this.token = ''
                window.localStorage.removeItem('tp')
                return response
            } catch (error) {
                window.localStorage.removeItem('tp')
                return error
            }
        }
    }
})