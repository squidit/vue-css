import type { Meta, StoryFn } from '@storybook/vue3'
import { SqButton } from '@components/index'

const meta: Meta<typeof SqButton> = {
  title: 'Components/SqButton',
  component: SqButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['submit', 'reset', 'button'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqButton>

export const Default: Story = (args) => ({
  components: { SqButton },
  setup() {
    return { args }
  },
  template: `
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <SqButton v-bind="args">
        Click me
      </SqButton>
    </div>
  `,
})

Default.args = {
  color: '#e41b6e',
  borderColor: '#e41b6e',
}
