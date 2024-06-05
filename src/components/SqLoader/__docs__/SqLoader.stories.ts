import type { Meta, StoryFn } from '@storybook/vue3'
import { SqLoader } from '@components/index'

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
  template: `
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <SqLoader v-bind="args"/>
    </div>
  `,
})
