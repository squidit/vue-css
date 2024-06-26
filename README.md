<div>
  <div align="center">
    <img src="./public/img/svg/vue-logo.svg" width="60px" align="center" alt="Vue" />
    +&ensp;
    <img src="https://squidit.com.br/wp-content/themes/squid/assets/img/logo.svg" width="180px" align="center" alt="Squid" />
  </div>

  <h1 align="center">@squidit/vue-css</h1>
  <p align="center">This repository contains a Vue3 component library developed to facilitate the creation of consistent and elegant interfaces, following a custom style guide. The included components are highly customizable and designed to be reusable across a variety of Vue3 projects.</p>
</div>

## Welcome to Squid Design System

⚡ Get the experience by browsing one of [our platforms](https://app.squidit.com.br)!

This framework provides low level utilities and UI components for building
custom experiences.

&nbsp;

## Style

Our Design System can be seen [here](https://css.squidit.com.br/styleguide)

## Components

UI Components are currently offered as Vue3 (Web) components.

## Installation

1. Node version >= 18
2. To use this library in your Vue3 project, you can install it via npm or yarn:

```bash
npm install @squidit/css @squidit/vue-css
# or
yarn add @squidit/css @squidit/vue-css
```

3. Import CSS into your global style (`style.scss`):

```scss
$fontsFolderPath: '~@squidit/css/dist/fonts'; /* Overwrite default font path */
@import '~@squidit/css/src/scss/squid.scss'; /* Import all Framework Styles */
```

4. Use `VueCssPlugin` into your `main.ts`:

```typescript
import App from './App.vue'
import { createApp } from 'vue'
import VueCssPlugin from '@squidit/vue-css'
import './style.scss'

createApp(App).use(VueCssPlugin).mount('#app')
```

5. `vue-css` includes i18n in its own structure, if you want to use it, just pass the messages in the plugin options:

```typescript
const getProjectMessages = () => ({
  en: {test: 'Test'},
  es: {test: 'Prueba'},
  pt: {test: 'Teste'},
  de: {test: 'prüfen'},
})

app.use(VueCssPlugin, { messages: getProjectMessages() })
```

6. To control the language used:

```html
<script setup lang="ts">
import { t, changeLocale } from '@squidit/vue-css'

changeLocale('pt')

const test = t('test')
</script>

<template>
  {{ test }}
  {{ t('test') }}
</template>

<style scoped></style>
```

## How to Use

After installation, you can import and use the components as needed in your Vue3 components:

```html
<script setup lang="ts">
import { SqLoader } from '@squidit/vue-css'
</script>

<template>
  <SqLoader />
</template>

<style scoped></style>
```

## Customization

This library allows high flexibility and customization of the components. You can modify the default styles of the components using specific props or by overriding the styles via CSS.

## License

This project is licensed under the [MIT License](LICENSE).
