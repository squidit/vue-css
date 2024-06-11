import { Parameters, setup } from '@storybook/vue3'
import DocumentationTemplate from './documentation.template.mdx'
import { themes } from '@storybook/theming'
import i18n from '../src/i18n'
import { tooltip } from '../src/directives/index'
import '../src/main.scss'

setup((app) => {
  app.directive('tooltip', tooltip).use(i18n)
})

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'pt', title: 'Português' },
        { value: 'es', title: 'Español' },
      ],
      showName: true,
    },
  },
  theme: {
    name: 'Theme',
    description: 'Theme for components',
    defaultValue: window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
}

export const parameters: Parameters = {
  viewMode: 'docs',
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
  actions: {
    // argTypesRegex: '^on.*',
  },
  controls: {
    sort: 'requiredFirst',
    exclude: /children/,
    matchers: {
      color: /(background|color)$/i,
    },
  },
  docs: {
    page: DocumentationTemplate,
    theme: window?.matchMedia('(prefers-color-scheme: dark)').matches ? themes.dark : themes.light,
  },
  options: {
    storySort: {
      order: ['Getting Started', 'Components', 'Helpers', 'Directives',],
    },
  },
}

const selections = (Story, context) => {
  const html = document.getElementsByTagName('html')[0]
  html.classList.remove('light', 'dark')
  html.classList.add(context.globals.theme)

  const docsStoryElements = document.querySelectorAll('.docs-story')
  if (docsStoryElements?.length) {
    docsStoryElements.forEach((docsStoryElement) => {
      docsStoryElement.setAttribute('style', `background-color: var(--background_secondary) !important`)
    })
  }

  if (context.globals.locale) {
    i18n.global.locale.value = context.globals.locale
  }

  return Story(context)
}

export const decorators = [selections]
