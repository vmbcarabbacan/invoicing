import { KEYOFSTRING } from "@/types"
import { defineStore } from "pinia"
import axios from "@/plugins/axios"

export const useMasterStore = defineStore('master', {
    state: () => ({
        productStatuses: <Array<KEYOFSTRING>>[]
    }),
    actions: {
        async getStatuses() {
            try {
                const response = await axios().get('/master/product-statuses')
                this.productStatuses = response.data.data

                return response
            } catch (error) {
                return error
            }
        }
    }
})