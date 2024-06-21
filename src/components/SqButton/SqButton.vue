<script lang="ts" setup>
import { ref, StyleValue } from 'vue'
import { SqLoader } from '@components/index'
import { SqColorsHelper } from '@helpers/index'

const sqColorsHelper = new SqColorsHelper()

const props = defineProps<{
  type?: 'submit' | 'reset' | 'button'
  color?: string
  textColor?: string
  borderColor?: string
  borderStyle?: string
  textTransform?: string
  borderWidth?: string
  borderRadius?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fontSize?: string
  loading?: boolean
  disabled?: boolean
  block?: boolean
  noPadding?: boolean
  id?: string
  buttonAsLink?: boolean
  hideOnLoading?: boolean
  invertedHover?: boolean
  noUnderline?: boolean
  boxShadow?: string
  width?: string
}>()

type Emits = {
  'click-emitter': [event: MouseEvent]
}

const emit = defineEmits<Emits>()

const hover = ref(false)

const validatePresetColors = () => {
  if (
    !props.color?.startsWith('var(--') &&
    !props.color?.startsWith('#') &&
    !props.color?.startsWith('rgb') &&
    !props.color?.startsWith('hsl') &&
    !props.color?.startsWith('transparent')
  ) {
    return !!sqColorsHelper?.getCssVariableValue(props.color || '')
  }
  return false
}

const doHoverOnText = () => {
  if (hover.value) {
    return setHoverText()
  }
  return props.textColor
}

const doHoverOnBackground = () => {
  if (hover.value) {
    return setHoverBg()
  }
  return props.color
}

const doHoverOnBorder = () => {
  if (hover.value) {
    return setHover(props.borderColor || props.textColor || '')
  }
  return props.borderColor || props.textColor || ''
}

const doHoverAction = (type: 'text' | 'background' | 'border') => {
  if (validatePresetColors()) {
    return ''
  }

  switch (type) {
    case 'text':
      return doHoverOnText()
    case 'background':
      return doHoverOnBackground()
    case 'border':
      return doHoverOnBorder()
    default:
      return ''
  }
}

const setHover = (color: string) => {
  return sqColorsHelper?.lightenDarkenColor(sqColorsHelper?.getCssVariableValue(color), -25)
}

const setHoverBg = () => {
  if (props.invertedHover) {
    return setHover(props.textColor !== 'transparent' ? props.textColor || '' : 'var(--text_color)')
  }
  return setHover(props.color && props.color !== 'transparent' ? props.color : 'var(--color_bg_button_inverse-hover)')
}

const setHoverText = () => {
  if (props.invertedHover) {
    return setHover(props.color && props.color !== 'transparent' ? props.color : 'var(--color_bg_button_inverse-hover)')
  }
  return setHover(props.textColor !== 'transparent' ? props.textColor || '' : 'var(--text_color)')
}

const executeFunction = (event: MouseEvent) => {
  if (!props.loading && !props.disabled) {
    emit('click-emitter', event)
  }
}
</script>

<template>
  <button
    class="button"
    :class="{
      [`button-${props?.color}`]: props?.color,
      [`button-${props?.size || 'md'}`]: props?.size || 'md',
      disabled: props?.disabled,
      loading: props?.loading,
      block: props?.block,
      'p-0': props?.noPadding,
      'button-as-link': props?.buttonAsLink,
      'no-underline': props?.noUnderline,
      inverted: props?.invertedHover,
    }"
    :id="id"
    :type="props?.type || 'button'"
    :disabled="props?.disabled"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @click="executeFunction($event)"
    :style="
      {
        fontSize: props?.fontSize,
        color: doHoverAction('text'),
        backgroundColor: doHoverAction('background'),
        borderColor: doHoverAction('border'),
        borderStyle: props?.borderStyle,
        borderRadius: props?.borderRadius,
        borderWidth: props?.borderWidth,
        boxShadow: props?.boxShadow,
        width: props?.width,
        textTransform: props?.textTransform,
      } as StyleValue
    "
  >
    <slot v-if="!props?.hideOnLoading || (props?.hideOnLoading && !props?.loading)"></slot>
    <SqLoader
      v-if="props?.loading"
      :class="{ 'hide-on-loading': props?.hideOnLoading }"
      custom-size="1rem"
      :color="props?.textColor"
    ></SqLoader>
  </button>
</template>

<style lang="scss" scoped>
.button {
  &.p-0 {
    padding: 0;
  }
  &.block {
    width: 100%;
  }
  &.button-as-link {
    border-style: none !important;
    background-color: transparent !important;
    text-decoration: underline;
    color: initial !important;
    white-space: nowrap;
    text-transform: none;
  }
  &.no-underline {
    text-decoration: none;
  }
}
</style>
