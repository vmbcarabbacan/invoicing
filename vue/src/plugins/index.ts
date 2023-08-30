/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import router from '../router'
import axios from 'axios'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  axios.defaults.baseURL = 'http://localhost:3500'
  axios.defaults.withCredentials = true
  
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}
