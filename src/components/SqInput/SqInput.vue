<script lang="ts" setup>
import { ref, StyleValue } from 'vue'
import { useI18n } from 'vue-i18n'
import { SqValidatorHelper } from '@helpers/sq-validator/sq-validator.helper'
import { SqTooltip } from '@components/index'

const { t } = useI18n()

const sqValidatorHelper = new SqValidatorHelper()

const props = defineProps<{
  name?: string
  id?: string
  label?: string
  customClass?: string
  placeholder?: string
  externalError?: string
  externalIcon?: string
  value?: string
  timeToChange?: number
  errorSpan?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  useFormErrors?: boolean
  tooltipMessage?: string
  tooltipPlacement?: 'center top' | 'center bottom' | 'left center' | 'right center'
  tooltipColor?: string
  tooltipIcon?: string
  backgroundColor?: string
  borderColor?: string
  labelColor?: string
  type?: 'text' | 'email' | 'hidden' | 'password' | 'tel' | 'url' | 'file'
  maxLength?: number
  pattern?: string
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
}>()

type Emits = {
  'key-press-down': [event: KeyboardEvent]
  'key-press-up': [event: KeyboardEvent]
  'in-focus': [value: boolean]
  valid: [value: boolean]
  'value-change': [value: string]
}

const emit = defineEmits<Emits>()

const _value = ref(props?.value || '')
const error = ref<boolean | string>(false)
const timeoutInput = ref<ReturnType<typeof setTimeout>>()

const validate = async (isBlur = false) => {
  if (props?.externalError) {
    error.value = false
  } else if (!!props?.required && !_value.value) {
    emit('valid', false)
    error.value = t('SqInput.required')
  } else if (props?.type === 'email' && !sqValidatorHelper.email(_value.value)) {
    emit('valid', false)
    error.value = t('SqInput.email')
  } else if (props?.type === 'tel' && !sqValidatorHelper.phone(_value.value)) {
    emit('valid', false)
    error.value = t('SqInput.phone')
  } else if (props?.type === 'url' && _value.value && _value.value?.length && !sqValidatorHelper.url(_value.value)) {
    emit('valid', false)
    error.value = t('SqInput.url')
  } else {
    emit('valid', true)
    error.value = ''
  }

  if (isBlur) {
    emit('in-focus', false)
  }
}

const change = async (event: string) => {
  emit('in-focus', true)
  _value.value = event
  clearTimeout(timeoutInput.value)
  timeoutInput.value = setTimeout(() => {
    emit('value-change', event)
  }, props?.timeToChange)
  validate()
}

const keyDown = (event: KeyboardEvent) => {
  emit('key-press-down', event)
}

const keyUp = (event: KeyboardEvent) => {
  emit('key-press-up', event)
}
</script>

<template>
  <div class="wrapper-all-inside-input" :class="props?.customClass">
    <label
      v-if="props?.label?.length || props?.tooltipMessage"
      class="display-flex"
      :class="{ readonly: props?.readonly }"
      :for="props?.id"
    >
      <div
        v-if="props?.label"
        :style="
          {
            color: props?.labelColor,
          } as StyleValue
        "
        v-html="props?.label"
      ></div>
      <SqTooltip
        v-if="props?.tooltipMessage"
        class="ml-1"
        :message="props?.tooltipMessage"
        :placement="props?.tooltipPlacement"
        :color="props?.tooltipColor"
        :icon="props?.tooltipIcon"
      ></SqTooltip>
    </label>
    <div
      class="p-0 wrapper-input wrapper-input-squid text-ellipsisarea"
      :class="{
        error: (props?.externalError && props?.externalError !== '') || (error && error !== ''),
        readonly: props?.readonly,
      }"
    >
      <span class="input-group-text m-0" v-if="$slots.leftLabel">
        <slot name="leftLabel"></slot>
      </span>
      <input
        class="col input"
        :class="{
          'has-icon': error || props?.externalError,
          disabled: props?.disabled,
          readonly: props?.readonly,
        }"
        :style="{
          backgroundColor: props?.backgroundColor,
          borderColor: props?.borderColor,
        }"
        :id="props?.id"
        :type="props?.type || 'text'"
        :name="props?.name"
        :placeholder="props?.placeholder"
        :required="props?.required"
        :disabled="props?.disabled"
        :readonly="props?.readonly"
        @blur="validate(true)"
        :value="_value"
        :maxlength="props?.maxLength"
        @input="change(($event?.target as any)?.value)"
        @keydown="keyDown($event)"
        @keyup="keyUp($event)"
        :pattern="props?.pattern"
        :inputmode="props?.inputMode"
      />
      <span class="input-group-text m-0" v-if="$slots.rightLabel">
        <slot name="rightLabel"></slot>
      </span>
    </div>
    <span
      v-if="props?.externalIcon"
      class="icon icon-external textarea-icon"
      :class="{
        'no-label': !props?.label?.length,
      }"
      v-html="props?.externalIcon"
    ></span>
    <div
      v-if="props?.errorSpan"
      class="box-validation box-invalid show"
      :class="{
        'has-max-length': props?.maxLength,
      }"
    >
      <i
        :class="{
          'visibility-hidden-force': !error && !props?.externalError,
        }"
        class="fa-solid fa-triangle-exclamation"
      ></i>
      {{ props?.externalError ? props?.externalError : '' }}
      {{ error && !props?.externalError ? error : '' }}
      <span
        v-if="props?.maxLength"
        class="max-length-name"
        :class="{
          'visibility-hidden-force': props?.disabled || props?.readonly,
        }"
      >
        {{ props?.maxLength - (_value?.length || 0) }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-all-inside-input {
  position: relative;
  .icon {
    margin: 0;
    font-size: 1rem;
    font-weight: 700;
    position: absolute;
    right: 24px;
    top: 40px;
    &.no-label {
      top: 12px;
    }
  }
  .icon-external {
    color: inherit !important;
  }
  .max-length-name {
    font-size: inherit;
    float: right;
  }
}
</style>
