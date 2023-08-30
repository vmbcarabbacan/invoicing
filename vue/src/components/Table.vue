<template>
    <v-table
        fixHeader
        :height="height"
        :hover="hover"
    >
    <thead>
        <slot name="header" />
    </thead>
    <tbody>
        <slot name="body" />
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
    defineProps({
        fixHeader: {
            type: Boolean,
            required: false,
            default: false
        },
        height: {
            type: String,
            required: false,
            default: ''
        },
        hover: {
            type: Boolean,
            required: false,
            default: false
        }
    })
</script>