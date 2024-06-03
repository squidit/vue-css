<script lang="ts" setup>
import { getCurrentInstance, inject, ref, onMounted, ComponentInternalInstance } from 'vue'
import { SqColorsHelper } from '../../helpers/index'
import { SqLoader } from '../index'

const sqColorsHelper = new SqColorsHelper()

const props = defineProps<{
  open?: boolean
  loading?: boolean
  disabled?: boolean
  color?: string
  iconsColor?: string
  backgroundIconColor?: string
  fontSizeIcon?: string
  heightIcon?: string
  noPadding?: boolean
  customClass?: string
}>()

type Emits = {
  'opened-emitter': [open: boolean, element?: HTMLDivElement]
}

const emit = defineEmits<Emits>()

const instance = getCurrentInstance()

const open = ref(props?.open)

const opening = ref<boolean | string>(false)

const timeout = ref<ReturnType<typeof setTimeout>>()

const hoverHeader = ref(false)
const hoverIcon = ref(false)

const element = ref<HTMLDivElement>()
const content = ref<HTMLDivElement>()
const wrapper = ref<HTMLDivElement>()

onMounted(() => {
  emitRegister()
  element.value?.focus()
  content.value?.focus()
  wrapper.value?.focus()
})

const parentRegister = inject<(child: ComponentInternalInstance) => void>('parentRegister')

const emitRegister = () => {
  if (parentRegister && instance) {
    parentRegister(instance)
  }
}

const toggleCollapse = (emit = false) => {
  if (!props?.disabled && !props?.loading && !opening.value) {
    opening.value = wrapper.value?.clientHeight + 'px'
    clearTimeout(timeout.value)
    timeout.value = setTimeout(() => {
      opening.value = false
      open.value = !open.value
      if (emit) {
        emitRegister()
      }
    }, 150)
  }
}

const setHover = (color?: string) => {
  return sqColorsHelper?.lightenDarkenColor(sqColorsHelper?.getCssVariableValue(color || ''), -25)
}

defineExpose({
  toggleCollapse,
})
</script>

<template>
  <div class="wrapper-collapse" :class="props?.customClass">
    <header
      class="header-collapse"
      :class="{
        disabled: props?.disabled,
        loading: props?.loading,
        'not-header': !$slots.header,
        opened: open,
        'p-0': props?.noPadding,
      }"
      :style="{
        backgroundColor: hoverHeader ? setHover(props?.color) : props?.color,
        borderColor: hoverHeader ? setHover(props?.color) : props?.color,
      }"
      @click="emit('opened-emitter', !open, element), toggleCollapse(true)"
      @mouseover="hoverHeader = true"
      @mouseleave="hoverHeader = false"
      ref="element"
    >
      <span class="html" v-if="$slots.header">
        <slot name="header"></slot>
      </span>
      <div
        class="wrapper-icons"
        :style="{
          color: props?.iconsColor,
          backgroundColor: hoverIcon ? setHover(props?.backgroundIconColor) : props?.backgroundIconColor,
          fontSize: props?.fontSizeIcon,
          height: props?.heightIcon,
          lineHeight: props?.heightIcon,
        }"
        @mouseover="hoverIcon = true"
        @mouseleave="hoverIcon = false"
      >
        <i
          v-if="!props?.loading"
          class="fa-solid fa-chevron-down icon"
          :class="{
            'fa-rotate-180': !props?.disabled && open,
          }"
        ></i>
        <div v-if="props?.loading" class="display-flex justify-content-center align-items-center" style="height: 100%">
          <SqLoader color="inherit"></SqLoader>
        </div>
      </div>
    </header>
    <div
      class="content animated scrollbar"
      :class="{
        open: open && !props?.disabled && !props?.loading,
        disabled: props?.disabled,
        loading: props?.loading,
        opening: opening,
      }"
      :style="{
        height: typeof opening === 'string' ? opening : '',
      }"
      ref="content"
    >
      <div ref="wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-collapse {
  display: block;
  margin: 0.35rem auto;
  .header-collapse {
    display: flex;
    align-items: stretch;
    border-radius: 5px;
    padding: 0.7rem 1.1rem;
    background: var(--lilac_light);
    transition: var(--transition);
    &:hover,
    &:focus {
      background: var(--cian);
    }
    &.p-0 {
      padding: 0;
    }
    span.html {
      cursor: pointer;
      display: inline-block;
      width: calc(100% - 50px);
      font-size: 1.1rem;
      font-weight: 300;
      transition: var(--transition);
      margin: 0 1.1rem 0 0;
      line-height: 25px;
    }
    .wrapper-icons {
      cursor: pointer;
      padding: 0;
      margin: 0;
      font-size: 1.1rem;
      width: 45px;
      height: 25px;
      line-height: 25px;
      transition: var(--transition);
      position: relative;
      overflow: hidden;
      border-radius: 5px;
      .icon {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
        &.spinner-border {
          color: inherit;
          position: relative;
          top: -3px;
          width: 17px;
          height: 17px;
        }
      }
    }
    &.disabled,
    &.disabled:hover,
    &.disabled:focus {
      color: var(--color_text-icon_neutral_disabled) !important;
      border-color: var(--color_border_input_disabled) !important;
      background: var(--color_bg_input_disabled) !important;
      span.html {
        cursor: not-allowed;
        color: var(--color_text-icon_neutral_disabled) !important;
      }
      .wrapper-icons {
        cursor: not-allowed;
        background: var(--color_bg_input_disabled) !important;
      }
    }
    sq-loader {
      display: inline-block;
    }
    &.loading {
      .wrapper-icons,
      span.html {
        cursor: wait;
      }
    }
    &.not-header {
      width: 100%;
      padding: 0.35rem;
      display: inline-block;
      text-align: center;
      span.html {
        width: calc(100% - 50px);
      }
      .wrapper-icons {
        line-height: 35px;
      }
    }
  }
  .content {
    border-radius: 5px;
    margin: 0;
    transition: all 0.5s ease;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    position: relative;
    &.opening {
      visibility: visible;
      margin: 0 auto;
    }
    &.open {
      margin: 0 auto;
      height: auto;
      visibility: visible;
      overflow-y: auto;
    }
    &.loading,
    &.disabled {
      height: 0 !important;
      max-height: 0;
      opacity: 0;
      margin: 0;
      visibility: hidden;
    }
  }
}
</style>
