import type { Meta, StoryFn } from '@storybook/vue3'
import { SqTooltip } from '@components/index'

const meta: Meta<typeof SqTooltip> = {
  title: 'Components/SqTooltip',
  component: SqTooltip,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'radio',
      options: [
        'left top',
        'left center',
        'left bottom',
        'center top',
        'center center',
        'center bottom',
        'right top',
        'right center',
        'right bottom',
      ],
    },
    trigger: {
      control: 'radio',
      options: ['hover', 'click'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqTooltip>

export const Default: Story = (args) => ({
  components: { SqTooltip },
  setup() {
    return { args }
  },
  template: `
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <SqTooltip v-bind="args"/>
    </div>
  `,
})

Default.args = {
  message: 'This is a tooltip',
}
