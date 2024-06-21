import type { Meta, StoryFn } from '@storybook/vue3'
import { SqSelector } from '@components/index'

const meta: Meta<typeof SqSelector> = {
  title: 'Components/SqSelector',
  component: SqSelector,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['checkbox', 'radio'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqSelector>

export const Default: Story = (args) => ({
  components: { SqSelector },
  setup() {
    return { args }
  },
  template: `
    <div class="display-flex justify-content-center">
      <SqSelector v-bind="args"/>
    </div>
  `,
})

Default.args = {
  name: 'sq-selector',
  id: 'sq-selector',
  label: 'Select',
}
