<template>
    <v-window-item :value="2">
          <v-card-text>
            <v-switch
                v-model="product.track_quantity"
                color="primary"
                :true-value="true"
                :false-value="false"
                label="Track Quantity"
            />
            <v-switch
                v-model="product.continue_out_of_stock"
                color="primary"
                :true-value="true"
                :false-value="false"
                label="Continue Selling out of stock item?"
            />
            <v-switch
                v-model="product.is_variable"
                color="primary"
                :true-value="true"
                :false-value="false"
                label="Item with variable?"
                @change="callVariable"
            />
            <template v-if="product.track_quantity && !product.is_variable">
                <div v-for="sku in product.skus" :key="sku._id">
                    <v-text-field
                        label="Price"
                        type="number"
                        v-model.number="sku.price"
                    />
                    <v-text-field
                        label="Quantity"
                        type="number"
                        v-model.number="sku.quantity"
                    />
                </div>
            </template>
          </v-card-text>
    </v-window-item>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const prod = useProductStore()
const { product } = storeToRefs(prod)

function callVariable () {
    if(product.value.is_variable) {
        alert('calling the api')
    }
}
</script>