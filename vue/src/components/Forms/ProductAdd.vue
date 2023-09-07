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
  
        <ProductInventory />

        <ProductVariables />
  
      </v-window>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-btn
          v-if="step > 1"
          variant="text"
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="step < 4"
          color="primary"
          variant="flat"
          @click="saveProduct"
        >
          Next
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
const { product, options } = storeToRefs(prod)
const route = useRoute()
const router = useRouter()
const step = ref<number>(1)

const currentTitle = computed(() => {
    switch(step.value) {
        case 1: return 'Add New Product'
        case 2: return 'Inventory'
        case 3: return 'Manage Variables'
        default: return 'Account created'
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

async function saveProduct() {
  step.value++
  console.log(step.value)
  console.log(product.value.is_variable)
  if(step.value == 3 && product.value.is_variable) product.value.variable_options = options

  const { id } = await useSaveProduct(<string> route.query.pid)
  router.replace({ query: { pid: id } })
}
</script>