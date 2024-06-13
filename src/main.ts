import App from '@src/App.vue'
import { createApp } from 'vue'
import VueCssPlugin from '@src/vue-css'
import '@src/main.scss'

createApp(App).use(VueCssPlugin).mount('#app')
