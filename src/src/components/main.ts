import type { App } from 'vue'
import { LoaderSquid } from '@/components'

export default {
  install: (app: App) => {
    app.component('HelloWorld', LoaderSquid)
  },
}

export { LoaderSquid }
