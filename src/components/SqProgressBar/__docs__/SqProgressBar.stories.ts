import type { Meta, StoryFn } from '@storybook/vue3'
import { SqProgressBar } from '@components/index'

const meta: Meta<typeof SqProgressBar> = {
  title: 'Components/SqProgressBar',
  component: SqProgressBar,
  tags: ['autodocs'],
}

export default meta

type Story = StoryFn<typeof SqProgressBar>

export const Default: Story = (args) => ({
  components: { SqProgressBar },
  setup() {
    return { args }
  },
  template: '<SqProgressBar v-bind="args"/>',
})
