<template>
    <v-card
        class="mx-auto"
        max-width="500"
    >
        <v-card-text>
            <v-text-field
                label="Service Name"
                placeholder="eg. Plumbing"
                v-model="product.name"
            />
            <v-textarea
                label="Description"
                v-model="product.description"
            />
            <v-text-field
                v-if="route.name === 'NewService'"
                label="Price"
                type="number"
                v-model.number="product.price"
            />
            <template v-else>
                <div v-for="sku in product.skus" :key="sku._id">
                    <v-text-field
                        label="Price"
                        type="number"
                        v-model.number="sku.price"
                    />
                </div>
            </template>
        </v-card-text>
        <v-card-actions>
            <v-btn
                color="primary"
                variant="flat"
                block
                @click="save"
            >
                Save
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStore } from '@/store/product'
import { useSaveProduct, useProduct } from '@/store/composables/product'
import { useRoute, useRouter } from 'vue-router'

const prod = useProductStore()
const { product } = storeToRefs(prod)
const route = useRoute()
const router = useRouter()

useProduct()

async function save() {
    product.value.type = 2
    product.value.status = 1
    await useSaveProduct(<string> route.params.id)
    return router.push({ name: 'AllServices' })
}

</script>