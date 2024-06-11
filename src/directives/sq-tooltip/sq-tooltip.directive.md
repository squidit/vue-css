# SqTooltip Directive

Directive to easily add tooltips to a element.

## Setup

In your main.ts file you need to add: ".directive('tooltip', tooltip)", as in the example below

```typescript
import { createApp } from 'vue'
import App from '@src/App.vue'
import { tooltip } from '@squidit/vue-css'

createApp(App).directive('tooltip', tooltip).mount('#app')
```


## Example Usage

```html
<div v-tooltip="'This is a Tooltip'"></div>
```
