import type { Meta, StoryFn } from '@storybook/vue3'
import { SqLoader } from '../index'

const meta: Meta<typeof SqLoader> = {
  title: 'Components/SqLoader',
  component: SqLoader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['', 'small', 'bigger', 'big'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqLoader>

export const Default: Story = (args) => ({
  components: { SqLoader },
  setup() {
    return { args }
  },
  template: '<SqLoader :color="args.color" :size="args.size" :customSize="args.customSize" :borderSize="args.borderSize"/>',
})

Default.args = {
  color: '',
  size: '',
  customSize: '',
  borderSize: '',
}
