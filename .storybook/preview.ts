import type { Parameters } from '@storybook/vue3'
import DocumentationTemplate from './documentation.template.mdx'
import { themes } from '@storybook/theming'
import '../src/main.scss'

export const globalTypes = {
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
      order: ['Getting Started', 'Components'],
    },
  },
  layout: 'centered',
}

const themeSelect = (Story, context) => {
  const html = document.getElementsByTagName('html')[0]
  html.classList.remove('light', 'dark')
  html.classList.add(context.globals.theme)

  const docsStoryElements = document.querySelectorAll('.docs-story')
  if (docsStoryElements?.length) {
    docsStoryElements.forEach((docsStoryElement) => {
      docsStoryElement.setAttribute('style', `background-color: var(--background_secondary) !important`)
    })
  }

  return Story(context)
}

export const decorators = [themeSelect]
