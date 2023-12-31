import { reactive, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { useMiscStore } from '@/store/misc'
import { useAppStore } from '@/store/app'
import { storeToRefs } from "pinia"
import { setTitle, setUrl, setKey } from "./common"
import { KEYOFSTRING } from "@/types/"

export function useComponent() {
    const route = useRoute()
    const component = reactive({
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
        const url = setUrl(<string> route.name)
        component.page = parseInt(<string> route.query.page) || 1
        component.qn = <string> route.query.qn || ''
        component.per_page = parseInt(<string> route.query.per_page) || 10
        app.setPageTitle(title.value)
        search.value = ''

        const key = route.meta.withPayload ?  setKey(<string> route.name) : ''
        let payload = {} as KEYOFSTRING
        if(route.meta.withPayload)
        payload[key] = route.params.id.toString()

        Object.entries(component).forEach(([key, value]) => {
            if(value) payload[key] = value
        })
        
        if(url && !url.includes('ID') && route) {
            await misc.getRecords(url, payload)
        }

    })

    return {
        title, ...component
    }
}

export function useEditComponent(payload: KEYOFSTRING = {}) {
    const route = useRoute()
    const app = useAppStore()
    const misc = useMiscStore()

    const component = reactive({
        url: '',
        id: ''
    })
    const title = ref('')
    const isEmpty = typeof payload == 'object' && Object.keys(payload).length == 0
    let component_url = route.name
    let component_id = route.params.id?.toString()
    if(!isEmpty && payload.url !== undefined) {
        component_url = <string> payload.url
    }
    if(!isEmpty && payload.id !== undefined) {
        component_id = <string> payload.id
    }
    watchEffect(async() => {
        title.value =  setTitle(<string> route.name)
        component.id = component_id
        component.url = setUrl(<string> component_url).replace('ID', component.id)
        app.setPageTitle(title.value)

        if(component.url && component.id && route) {
            await misc.getRecord(component.url, payload)
        }
    })

    return {
        title, ...component
    }
}

export async function useSaveItem (payload: KEYOFSTRING, routeName: string, isAdd: Boolean = true) {
    
    const misc = useMiscStore()
    try {
        const link = setUrl(<string> `Post${routeName}`)
        const result = await misc.saveRecord(link, payload, isAdd)
        return result
    } catch (error) {
        return error
    }
}