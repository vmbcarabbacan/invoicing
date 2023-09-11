<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col md="8" sm="12">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col md="12">
                                <v-text-field
                                    label="Name"
                                    v-model="product.name"
                                />
                            </v-col>
                            <v-col md="12">
                                <v-textarea
                                    label="Description"
                                    v-model="product.description"
                                />
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider />
                    <ProductInventory />
                    <!-- <template v-if="product.is_variable"> -->
                        <v-divider />
                        <ProductVariables />
                    <!-- </template> -->
                </v-card>
            </v-col>
            <v-col md="4" sm="12">
                <v-card>
                    <ProductAttributes />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'
import LoadingComponent  from '@/components/Loading.vue'
import { useProductStore } from '@/store/product'
import { storeToRefs } from 'pinia'
import { useProduct } from '@/store/composables/product'

defineProps({
    id: String
})

useProduct()

const prod = useProductStore()
const { product } = storeToRefs(prod)

const ProductAttributes = defineAsyncComponent({
    loader: () => import('@/components/Forms/Product/Attributes.vue'),
    loadingComponent: LoadingComponent,
    delay: 1000,
    timeout: 3000
})

const ProductInventory= defineAsyncComponent({
    loader: () => import('@/components/Forms/Product/Inventory.vue'),
    loadingComponent: LoadingComponent,
    delay: 1000,
    timeout: 3000
})

const ProductVariables= defineAsyncComponent({
    loader: () => import('@/components/Forms/Product/Variables.vue'),
    loadingComponent: LoadingComponent,
    delay: 1000,
    timeout: 3000
})

async function handleChange() {
    await prod.getAllSubCategories({ category: product.value.category })
}

</script>