<script lang="ts" setup>
import { ref } from 'vue'
import Loader from '@/components/loader/Loader.vue'

// Import Classes
import ColorsHelper from '@/helpers/colors.helper'
const colorsHelper = new ColorsHelper()

// Props
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset' | undefined
  disabled?: boolean
  loading?: boolean
  inverted?: boolean
  backgroundColor?: string
  fontSize?: string | undefined
  borderColor?: string
  textColor?: string
  id?: string
}>()

// Events
const emit = defineEmits<{
  (e: 'emitClick'): void
  (e: 'emitHover', hover: boolean): void
}>()

// Local Variables
const timeStamp = `button-random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`
const styleObject = ref({
  color: props.textColor,
  borderColor: props.borderColor || props.textColor,
  backgroundColor: props.backgroundColor,
  fontSize: props.fontSize,
})

// Methods
function setHover(color?: string): string {
  if (!color) {
    return ''
  }
  return colorsHelper?.lightenDarkenColor(colorsHelper?.getCssVariableValue(color), -25)
}

function setHoverBg(): string {
  if (props.inverted) {
    return setHover(props.textColor)
  }
  return setHover(props.backgroundColor)
}

function setHoverText(): string {
  if (props.inverted) {
    return setHover(props.backgroundColor !== 'transparent' ? props.backgroundColor : 'var(--white-html)')
  }
  return setHover(props.textColor !== 'transparent' ? props.textColor : 'var(--white-html)')
}

function doHover(hover = true): void {
  if (hover) {
    styleObject.value = {
      color: setHoverText(),
      borderColor: setHover(props.borderColor || props.textColor),
      backgroundColor: setHoverBg(),
      fontSize: props.fontSize,
    }
    emit('emitHover', true)
  } else {
    styleObject.value = {
      color: props.textColor,
      borderColor: props.borderColor || props.textColor,
      backgroundColor: props.backgroundColor,
      fontSize: props.fontSize,
    }
    emit('emitHover', false)
  }
}

function onClick(): void {
  if (!props.disabled && !props.loading) {
    emit('emitClick')
  }
}
</script>

<template>
  <button
    :id="id || timeStamp"
    :type="type || 'button'"
    :disabled="disabled"
    class="button"
    :class="{
      disabled: props.disabled,
      inverted: props.inverted,
      loading: props.loading,
    }"
    :style="styleObject"
    @click="onClick()"
    @mouseover="doHover(true)"
    @mouseleave="doHover(false)"
  >
    <slot />
    <span class="wrapper-loader" v-if="loading">
      <Loader class="small" :color="'inherit'" />
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  &.loading {
    cursor: wait;
    &:hover,
    &:focus {
      border-color: transparent !important;
    }
  }
  .wrapper-loader {
    border-color: inherit;
    margin-left: 0.5rem;
  }
}
</style>
