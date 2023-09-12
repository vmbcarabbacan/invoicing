<template>
    <v-card>
        <v-card-text>
            <vc-table height="400" hover>
                <template #header>
                    <tr>
                        <th class="text-left" v-for="header in ProductHeaders" :key="header.label" :width="header.width">{{ header.label }}</th>
                        <th>Action</th>
                    </tr>
                    
                </template>

                <template #body>
                    <tr v-for="item in products.data" :key="item.id">
                        <td class="text-left" v-for="header in ProductHeaders" :key="header.label">
                        <span v-if="header.value === 'status_text'"
                        :class="{'text-red': item.status == 0, 'text-green': item.status == 1, 'text-blue': item.status == 2}">
                            {{ item[header.value] }}
                        </span>
                        <span v-else>
                            {{ item[header.value] }}
                        </span>

                        </td>
                        <td>
                            <v-btn
                                variant="text"
                                icon="mdi-pencil"
                                color="blue-lighten-2"
                                @click="toEdit(item.id)"
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
            <span>Total {{ products.total }}</span>
            <v-spacer />
            <v-pagination
                v-model="page"
                :length="products.size"
                :total-visible="mobile ? 3 : 7"
                @click="changePage"
                ></v-pagination>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import { inject, ref, onMounted } from 'vue'
import { ProductHeaders, per_pages } from '@/utils/tables' 
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import { useRoute, useRouter } from 'vue-router'

const prod = useProductStore()
const route = useRoute()
const router = useRouter()
const { products } = storeToRefs(prod)
const mobile = inject('mobile')
const per_page = ref(10)
const page = ref(1)

function toEdit(id: string) {
    const name = `Edit${route.name?.toString()}`
    router.push({name, params: { id }})
}

onMounted(() => {
    if(route.query.page) {
        page.value = parseInt(route.query.page.toString())
    }
    if(route.query.per_page) {
        per_page.value = parseInt(route.query.per_page.toString())
    }
})

function changePage() {
    const query = Object.assign({}, route.query)
    query.page = page.value
    
    if(route.query.per_page) query.per_page = parseInt(route.query.per_page.toString())
    if(route.query.qn) query.qn = route.query.qn
    router.replace({ query })
   }
</script>