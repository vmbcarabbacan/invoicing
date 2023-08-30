import { reactive, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useMiscStore } from '@/store/misc'
import { useAppStore } from '@/store/app'
import { storeToRefs } from "pinia"
import { setTitle, setUrl } from "./common"
import { NONAME } from "dns"



interface keyOfString {
    [key: string]: string
}

export function useComponent() {
    const route = useRoute()
    const component = reactive({
        url: '',
        page: 1,
        qn: '',
        per_page: 10
    })
    const title = ref('')
    const misc = useMiscStore()
    const app = useAppStore()

    const { search } = storeToRefs(app)

    watchEffect(async() => {
        title.value =  setTitle(<string> route.name)
        component.url = setUrl(<string> route.name)
        component.page = parseInt(<string> route.query.page) || 1
        component.qn = <string> route.query.qn || ''
        component.per_page = parseInt(<string> route.query.per_page) || 10
        app.setPageTitle(title.value)
        search.value = ''

        const key = route.meta.withPayload && (route.name == 'SubCategories') ? 'category' : ''
        let payload = {}
        if(route.meta.withPayload)
        payload[key] = route.params.id.toString()
        
        if(component.url && !component.url.includes('ID') && route) {
            await misc.getRecords(`${component.url}?page=${component.page}&per_page=${component.per_page}&qn=${component.qn}`, payload)
        }

    })

    return {
        title, ...component
    }
}

export function useEditComponent(payload: Record<string, undefined> = {}) {
    const route = useRoute()
    const app = useAppStore()
    const misc = useMiscStore()

    const component = reactive({
        url: '',
        id: ''
    })
    const title = ref('')
    watchEffect(async() => {
        title.value =  setTitle(<string> route.name)
        component.id = route.params.id
        component.url = setUrl(<string> route.name).replace('ID', component.id)
        app.setPageTitle(title.value)

        if(component.url && component.id && route) {
            await misc.getRecord(component.url, payload)
        }
    })

    return {
        title, ...component
    }
}

export async function useSaveItem (payload: Record<string, undefined>, routeName: string, isAdd: Boolean = true) {
    
    const misc = useMiscStore()
    try {
        const link = setUrl(<string> `Post${routeName}`)
        const result = await misc.saveRecord(link, payload, isAdd)
        return result
    } catch (error) {
        return error
    }
}