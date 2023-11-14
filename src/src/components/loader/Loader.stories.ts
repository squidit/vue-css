import { action } from '@storybook/addon-actions'
import Loader from './Loader.vue'

export default {
  title: 'Loader',
  excludeStories: /.*Data$/,
}

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask'),
}

export const loaderData = {
  title: 'Loader',
}

const loaderTemplate = `<loader />`

export const Default = () => ({
  components: { Loader },
  template: loaderTemplate,
  props: {
    task: {
      default: () => loaderData,
    },
  },
  methods: actionsData,
})