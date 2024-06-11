import { createI18n, I18nOptions } from 'vue-i18n'
import merge from 'lodash.merge'

import enSqInput from '@locales/SqInput/en.json'
import esSqInput from '@locales/SqInput/es.json'
import ptSqInput from '@locales/SqInput/pt.json'

const getMessages = () => {
  return {
    en: {
      SqInput: enSqInput,
    },
    es: {
      SqInput: esSqInput,
    },
    pt: {
      SqInput: ptSqInput,
    },
  }
}

export function mergeMessages(projectMessages: I18nOptions['messages']) {
  return merge(getMessages(), projectMessages)
}

export default createI18n({
  locale: navigator.language?.split('-')[0] || 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  legacy: false,
  messages: getMessages(),
})
