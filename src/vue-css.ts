import { App } from 'vue'
import { createI18n, I18nOptions } from 'vue-i18n'
import { tooltip } from './directives'
import { mergeMessages } from './i18n'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let i18n: any

export default {
  install: (app: App<Element>, options?: { messages?: I18nOptions['messages']; locale?: string }) => {
    app.directive('tooltip', tooltip)

    const _i18n = createI18n({
      locale: options?.locale || navigator.language?.split('-')[0] || 'en',
      fallbackLocale: 'en',
      globalInjection: true,
      legacy: false,
      messages: mergeMessages(options?.messages || {}),
    })

    i18n = _i18n

    app.use(i18n)
  },
}

export * from './components'
export * from './helpers'

export const t = (key: string) => {
  if (!key) {
    return ''
  }
  return i18n.global.t(key)
}

export const changeLocale = (locale: string) => {
  i18n.global.locale.value = locale
}
