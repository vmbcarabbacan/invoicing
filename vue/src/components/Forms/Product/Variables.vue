<template>
    <v-expansion-panels variant="accordion">
        <v-expansion-panel
            v-for="(variable, index) in product.skus"
            :key="index"
        >
        <v-expansion-panel-title> {{ variable.name }} </v-expansion-panel-title>
        <v-expansion-panel-text>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field
                        type="number"
                        label="Price"
                        v-model.number="variable.price"
                    />
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field
                        type="number"
                        label="Quantity"
                        v-model.number="variable.quantity"
                    />
                </v-col>
            </v-row>
        </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const prod = useProductStore()
const { product } = storeToRefs(prod)

</script>