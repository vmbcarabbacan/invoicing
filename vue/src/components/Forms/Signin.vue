<template>
    <v-container class="fill-height">
        <v-row class="d-flex align-center justify-center">
            <v-col cols="12" sm="8" xs="12" md="5" lg="5" xl="5">
                <v-form ref="signinForm">
                    <v-card>
                        <v-card-item>
                            <v-card-title>
                                Signin
                            </v-card-title>
                        </v-card-item>
                        <v-card-text>
                            <v-text-field
                                v-model="form.email"
                                label="Email Address"
                                :rules="emailRules"
                                required
                            />
                            <v-text-field
                                v-model="form.password"
                                label="Password"
                                :type="showPassword ? 'text' : 'password'"
                                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append-inner="showPassword = !showPassword"
                                required
                            />
                        </v-card-text>
                        <v-card-actions>
                            <vc-btn
                                :loading="loading"
                                :disabled="loading"
                                @click="handleSubmit"
                            >
                                Submit
                                <template v-slot:loader>
                                    Loading &nbsp;
                                    <v-progress-circular
                                        indeterminate
                                        color="primary"
                                        size="small"
                                    />
                                </template>
                            </vc-btn>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { signin } from '@/types'
    import { useAuthStore } from '@/store/auth'
    import { useRouter } from 'vue-router'

    const signinForm = ref<Record<string, undefined>>()
    const showPassword = ref<Boolean>(false)
    const loading = ref<Boolean>(false)
    const auth = useAuthStore()
    const router = useRouter()
    const form = ref<signin>({
        email: '',
        password: ''
    }) 

    const emailRules = [
        (v: string) => !!v || 'Email is required',
        (v: string) => /^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v) || 'Email format is not correct'
    ]

    async function handleSubmit () {
        // loading.value = true
        const { status } = await auth.login(form.value)
        if(status === 200) router.push({ name: 'Home' })
    }
</script>