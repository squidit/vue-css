import type { Meta, StoryFn } from '@storybook/vue3'
import { SqModal, SqButton } from '@components/index'
import { ref, watch } from 'vue'

const meta: Meta<typeof SqModal> = {
  title: 'Components/SqModal',
  component: SqModal,
  tags: ['autodocs'],
  argTypes: {
    modalSize: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl', ''],
    },
    backdrop: {
      control: 'radio',
      options: ['static', 'clickable'],
    },
  },
}

export default meta

type Story = StoryFn<typeof SqModal>

export const Default: Story = (args) => ({
  components: { SqModal, SqButton },
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
        Open Modal
      </SqButton>
    </div>
    <SqModal v-bind="args" :open="open" @modal-close="open = false">
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
    </SqModal>
  `,
})

Default.args = {
  buttonClose: true,
}
