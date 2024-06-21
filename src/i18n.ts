import { I18nOptions } from 'vue-i18n'
import merge from 'lodash.merge'

import enGlobals from '@locales/Globals/en.json'
import esGlobals from '@locales/Globals/es.json'
import ptGlobals from '@locales/Globals/pt.json'

const getMessages = () => {
  return {
    en: {
      Globals: enGlobals,
    },
    es: {
      Globals: esGlobals,
    },
    pt: {
      Globals: ptGlobals,
    },
  }
}

export function mergeMessages(projectMessages: I18nOptions['messages']) {
  return merge(getMessages(), projectMessages)
}
