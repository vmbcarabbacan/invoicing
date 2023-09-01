<template>
    <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              label="Product Name"
              placeholder="eg. iphone 14 pro"
              v-model="product.name"
            />
          </v-card-text>
    </v-window-item>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const prod = useProductStore()
const { product } = storeToRefs(prod)

</script>