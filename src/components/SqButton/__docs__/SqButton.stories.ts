import type { Meta, StoryFn } from '@storybook/vue3'
import { SqButton } from '../index'

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
      <SqButton
        :type="args.type"
        :color="args.color"
        :text-color="args.textColor"
        :border-color="args.borderColor"
        :border-style="args.borderStyle"
        :text-transform="args.textTransform"
        :border-width="args.borderWidth"
        :border-radius="args.borderRadius"
        :size="args.size"
        :font-size="args.fontSize"
        :loading="args.loading"
        :disabled="args.disabled"
        :block="args.block"
        :no-padding="args.noPadding"
        :id="args.id"
        :button-as-link="args.buttonAsLink"
        :hide-on-loading="args.hideOnLoading"
        :inverted-hover="args.invertedHover"
        :no-under-line="args.noUnderline"
        :box-shadow="args.boxShadow"
        :width="args.width"
        @click-emitter="() => console.log('Button clicked')"
      >
        Click me
      </SqButton>
    </div>
  `,
})

Default.args = {
  type: 'button',
  color: 'var(--pink)',
  textColor: '',
  borderColor: 'var(--pink)',
  borderStyle: '',
  textTransform: '',
  borderWidth: '',
  borderRadius: '',
  size: 'md',
  fontSize: '',
  loading: false,
  disabled: false,
  block: false,
  noPadding: false,
  id: '',
  buttonAsLink: false,
  hideOnLoading: false,
  invertedHover: false,
  noUnderline: false,
  boxShadow: '',
  width: '',
}
