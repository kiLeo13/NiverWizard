import i18n from 'i18next'

import { initReactI18next } from 'react-i18next'

// ---------- Lang files imports ----------
import ptbrCommon from './locales/pt-BR/common.json'
import ptbrEvents from './locales/pt-BR/events.json'
import ptbrNamespaces from './locales/pt-BR/namespaces.json'

// ---------- i18n setup ----------
export const defaultNS = 'common'

export const resources = {
  'pt-BR': {
    common: ptbrCommon,
    events: ptbrEvents,
    namespaces: ptbrNamespaces
  }
} as const

export const i18nReady = i18n.use(initReactI18next).init({
  lng: 'pt-BR',

  resources,
  defaultNS,
  ns: ['common', 'events', 'namespaces'],

  supportedLngs: ['ptbr'],
  fallbackLng: false,

  interpolation: {
    escapeValue: false
  }
})

export default i18n
