import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useProductStore } from '@/store/product'
import { useAppStore } from '@/store/app'
import { reactive, watchEffect, ref } from "vue"
import { KEYOFSTRING } from "@/types/"
import links from "@/utils/links"
import { setTitle, setUrl } from './common'

export function useProducts() {
    const route = useRoute()
    const app = useAppStore()
    const prod = useProductStore()
    const title = ref('')
    const component = reactive({
        page: 1,
        qn: '',
        per_page: 10
    })

    watchEffect(async() => {
        title.value = setTitle(<string> route.name)
        const url = setUrl(<string> route.name)
        component.page = parseInt(<string> route.query.page) || 1
        component.qn = <string> route.query.qn || ''
        component.per_page = parseInt(<string> route.query.per_page) || 10
        app.setPageTitle(title.value)

        let payload = {} as KEYOFSTRING
        Object.entries(component).forEach(([key, value]) => {
            if(value) payload[key] = value
        })

        if(url && route) await prod.getProducts(url, payload)
        
    })

}

export async function useSaveProduct(id: string) {
    const prod = useProductStore()
    const { product } = storeToRefs(prod)
    const form = reactive<KEYOFSTRING>({
        loading: false
    })

    if(product.value.name) {
        form.loading = true

        product.value.id = id
        const response = await prod.saveProduct(product.value)
        form.loading = false

        Object.entries(response).forEach(([key, value]) => {
            form[key] = value
        })
    }

    return { ...form }
}

export function useProduct() {
    const app = useAppStore()
    const route = useRoute()
    const prod = useProductStore()
    const { product } = storeToRefs(prod)

    let id = ''
    
    if(route) {
        if(route.query.pid) id = route.query.pid.toString()
        if(route.params.id) id = route.params.id.toString()
    }

    prod.$reset()

    
    watchEffect(async() => {
        if(route) {
            const title = setTitle(<string> route.name)
            app.setPageTitle(title)
        }
        

        if(id) {
            const link = links.productById.replace('ID', id)
            await prod.getProduct(link)
            await prod.getAllAttributes()
            if(product.value.category) await prod.getAllSubCategories({ category: product.value.category })
        }
    })
}
