<template>
    <div>
        <v-card>
            <v-card-item>
                <div class="text-left">
                    <v-btn
                        prepend-icon="mdi-arrow-left"
                        @click="goBack"
                        size="small"
                        variant="text"
                    >
                    Back
                    </v-btn> 
                </div>
            </v-card-item>
            <v-card-text>
                <v-divider />
                <v-text-field
                    label="Name"
                    class="mt-2"
                    v-model="misc.name"
                />
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                <v-btn
                    class="elevated-2"
                    color="indigo-darken-3"
                    variant="flat"
                    @click="handleSave"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
import { useEditComponent, useSaveItem } from '@/store/composables/component'
import { onBeforeRouteLeave } from 'vue-router';
import { useMiscStore } from '@/store/misc'
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from 'vue-router'
import { setKey } from '@/store/composables/common'

const miscs = useMiscStore()
const route = useRoute()
const router = useRouter()
const { misc } = storeToRefs(miscs)

onBeforeRouteLeave(() => {
    misc.value = {}
})

const { title } = useEditComponent()

function goBack() {
    router.go(-1)
}

async function handleSave() {
    let isAdd = false
    if(route.name?.toString().includes('Add')) isAdd = true
    const key = setKey(<string> route.name)
    if(route.meta.withId) misc.value[key] = route.params.id.toString()
    await useSaveItem(misc.value, <string> route.name, isAdd)
    goBack()
}
</script>