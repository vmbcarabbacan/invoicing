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
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
            ></v-text-field>
            <span class="text-caption text-grey-darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>
  
        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to Vuetify
            </h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
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
          v-if="step < 3"
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


const route = useRoute()
const router = useRouter()
const step = ref<number>(1)

const currentTitle = computed(() => {
    switch(step.value) {
        case 1: return 'Add New Product'
        case 2: return 'Create a password'
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

async function saveProduct() {
  step.value++
  const { id } = await useSaveProduct(<string> route.query.pid)
  router.replace({ query: { pid: id } })
}
</script>