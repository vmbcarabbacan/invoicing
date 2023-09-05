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
                                        <v-chip v-if="index < 1">
                                            <span>{{ item.title }} </span>
                                        </v-chip>
                                        <span
                                            v-if="index === 1"
                                            class="text-grey text-caption align-self-center"
                                        >
                                            
                                            (+{{ variable.variable_option_id.length - 1 }} others)
                                        </span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
                <v-btn
                    color="primary"
                    variant="flat"
                    block
                    @click="addVariable"
                    :disabled="product.options.length == 2"
                >
                    Add New Option
                </v-btn>
            </template>
          </v-card-text>
    </v-window-item>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const prod = useProductStore()
const { product, getVariables } = storeToRefs(prod)

callVariable()

function callVariable () {
    if(product.value.is_variable) {
        prod.getVaribales()
        if(product.value.options && product.value.options.length === 0) {
            product.value.options =[{
            variable_id: null,
            variable_option_id: [],
            variables: getVariables,
            options: []
        }]
        }
        
    }
}

function addVariable () {
    product.value.options.push({
        variable_id: null,
        variable_option_id: [],
        variables: getVariables,
        options: []
    })
}

async function handleChange(variable) {
    const data = await prod.getVariableOptionByVariableId(variable.variable_id)
    variable.options = data
}
</script>