import type { Meta, StoryFn } from '@storybook/vue3'
import { SqSelectMultiTags } from '@components/index'

const meta: Meta<typeof SqSelectMultiTags> = {
  title: 'Components/SqSelectMultiTags',
  component: SqSelectMultiTags,
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
  },
}

export default meta

type Story = StoryFn<typeof SqSelectMultiTags>

export const Default: Story = (args) => ({
  components: { SqSelectMultiTags },
  setup() {
    return { args }
  },
  template: `
    <div style="height: 400px">
      <SqSelectMultiTags v-bind="args"/>
    </div>
  `,
})

Default.args = {
  label: 'Select',
  placeholder: 'Select',
  showInside: true,
  options: [
    {
      label: 'Option 1',
      value: '1',
      children: [
        {
          label: 'Option 1.1',
          value: '4',
        },
        {
          label: 'Option 1.2',
          value: '5',
        },
      ],
    },
    {
      label: 'Option 2',
      value: '2',
      children: [
        {
          label: 'Option 2.1',
          value: '6',
        },
      ],
    },
    {
      label: 'Option 3',
      value: '3',
    },
  ],
}
