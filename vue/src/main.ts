/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
// Components
import { components } from './plugins/component'

const app = createApp(App)


registerPlugins(app)
components(app)

app.mount('#app')
