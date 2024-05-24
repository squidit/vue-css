import type { Meta, StoryFn } from '@storybook/vue3'
import { Loader } from '../index'

/** This component is a loader */
const meta: Meta<typeof Loader> = {
  title: 'Components/SqLoader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['', 'small', 'bigger', 'big'],
    },
  },
}

export default meta

type Story = StoryFn<typeof Loader>

export const Default: Story = (args) => ({
  components: { Loader },
  setup() {
    return { args }
  },
  template: '<Loader :color="args.color" :size="args.size" :customSize="args.customSize" :borderSize="args.borderSize"/>',
})

Default.args = {
  color: '',
  size: '',
  customSize: '',
  borderSize: '',
}
