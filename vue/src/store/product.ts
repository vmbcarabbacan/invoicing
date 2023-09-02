import { defineStore } from "pinia"
import { KEYOFSTRING } from "@/types"
import axios from "axios"
import links from "@/utils/links"

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
            status: 0
        }
    }),
    getters: {

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
            console.log({response})
            const data = await response.data.data
            const id = data._id
            delete data.deleted_at
            delete data._id

            this.product = { ... data, id}
            return response
        }
    }
})