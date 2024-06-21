import type { Meta, StoryFn } from '@storybook/vue3'
import { SqOverlay, SqButton } from '@components/index'
import { ref, watch } from 'vue'

const meta: Meta<typeof SqOverlay> = {
  title: 'Components/SqOverlay',
  component: SqOverlay,
  tags: ['autodocs'],
  argTypes: {
    overlayDirection: {
      control: 'radio',
      options: ['right', 'left'],
    },
    backdrop: {
      control: 'radio',
      options: ['static', 'clickable'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqOverlay>

export const Default: Story = (args) => ({
  components: { SqOverlay, SqButton },
  setup() {
    const open = ref(false)
    watch(args, (value) => {
      if (value?.open && value.open !== open.value) {
        open.value = value.open
      }
    })
    return { args, open }
  },
  template: `
    <div :style="{ display: 'flex', justifyContent: 'center' }">
      <SqButton 
        color="var(--pink)" 
        borderColor="var(--pink)" 
        @click-emitter="open = true" 
      >
        Open Overlay
      </SqButton>
    </div>
    <SqOverlay v-bind="args" :open="open" @overlay-close="open = false">
      <template #headerTemplate>
        Title
      </template>
      <div class="p-3">
        Content
      </div>
      <template #footerTemplate>
        <div :style="{ width: '100%', display: 'flex', justifyContent: 'space-between' }">
          <SqButton
            color="transparent"
            borderColor="var(--pink)"
            textColor="var(--pink)"
            @click-emitter="open = false"
          >
            Cancel
          </SqButton>
          <SqButton 
            color="var(--pink)" 
            borderColor="var(--pink)" 
          >
            Confirm
          </SqButton>
        </div>
      </template>
    </SqOverlay>
  `,
})

Default.args = {
  showClose: true,
}
