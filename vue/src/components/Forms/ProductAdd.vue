<template>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-card-title class="text-h6 font-weight-regular text-left">
        <span>{{ currentTitle }}</span>
        
      </v-card-title>
  
      <v-window v-model="step">
        
        <ProductTitle />

        <v-window-item :value="2">
          <ProductInventory />
        </v-window-item>

        <v-window-item :value="3">
          <ProductVariables />
        </v-window-item>

        <v-window-item :value="4">
          <ProductAttributes />
        </v-window-item>
  
      </v-window>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn
          v-if="step > 1"
          variant="text"
          @click="goBack"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step < 5"
          color="primary"
          variant="flat"
          @click="saveProduct"
          :disabled="!product.name"
        >
          {{ step == 4 ? 'Complete' : 'Next' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>

<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import LoadingComponent  from '@/components/Loading.vue'
import { useProduct, useSaveProduct } from '@/store/composables/product'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/store/product'
import { storeToRefs } from 'pinia'

const prod = useProductStore()
const { product, options, generateVariables } = storeToRefs(prod)
const route = useRoute()
const router = useRouter()
const step = ref<number>(1)

const currentTitle = computed(() => {
    switch(step.value) {
        case 1: return 'Add New Product'
        case 2: return 'Inventory'
        case 3: return 'Manage Variables'
        default: return 'Attributes'
    }
})

useProduct()

const ProductTitle = defineAsyncComponent({
    loader: () => import('@/components/Forms/Product/Title.vue'),
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

const ProductAttributes = defineAsyncComponent({
    loader: () => import('@/components/Forms/Product/Attributes.vue'),
    loadingComponent: LoadingComponent,
    delay: 1000,
    timeout: 3000
})

async function saveProduct() {
  step.value++
  if(step.value == 3 && !product.value.is_variable) step.value++
  if(step.value == 3 && product.value.is_variable) product.value.variable_options = generateVariables
console.log({step: step.value, product: product.value, generateVariables: generateVariables.value})
  if(step.value === 5) product.value.status = 1
  const { id } = await useSaveProduct(<string> route.query.pid)
  if(step.value === 5 ) return router.push({ name: 'AllProducts' })
  else router.replace({ query: { pid: id } })
}

function goBack() {
  step.value--
  if(step.value === 3 && !product.value.is_variable) step.value--
}
</script>