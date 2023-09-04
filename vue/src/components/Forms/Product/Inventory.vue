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
            <template v-if="product.is_variable">
                <div v-for="(variable, index) in product.options" :key="index">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-select
                                    :items="variable.variables"
                                    v-model="variable.variable_id"
                                    @update:modelValue="handleChange(variable)"
                                    label="Select Variable"
                                    />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    :items="variable.options"
                                    v-model="variable.variable_option_id"
                                    multiple
                                >
                                    <template v-slot:selection="{ item, index }">
                                        <v-chip v-if="index < 2">
                                            <span>{{ item.title }} </span>
                                        </v-chip>
                                        <span
                                            v-if="index === 2"
                                            class="text-grey text-caption align-self-center"
                                        >
                                            (+{{ value.length - 2 }} others)
                                        </span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </template>
          </v-card-text>
    </v-window-item>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import { KEYOFSTRING } from '@/types';

const prod = useProductStore()
const { product, getVariables } = storeToRefs(prod)

function callVariable () {
    if(product.value.is_variable) {
        prod.getVaribales()
        product.value.options = <any>[{
            variable_id: null,
            variable_option_id: [],
            variables: getVariables,
            options: []
        }]
    }
}

async function handleChange(variable: KEYOFSTRING) {
    const data = await prod.getVariableOptionByVariableId(<string> variable.variable_id)
    variable.options = data
}
</script>