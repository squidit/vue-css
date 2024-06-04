import type { Meta, StoryFn } from '@storybook/vue3'
import { SqCollapse } from '../index'

const meta: Meta<typeof SqCollapse> = {
  title: 'Components/SqCollapse',
  component: SqCollapse,
  tags: ['autodocs'],
}

export default meta

type Story = StoryFn<typeof SqCollapse>

export const Default: Story = (args) => ({
  components: { SqCollapse },
  setup() {
    return { args }
  },
  template: `
    <SqCollapse
      :open="args.open"
      :color="args.color"
      :loading="args.loading"
      :disabled="args.disabled"
      :icons-color="args.iconsColor"
      :background-icon-color="args.backgroundIconColor"
      :font-size-icon="args.fontSizeIcon"
      :height-icon="args.heightIcon"
      :no-padding="args.noPadding"
      :custom-class="args.customClass"
      @opened-emitter="() => console.log('Collapse clicked')"
    >
      <template #header>
        <span :style="{ color: 'var(--background)' }">Title 1</span>
      </template>
      <div>Content HTML</div>
    </SqCollapse>
  `,
})

Default.args = {
  open: false,
  color: 'var(--pink)',
  loading: false,
  disabled: false,
  iconsColor: 'var(--background)',
  backgroundIconColor: '',
  fontSizeIcon: '',
  heightIcon: '',
  noPadding: false,
  customClass: '',
}
