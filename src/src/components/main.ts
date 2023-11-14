import type { App } from 'vue'
import { Loader } from '@/components'

export default {
  install: (app: App) => {
    app.component('Loader', Loader)
  },
}

export { Loader }
