<template>
    <v-container>
        <v-row class="d-flex justify-center">
            <v-col md="6" sm="12">
                <misc />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { defineAsyncComponent } from 'vue'
    // import misc from '@/components/Views/Misc.vue'
    import LoadingComponent  from '@/components/Loading.vue'

    const misc = defineAsyncComponent({
        loader: () => import('@/components/Views/Misc.vue'),
        loadingComponent: LoadingComponent,
        delay: 1000,
        timeout: 3000
    })

</script>