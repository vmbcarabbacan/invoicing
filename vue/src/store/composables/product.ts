import { useRoute, useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useProductStore } from '@/store/product'
import { reactive, watchEffect } from "vue"
import { KEYOFSTRING } from "@/types/"
import links from "@/utils/links"

export function useProducts() {
    const route = useRoute()


}

export async function useSaveProduct(id: string) {
    const prod = useProductStore()
    const { product } = storeToRefs(prod)
    const form = reactive<KEYOFSTRING>({
        loading: false
    })

    form.loading = true

    product.value.id = id
    const response = await prod.saveProduct(product.value)
    form.loading = false

    Object.entries(response).forEach(([key, value]) => {
        form[key] = value
    })

    return { ...form }
}

export function useProduct() {
    const route = useRoute()
    const prod = useProductStore()

    let id = ''
    
    if(route.query.pid) id = route.query.pid.toString()
    if(route.params.id) id = route.params.id.toString()

    
    watchEffect(async() => {
        if(id) {
            const link = links.productById.replace('ID', id)
            await prod.getProduct(link)
        }
    })


}