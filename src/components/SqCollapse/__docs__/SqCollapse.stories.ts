import type { Meta, StoryFn } from '@storybook/vue3'
import { SqCollapse } from '@components/index'

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
    <SqCollapse v-bind="args">
      <template #header>
        <span :style="{ color: 'var(--background)' }">Title 1</span>
      </template>
      <div>Content HTML</div>
    </SqCollapse>
  `,
})

Default.args = {
  color: '#e41b6e',
  iconsColor: '#22262a',
}
