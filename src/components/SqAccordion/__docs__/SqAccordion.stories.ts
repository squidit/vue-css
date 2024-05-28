import type { Meta, StoryFn } from '@storybook/vue3'
import { SqAccordion } from '../index'
import { SqCollapse } from '../../index'

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
    <SqAccordion :onlyOne="args.onlyOne" :openFirst="args.openFirst">
      <SqCollapse
        :open="false"
        color="var(--pink)"
        colorIcons="var(--background)"
        >
        <template #header>
          <span :style="{ color: 'var(--background)' }">Title 1</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
      <SqCollapse
        :open="false"
        color="var(--lilac)"
        colorIcons="var(--background)"
        >
        <template #header>
          <span :style="{ color: 'var(--background)' }">Title 2</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
      <SqCollapse
        :open="false"
        color="var(--cian)"
        colorIcons="var(--background)"
        >
        <template #header>
          <span :style="{ color: 'var(--background)' }">Title 3</span>
        </template>
        <div>Content HTML</div>
      </SqCollapse>
    </SqAccordion>
  `,
})

Default.args = {
  onlyOne: false,
  openFirst: false,
}
