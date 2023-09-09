<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col md="6" sm="12">
                <suspense>

                    <template #default>
                        <misc />
                    </template>

                    <template #fallback>
                    <p>Loading...</p>
                    </template>

                </suspense>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { defineAsyncComponent } from 'vue'
    import LoadingComponent  from '@/components/Loading.vue'

    const misc = defineAsyncComponent({
        loader: () => import('@/components/Views/Misc.vue'),
        loadingComponent: LoadingComponent,
        delay: 1000,
        timeout: 3000
    })

</script>