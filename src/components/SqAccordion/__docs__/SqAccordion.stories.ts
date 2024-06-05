import type { Meta, StoryFn } from '@storybook/vue3'
import { SqAccordion, SqCollapse } from '@components/index'

const meta: Meta<typeof SqAccordion> = {
  title: 'Components/SqAccordion',
  component: SqAccordion,
  tags: ['autodocs'],
}

export default meta

type Story = StoryFn<typeof SqAccordion>

export const Default: Story = (args) => ({
  components: { SqAccordion, SqCollapse },
  setup() {
    return { args }
  },
  template: `
    <SqAccordion v-bind="args">
      <SqCollapse
        :open="false"
        color="#e41b6e"
        icons-color="#22262a"
      >
        <template #header>
          <span :style="{ color: '#22262a' }">Title 1</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
      <SqCollapse
        :open="false"
        color="#930df2"
        icons-color="#22262a"
      >
        <template #header>
          <span :style="{ color: '#22262a' }">Title 2</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
      <SqCollapse
        :open="false"
        color="#38b8c7"
        icons-color="#22262a"
      >
        <template #header>
          <span :style="{ color: '#22262a' }">Title 3</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
    </SqAccordion>
  `,
})
