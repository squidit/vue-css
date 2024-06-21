<script lang="ts" setup>
import { onUnmounted, ref, watch } from 'vue'
import { SqWindowHelper, SqSleep } from '@helpers/index'

const sqWindowHelper = new SqWindowHelper()

const props = defineProps<{
  id?: string
  open?: boolean
  overlayDirection?: 'right' | 'left'
  width?: string
  borderless?: boolean
  headerColor?: string
  headerItemsColor?: string
  footerColor?: string
  bodyColor?: string
  showClose?: boolean
  backdrop?: 'static' | 'clickable'
}>()

type Emits = {
  'overlay-close': []
  'left-press': []
  'right-press': []
}

const emit = defineEmits<Emits>()

const _id = ref(props?.id || `overlay-random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`)
const overlay = ref<HTMLElement>({} as HTMLElement)
const modals = ref<HTMLCollectionOf<Element>>()
const modalNumber = ref(0)
const styleId = ref(`overlay-style-random-id-${new Date().getTime()}-${Math.random().toString(36).substring(7)}`)
const finishOpening = ref(false)
const scrollY = ref(sqWindowHelper.window()?.scrollY)

onUnmounted(() => {
  removeOverlayFromBody()
})

watch(
  () => props.open,
  async (open) => {
    const _overlay = overlay.value
    if (_overlay) {
      const body = document.getElementsByTagName('body')[0]
      const backdrop = document.getElementById('modal-backdrop') || document.createElement('div')
      if (open) {
        scrollY.value = sqWindowHelper.window()?.scrollY
        body.appendChild(_overlay)
        doCssWidth()
        body.classList.add('block')
        _overlay.style.display = 'flex'
        sqWindowHelper.window()?.addEventListener('keydown', onKeydown)
        modals.value = document.getElementsByClassName('modal open')
        await SqSleep(10)
        modalNumber.value = modals.value?.length || 0
        document.addEventListener('click', backdropClick)
        if (modalNumber.value <= 1) {
          backdrop.setAttribute('id', 'modal-backdrop')
          backdrop.setAttribute('class', 'modal-backdrop show')
          body.appendChild(backdrop)
        } else if (modalNumber.value > 1) {
          _overlay.style.zIndex = `${1060 + modalNumber.value + 1}`
          backdrop.setAttribute('style', `z-index: ${1060 + modalNumber.value};`)
        }
        finishOpening.value = true
      } else {
        removeOverlayFromBody()
      }
    }
  },
)

watch(
  () => props.width,
  async () => {
    if (props?.open) {
      doCssWidth()
    }
  },
)

const backdropClick = (event: Event) => {
  if (props?.open && overlay.value && overlay.value === event.target && props?.backdrop === 'clickable') {
    emit('overlay-close')
  }
}

const removeOverlayFromBody = () => {
  const body = document.getElementsByTagName('body')[0]
  if (modalNumber.value <= 1) {
    body?.classList?.remove('block')
    if (window.scrollY !== scrollY.value) {
      if (scrollY.value) sqWindowHelper.window()?.scrollTo(0, scrollY.value)
    }
  }
  const backdrop = document.getElementById('modal-backdrop')
  const overlay = document.getElementById(_id.value)
  emit('overlay-close')
  finishOpening.value = false
  undoCssWidth()
  backdrop?.removeAttribute('style')
  overlay?.parentNode?.removeChild(overlay)
  if (modalNumber.value <= 1) {
    backdrop?.parentNode?.removeChild(backdrop)
  }
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', backdropClick)
}

const doCssWidth = () => {
  const css = `
    .overlay.open .modal-dialog.opened {
      width: ${props?.width || '475px'};
    }
  `
  const head = document.getElementsByTagName('head')[0]
  let style = document.getElementById(styleId.value)
  if (!style) {
    style = document.createElement('style')
    style.setAttribute('id', styleId.value)
    style.appendChild(document.createTextNode(css))
    head.appendChild(style)
  } else {
    style.innerHTML = ''
    style.appendChild(document.createTextNode(css))
  }
}

const undoCssWidth = () => {
  const style = document.getElementById(styleId.value)
  if (style?.parentNode) {
    style.parentNode.removeChild(style)
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (props?.open) {
    modals.value = document.getElementsByClassName('modal open')
    if (modals.value?.length === modalNumber.value) {
      events(event.key)
    }
  }
}

const events = (key: string) => {
  switch (key) {
    case 'Escape':
      emit('overlay-close')
      break
    case 'ArrowLeft':
      emit('left-press')
      break
    case 'ArrowRight':
      emit('right-press')
      break
  }
}
</script>

<template>
  <div :id="_id" class="modal overlay" :class="[props.overlayDirection || 'right', { open: props?.open }]" ref="overlay">
    <div
      class="modal-dialog"
      :class="[props.overlayDirection || 'right', { opened: finishOpening }]"
      :style="{ backgroundColor: props?.headerColor }"
    >
      <div class="modal-content scrollbar">
        <div
          class="modal-header"
          :class="{
            'without-header': !$slots.headerTemplate,
            borderless: props?.borderless,
          }"
          :style="{
            backgroundColor: props?.headerColor || 'var(--background_secondary)',
          }"
        >
          <slot v-if="$slots.headerTemplate" name="headerTemplate"></slot>

          <button
            v-if="props?.showClose"
            id="close-button"
            type="button"
            class="close button-close"
            aria-label="Close"
            @click="emit('overlay-close')"
          >
            <i class="fa-solid fa-xmark" :style="{ color: props?.headerItemsColor }" />
          </button>
        </div>

        <div
          class="modal-body scrollbar"
          :class="{
            'without-footer': !$slots.footerTemplate,
          }"
          :style="{
            backgroundColor: props?.bodyColor || 'var(--background_secondary)',
          }"
        >
          <slot></slot>
        </div>

        <div
          class="modal-footer"
          v-if="$slots.footerTemplate"
          :class="{
            borderless: props?.borderless,
          }"
          :style="{
            backgroundColor: props?.footerColor || 'var(--background_secondary)',
          }"
        >
          <slot v-if="$slots.footerTemplate" name="footerTemplate"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overlay {
  padding: 0;
  border-radius: 0px;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
  .modal-dialog {
    width: 300px;
    max-width: 100vw;
    height: 100%;
    margin: 0;
    position: fixed;
    transition:
      opacity 0.3s linear,
      left 0.3s ease-out,
      right 0.3s ease-out,
      width 0.3s ease-out,
      height 0.3s ease-out !important;
    transform: translate3d(0%, 0, 0) !important;
    .modal-content {
      height: 100%;
      border-radius: 0;
      overflow-y: auto;
      border: none;
      background-color: transparent;
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        border-radius: 0;
        overflow: hidden;
        padding: 1rem 2rem;
        &.without-header {
          padding: 0 0.08rem;
          border: none;
          justify-content: flex-end;
          .button-close {
            margin: 0;
            padding: 0;
          }
        }
        .button-close {
          max-height: 30px;
          line-height: 30px;
          opacity: 0.7 !important;
          transition: var(--transition);
          z-index: 1;
          span {
            font-size: 2.1rem;
            font-weight: 300;
            transition: var(--transition);
          }
          &:hover,
          &:focus {
            outline: none;

            span {
              font-weight: 500;
            }
          }
        }
      }
      .modal-body {
        height: calc(100vh - 112px);
        padding: 2rem;
        overflow-y: auto;
        overflow-x: hidden;
        &.without-footer {
          height: calc(100vh - 52px);
        }
      }
      .modal-footer {
        height: 60px;
        border-radius: 0;
        overflow: hidden;
        padding: 0.5rem 2rem;
      }
      .modal-footer > * {
        margin: 0;
      }
      .borderless {
        border-color: transparent;
      }
    }
  }
}
</style>
