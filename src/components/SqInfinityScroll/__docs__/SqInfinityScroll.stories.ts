import type { Meta, StoryFn } from '@storybook/vue3'
import { ref } from 'vue'
import { SqInfinityScroll } from '@components/index'

const LOREN_IPSUM =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit nullam vivamus nunc, mattis integer ut conubia aliquam vehicula euismod curae phasellus, lectus porttitor libero quisque malesuada fringilla parturient fames bibendum. Vitae duis proin semper netus vulputate commodo vel egestas fermentum pretium luctus consequat ornare, purus nunc ante porta pulvinar habitasse suscipit aliquet donec cubilia ultrices risus malesuada, torquent primis at fringilla cras himenaeos ac viverra rhoncus ut bibendum arcu.'

const meta: Meta<typeof SqInfinityScroll> = {
  title: 'Components/SqInfinityScroll',
  component: SqInfinityScroll,
  tags: ['autodocs'],
}

export default meta

type Story = StoryFn<typeof SqInfinityScroll>

export const Default: Story = (args) => ({
  components: { SqInfinityScroll },
  setup() {
    const contents = ref([LOREN_IPSUM])
    const loading = ref(false)
    const hasMore = ref(true)

    const onLoadMore = () => {
      loading.value = true
      setTimeout(() => {
        contents.value = [...contents.value, LOREN_IPSUM]
        if (contents.value.length === 4) {
          hasMore.value = false
        }
        loading.value = false
      }, 2000)
    }

    return { args, contents, loading, hasMore, onLoadMore }
  },
  template: `
    <div id="element-to-scroll" class="scrollbar" :style="{ maxHeight: '80px', overflow: 'hidden auto' }">
      <SqInfinityScroll 
        v-bind="args" 
        :loading="loading" 
        :hasMore="hasMore"
        :length="contents.length"
        elementToScrollId="element-to-scroll"
        @scrolled-emitter="onLoadMore"
      >
        <div v-for="content in contents">{{ content }}</div>
      </SqInfinityScroll>
    </div>
  `,
})
