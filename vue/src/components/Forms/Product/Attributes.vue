<template>
    <v-card-text>
        <v-select
            :items="categories"
            v-model="product.category"
            @update:modelValue="handleChange"
            label="Select category"
        />
        <v-select
            :items="subCategories"
            v-model="product.sub_category"
            label="Select sub category"
        />
        <v-select
            :items="brands"
            v-model="product.brand"
            label="Select brand"
        />
        <v-select
            :items="tags"
            v-model="product.tags"
            multiple
            label="Select tags"
        >
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                    <span>{{ item.title }} </span>
                </v-chip>
                <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                >
                    
                    (+{{ product.tags.length - 2 }} {{ product.tags.length == 3 ? 'other' : 'others' }})
                </span>
            </template>
        </v-select>
        <v-select
            :items="attributes"
            v-model="product.attributes"
            multiple
            label="Select attributes"
        >
            <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                    <span>{{ item.title }} </span>
                </v-chip>
                <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                >
                    
                    (+{{ product.tags.length - 2 }} {{ product.tags.length == 3 ? 'other' : 'others' }})
                </span>
            </template>
        </v-select>
    </v-card-text>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'

const prod = useProductStore()
const { product, attributes, tags, brands, categories, subCategories } = storeToRefs(prod)

async function handleChange() {
    await prod.getAllSubCategories({ category: product.value.category })
}
</script>