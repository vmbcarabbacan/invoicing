import { defineStore } from "pinia"
import { KEYOFSTRING } from "@/types"
import axios from "axios"
import links from "@/utils/links"
import { capitalizeWords } from '@/store/composables/common'

export const useProductStore = defineStore('product', {
    state: () => ({
        product: {
            id: '',
            name: '',
            description: '',
            is_variable: false,
            track_quantity: true,
            continue_out_of_stock: false,
            type: 1,
            category: null,
            sub_category: null,
            brand: null,
            tags: [],
            attributes: [],
            status: 0,
            options: []
        },
        variables: []
    }),
    getters: {
        getVariables(state) {
            return state.variables.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        }
    },
    actions: {
        async saveProduct(payload: KEYOFSTRING) {
            try {
                const tp = window.localStorage.getItem('tp')
                axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

                let response = {} as any

                if(payload.id) response = await axios.patch(links.product, payload)

                response = await axios.post(links.product, payload)

                const product = response.data.data
                product.id = product._id
                delete product._id
                product.options = []

                this.product = product
                return product
            } catch (error) {
                return error
            }
        },

        async getProduct(link: string) {
            const tp = window.localStorage.getItem('tp')
            axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

            const response: any = await axios.get(link)
            const data = await response.data.data
            const id = data._id
            delete data.deleted_at
            delete data._id
            data.options = []
            this.product = { ...data, id}
            return response
        },

        async getVaribales() {
            const tp = window.localStorage.getItem('tp')
            axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

            const response:any = await axios.get(links.variables, {
                params: {
                    show_all: true
                }
            })
            this.variables = response.data.data
        },

        async getVariableOptionByVariableId(variable: string) {
            const tp = window.localStorage.getItem('tp')
            axios.defaults.headers.common['Authorization'] = `Bearer ${tp}`;

            const response:any = await axios.get(links.variableOptions, {
                params: {
                    show_all: true,
                    variable
                }
            })

            return response.data.data.map((x: KEYOFSTRING) => {
                return {
                    value: x._id,
                    title: capitalizeWords(<string> x.name)
                }
            })
        }
    }
})