import { defineStore } from "pinia"
import axios from 'axios'
import { capitalizeWords } from '@/store/composables/common'
import { MISC, value, KEYOFSTRING } from "@/types/"

export const useMiscStore = defineStore('misc', {
    state: () => ({
       miscs: <MISC> {},
       misc: <KEYOFSTRING> {}
    }),
    getters: {
        miscDatas: (state) => {
            if(state.miscs && state.miscs.data) {
                return state.miscs.data.map((x: value) => {
                    return {
                        id: x._id,
                        name: capitalizeWords(x.name)
                    }
                })
            }
            return []
        }
    },
    actions: {
        async getRecords(link: string, payload: KEYOFSTRING) {
            try {
                const tp = window.localStorage.getItem('tp')
                axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;
                
                const response: any = await axios.get(link, {
                    params: payload
                })
                this.miscs =  response.data.data

                return response
            } catch (error) {
                return error
            }
        },

        async getRecord(link: string, payload: KEYOFSTRING) {
            try {
                const tp = window.localStorage.getItem('tp')
                axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

                const response: any = await axios.get(link, payload)
                const data = await response.data.data
                const id = data._id
                delete data.deleted_at
                delete data._id
                this.misc =  { ...data, id }
                
                return response
            } catch (error) {
                return error
            }
        },

        async saveRecord(link: string, payload: KEYOFSTRING, isAdd: Boolean = true) {
            try {
                const tp = window.localStorage.getItem('tp')
                axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

                if(isAdd) return await axios.post(link, payload)

                return await axios.patch(link, payload)
                
            } catch (error) {
                return error
            }
        }
    }
})