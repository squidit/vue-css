<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { SqLoader } from '@components/index'
import { SqWindowHelper } from '@helpers/index'

const sqWindowHelper = new SqWindowHelper()

const props = defineProps<{
  length?: number
  endMessage?: string
  hasMore?: boolean
  loading?: boolean
  loaderColor?: string
  elementToScrollId?: string
}>()

type Emits = {
  'scrolled-emitter': []
}

const emit = defineEmits<Emits>()

const scroll = ref<HTMLElement>({} as HTMLElement)

const elementToScroll = ref<HTMLElement | null | (Window & typeof globalThis)>()

onMounted(() => {
  if (props?.elementToScrollId) {
    elementToScroll.value = document.getElementById(props?.elementToScrollId)
  }

  if (!props?.elementToScrollId || !elementToScroll.value) {
    elementToScroll.value = sqWindowHelper.window()
  }
  elementToScroll.value?.addEventListener('scroll', onScroll, false)

  if (
    props?.elementToScrollId &&
    elementToScroll.value &&
    elementToScroll.value instanceof HTMLElement &&
    typeof elementToScroll.value.getAttribute === 'undefined'
  ) {
    const element = document.getElementById(props?.elementToScrollId)
    if (element) {
      elementToScroll.value.removeEventListener('scroll', onScroll, false)
      element.addEventListener('scroll', onScroll, false)
      elementToScroll.value = element
    }
  }
})

onUnmounted(() => {
  elementToScroll.value?.removeEventListener('scroll', onScroll, false)
})

const onScroll = () => {
  if (!props?.loading && (props?.length ?? 0) > 0 && props?.hasMore) {
    if (props?.elementToScrollId && elementToScroll.value instanceof HTMLElement) {
      const allScroll = elementToScroll?.value?.scrollTop + elementToScroll?.value?.scrollHeight
      if (allScroll >= elementToScroll?.value?.scrollHeight) {
        elementToScroll?.value?.removeEventListener('scroll', onScroll, false)
        emit('scrolled-emitter')
        elementToScroll?.value?.addEventListener('scroll', onScroll, false)
      }
    } else if (elementToScroll.value instanceof Window) {
      const elementHeight = elementToScroll?.value?.innerHeight
      const elementY = elementToScroll?.value?.scrollY
      if (elementHeight + elementY >= scroll.value?.offsetHeight + scroll.value?.offsetTop) {
        elementToScroll?.value?.removeEventListener('scroll', onScroll, false)
        emit('scrolled-emitter')
        elementToScroll?.value?.addEventListener('scroll', onScroll, false)
      }
    }
  }
}
</script>

<template>
  <div ref="scroll" class="scroll">
    <slot></slot>
    <div v-if="props?.loading" class="display-flex justify-content-center">
      <SqLoader :color="props?.loaderColor"></SqLoader>
    </div>
    <div class="wrapper-message" v-if="!props?.hasMore && props?.endMessage">
      <p>
        {{ props?.endMessage }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scroll {
  width: 100%;
  height: auto;
  .wrapper-message {
    p {
      text-align: center;
      font-size: 0.86rem;
      margin: 1.1rem auto;
    }
  }
}
</style>
