<template>
  <v-app-bar>
    
    <v-app-bar-title>{{  page_title }}</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-text-field
      v-if="!notShow.some(x => route.name?.toString().includes(x))"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      class="mr-4"
      v-model="search"
      @keydown.prevent.enter="sendQn"
    >
      <template v-slot:append>
        <v-btn elevation="4" class="mt-2" @click="sendQn">
          Search
        </v-btn>
      </template>
    </v-text-field>

    <template v-slot:prepend v-if="mobile">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
  </v-app-bar>

  <v-main class="d-flex align-center justify-center" @click="rail = false">
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const rail = inject('rail')
const mobile = inject('mobile')
const drawer = inject('drawer')
const app = useAppStore()
const router = useRouter()
const route = useRoute()
const notShow = ref(['Edit', 'New', 'Add', 'Dashboard'])

const { page_title, search } = storeToRefs(app)

onMounted(() => {
  search.value = <any> route.query.qn?.toString()
})

function sendQn() {
  const query = Object.assign({}, route.query)
  query.qn = search.value
  if(route.query.page) query.page = '1'
  if(route.query.per_page) query.per_page = route.query.per_page
  router.replace({ query })
}


</script>
