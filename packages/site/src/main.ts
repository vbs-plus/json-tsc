import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import type { GlobModule } from 'type'

const app = createApp(App)

Object.values(import.meta.glob<GlobModule>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app))
app.mount('#app')
