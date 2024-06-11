import type { Meta, StoryFn } from '@storybook/vue3'
import { SqInput } from '@components/index'

const meta: Meta<typeof SqInput> = {
  title: 'Components/SqInput',
  component: SqInput,
  tags: ['autodocs'],
  argTypes: {
    tooltipPlacement: {
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
    type: {
      control: 'radio',
      options: ['text', 'email', 'hidden', 'password', 'tel', 'url', 'file'],
    },
    inputMode: {
      control: 'radio',
      options: ['none', 'text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqInput>

export const Default: Story = (args) => ({
  components: { SqInput },
  setup() {
    return { args }
  },
  template: `
    <SqInput v-bind="args" />
  `,
})

Default.args = {
  label: 'E-mail',
  placeholder: 'Your e-mail',
  errorSpan: true,
}
