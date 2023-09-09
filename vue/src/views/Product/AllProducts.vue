<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col md="6" sm="12">
                <suspense>

                <template #default>
                    <product />
                </template>

                <template #fallback>
                <p>Loading...</p>
                </template>

                </suspense>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useProducts } from '@/store/composables/product'
import { defineAsyncComponent } from 'vue'
import LoadingComponent  from '@/components/Loading.vue'

useProducts()

const product = defineAsyncComponent({
    loader: () => import('@/components/Views/Products.vue'),
    loadingComponent: LoadingComponent,
    delay: 1000,
    timeout: 3000

})
</script>