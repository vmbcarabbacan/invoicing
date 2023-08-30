/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  aliases: {
    VcBtn: VBtn,
  },
  defaults: {
    VBtn: {
      class: 'text-none'
    },
    VcBtn: {
      color: 'primary',
      variant: 'elevated',
      class: 'text-none',
      size: 'x-large',
      block: true
    },
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  locale: {
    messages: {
      loading: 'Loading content...',
    },
  },
 
})
