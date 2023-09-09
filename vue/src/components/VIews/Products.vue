<template>
    <v-card>
        <v-card-text>
            <vc-table height="400" hover>
                <template #header>
                    <tr>
                        <th class="text-left" v-for="header in ProductHeaders" :key="header.label" :width="header.width">{{ header.label }}</th>
                    </tr>
                </template>

                <template #body>
                    <tr v-for="item in products.data" :key="item.id">
                        <td class="text-left" v-for="header in ProductHeaders" :key="header.label">
                        {{ item[header.value] }}
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

const prod = useProductStore()
const { products } = storeToRefs(prod)
</script>