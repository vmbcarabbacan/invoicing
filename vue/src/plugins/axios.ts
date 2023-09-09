import axios from "axios"
import { useAuthStore } from "@/store/auth"
import { useRouter } from "vue-router"

export default () => {
    let headers = {
        'cache-control': 'no-cache'
    }

    const auth = useAuthStore()
    const router = useRouter()

    const token = localStorage.getItem('tp')
    if(token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const instance = axios.create({
        baseURL: process.env.VUE_BASE_URL,
        withCredentials: true,
        headers
    })

    instance.interceptors.response.use(function (response) {
            return response
        },
        async function (error) {
            let checkToken = 0
            let token = window.localStorage.getItem('tp')
            if(checkToken == 0 && token) {
                checkToken = 1

                setTimeout(async() => {
                    const refresh = await auth.refresh()
                    if(refresh && refresh.status > 299) {
                        auth.$reset()
                        window.localStorage.removeItem('tp')
                        router.push({ name: 'Login' }).then(() => router.go(1))
                    }
                    checkToken = 0   
                }, 1500);

                
            }
            return Promise.reject(error)
        }
    )

    return instance
}