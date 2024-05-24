import type { StorybookConfig } from "@storybook/vue3-vite"

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@chromatic-com/storybook'
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Docs',
  },
}

export default config
