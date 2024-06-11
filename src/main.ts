import { createApp } from 'vue'
import App from '@src/App.vue'
import '@src/main.scss'
import i18n from '@src/i18n'
import { tooltip } from '@directives/index'

createApp(App).directive('tooltip', tooltip).use(i18n).mount('#app')
