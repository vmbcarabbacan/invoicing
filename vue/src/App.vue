<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <router-view name="aside" />
      <router-view />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
  import { provide, ref, onMounted } from 'vue'
  import { useAuthStore } from '@/store/auth'
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'

  const auth = useAuthStore()
  const { mobile } = useDisplay()
  const router = useRouter()

  const rail = ref<Boolean>(false)
  const drawer = ref<Boolean>(!mobile.value ? true : false)
  
  provide('rail', rail)
  provide('drawer', drawer)
  provide('mobile', mobile)

  onMounted(async() => {
    if(auth.isLoggedIn) {
      const response = <Response> await auth.refresh()
      if (response.status > 299 || response?.code == 'ERR_NETWORK') router.push({name : 'Login'})
    }
  })
</script>
