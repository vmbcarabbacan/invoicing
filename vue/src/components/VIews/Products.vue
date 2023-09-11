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
    </v-card>
</template>
<script lang="ts" setup>
import { ProductHeaders } from '@/utils/tables' 
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import { useRoute } from 'vue-router'
import router from '@/router';

const prod = useProductStore()
const route = useRoute()
const { products } = storeToRefs(prod)

function toEdit(id: string) {
    const name = `Edit${route.name?.toString()}`
    router.push({name, params: { id }})
}
</script>