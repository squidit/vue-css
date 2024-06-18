<script lang="ts" setup>
import { onUnmounted, ref, StyleValue, watch } from 'vue'
import { SqWindowHelper } from '@helpers/index'

const sqWindowHelper = new SqWindowHelper()

const props = defineProps<{
  id?: string
  open?: boolean
  modalSize?: 'sm' | 'md' | 'lg' | 'xl' | ''
  modalClass?: string
  backdropClass?: string
  backdrop?: 'static' | 'clickable'
  buttonClose?: boolean
  headerPadding?: string
  bodyPadding?: string
  footerPadding?: string
  headerBackgroundColor?: string
  bodyBackgroundColor?: string
  footerBackgroundColor?: string
}>()

type Emits = {
  'modal-close': []
  'left-press': []
  'right-press': []
}

const emit = defineEmits<Emits>()

const _id = ref(props.id || `modal-random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`)
const modal = ref<HTMLElement>({} as HTMLElement)
const modals = ref<HTMLCollectionOf<Element>>()
const modalNumber = ref(0)
const scrollY = ref(sqWindowHelper.window()?.scrollY)

onUnmounted(() => {
  removeModalFromBody()
  document.removeEventListener('click', backdropClick)
})

watch(
  () => props.open,
  (open) => {
    const _modal = modal.value
    if (_modal) {
      const body = document.getElementsByTagName('body')[0]
      const backdrop = document.getElementById('modal-backdrop') || document.createElement('div')
      if (open) {
        scrollY.value = sqWindowHelper.window()?.scrollY
        body.appendChild(_modal)
        body.classList.add('block')
        _modal.style.display = 'flex'
        sqWindowHelper.window()?.addEventListener('keydown', onKeydown)
        modals.value = document.getElementsByClassName('modal open')
        modalNumber.value = modals.value?.length || 0
        document.addEventListener('click', backdropClick)
        if (modalNumber.value <= 1) {
          backdrop.setAttribute('id', 'modal-backdrop')
          backdrop.setAttribute('class', 'modal-backdrop show')
          body.appendChild(backdrop)
        } else if (modalNumber.value > 1) {
          _modal.style.zIndex = `${1060 + modalNumber.value + 1}`
          backdrop.setAttribute('style', `z-index: ${1060 + modalNumber.value};`)
        }
      } else {
        removeModalFromBody()
      }
    }
  },
)

const backdropClick = (event: Event) => {
  if (props?.open && modal.value && modal.value === event.target && props?.backdrop === 'clickable') {
    emit('modal-close')
  }
}

const removeModalFromBody = () => {
  const body = document.getElementsByTagName('body')[0]
  if (modalNumber.value <= 1) {
    body?.classList?.remove('block')
    if (sqWindowHelper.window()?.scrollY !== scrollY.value) {
      if (scrollY.value) sqWindowHelper.window()?.scrollTo(0, scrollY.value)
    }
  }
  const backdrop = document.getElementById('modal-backdrop')
  const modal = document.getElementById(_id.value)
  emit('modal-close')
  backdrop?.removeAttribute('style')
  modal?.parentNode?.removeChild(modal)
  if (modalNumber.value <= 1) {
    backdrop?.parentNode?.removeChild(backdrop)
  }
  sqWindowHelper.window()?.removeEventListener('keydown', onKeydown)
}

const onKeydown = (event: KeyboardEvent) => {
  if (props?.open) {
    modals.value = document.getElementsByClassName('modal')
    if (modals.value?.length === modalNumber.value) {
      events(event.key)
    }
  }
}

const events = (key: string) => {
  switch (key) {
    case 'Escape':
      emit('modal-close')
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
  <div class="modal align-items-center" :class="(props?.backdropClass, { open: props?.open })" :id="_id" ref="modal">
    <div class="modal-dialog" :class="(props?.modalClass, { [`modal-${props?.modalSize}`]: props?.modalSize })">
      <div class="modal-content modal-sq">
        <div
          class="modal-header"
          :class="{ 'without-header': !$slots.headerTemplate }"
          :style="
            {
              background: props?.headerBackgroundColor,
              padding: props?.headerPadding,
            } as StyleValue
          "
        >
          <slot v-if="$slots.headerTemplate" name="headerTemplate"></slot>
          <button v-if="props?.buttonClose" type="button" class="close button-close" aria-label="Close" @click="emit('modal-close')">
            <i class="fa-solid fa-xmark fa-lg"></i>
          </button>
        </div>

        <div
          class="modal-body scrollbar"
          :style="
            {
              background: props?.bodyBackgroundColor,
              padding: props?.bodyPadding,
            } as StyleValue
          "
        >
          <slot></slot>
        </div>

        <div
          v-if="$slots.footerTemplate"
          class="modal-footer"
          :style="
            {
              background: props?.footerBackgroundColor,
              padding: props?.footerPadding,
            } as StyleValue
          "
        >
          <slot name="footerTemplate"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &.need-priority {
    z-index: 1081;
  }
  .modal-sq {
    border-radius: 4px;
    .modal-header {
      display: flex;
      justify-content: space-between;
    }
    .without-header {
      padding: 0 0.08rem;
      border: none;
      justify-content: flex-end;
      button.close {
        z-index: 1;
        position: relative;
        top: 5px;
        left: -4px;
        margin: 0;
        padding: 0;
      }
    }
  }
}
</style>
