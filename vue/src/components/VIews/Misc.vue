<template>
    <v-card>
        <v-card-item>
            <div class="d-flex">
                <div>
                    <v-btn
                        v-if="route.meta.withBack"
                        prepend-icon="mdi-arrow-left"
                        size="small"
                        variant="text"
                        @click="goBack(route.meta?.to?.toString())"
                    >
                        Back {{ backTitle }}
                    </v-btn>
                </div>
                <v-spacer />
                <div>
                    <v-btn
                        variant="flat"
                        color="indigo-darken-3"
                        prepend-icon="mdi-plus"
                        @click="addNewItem"
                    >
                        Add New
                    </v-btn>
                </div>
            </div>
        </v-card-item>
        <v-card-text>
            <vc-table height="400" hover>
                <template #header>
                    <tr>
                        <th class="text-left" v-for="header in GenericHeaders" :key="header.label" :width="header.width">{{ header.label }}</th>
                        <th class="text-center">
                            Action
                        </th>
                    </tr>
                </template>

                <template #body>
                    <tr v-for="item in miscDatas" :key="item.id">
                        <td class="text-left" v-for="header in GenericHeaders" :key="header.label">
                        {{ item[header.value] }}
                        </td>
                        <td class="text-center">
                            <v-btn
                                variant="text"
                                icon="mdi-pencil"
                                color="blue-lighten-2"
                                @click="toEdit(item.id)"
                            ></v-btn>
                            <v-btn
                                v-if="route.meta.withSub"
                                variant="text"
                                icon="mdi-eye"
                                color="green-lighten-2"
                                @click="toView(item)"
                            ></v-btn>
                        </td>
                    </tr>
                </template>
            </vc-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-select
                v-model="per_page"
                :items="per_pages"
                label=""
                class="per_page"
            ></v-select>
            <v-spacer />
            <span>Total {{ miscs.total }}</span>
            <v-spacer />
            <v-pagination
                v-model="miscs.from"
                :length="miscs.size"
                :total-visible="mobile ? 3 : 7"
                @click="changePage"
                ></v-pagination>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
    import { ref, watch, inject, onMounted, watchEffect } from 'vue'
    import { useComponent } from '@/store/composables/component'
    import { GenericHeaders, per_pages } from '@/utils/tables'
    import { storeToRefs } from 'pinia'
    import { useMiscStore } from '@/store/misc'
    import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router'
    import { KEYOFSTRING } from '@/types'

    const mobile = inject('mobile')
    const mis = useMiscStore()
    const router = useRouter()
    const route = useRoute()

   const { title } = useComponent()
   
   const per_page = ref(10)

   let backTitle = window.localStorage.getItem('title')

   const { miscDatas, miscs, misc } = storeToRefs(mis)

   function changePage() {
    const query = Object.assign({}, route.query)
    query.page = miscs.value.from
    if(route.query.per_page) query.per_page = route.query.per_page
    if(route.query.qn) query.qn = route.query.qn
    router.replace({ query })
   }
   
   onBeforeRouteLeave(() => {
    miscs.value = {}
   })

   function toEdit(id: string) {
    const name = `Edit${route.name?.toString()}`
    router.push({ name, params: { id } })
   }

   function toView(item: KEYOFSTRING) {
    const name = `Sub${route.name?.toString()}`
    const id = item.id
    window.localStorage.setItem('title', item.name)
    backTitle = item.name
    router.push({ name, params: { id } })
   }

   function addNewItem() {
    const name = `Add${route.name?.toString()}`
    if(route.meta.withPayload) {
        router.push({name, params: {id: route.params.id.toString()}})
    } else {
        router.push({ name })
    }
   }

   function goBack(name: string) {
    window.localStorage.setItem('title', '')
    backTitle = ''
    router.push({ name })
   }

   onMounted(() => {
    if(route.query.per_page) per_page.value = parseInt(route.query.per_page.toString())
   })

   watch(per_page, (newvalue) => {
    if(per_page.value) {
        const query = Object.assign({}, route.query)
        query.per_page = newvalue.toString()
        if(route.query.page) query.page = '1'
        if(route.query.qn) query.qn = route.query.qn
        router.replace({ query })
    }
   })


</script>

<style>
.per_page .v-input__control {
    width: 120px;
}
</style>