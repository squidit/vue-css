<script lang="ts" setup>
import Loader from '@/components/loader/Loader.vue'
import Button from '@/components/button/Button.vue'
import { ref } from 'vue'

// Import Classes
import ValidatorHelper from '@/helpers/validator.helper'
import DateHelper from '@/helpers/date.helper'
const validatorHelper = new ValidatorHelper()
const dateHelper = new DateHelper()

// Props
const props = defineProps<{
  id?: string
  label?: string
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
  externalError?: string
  hiddenErrorSpan?: boolean
  maxLength?: number
  type: string
  leftLabel?: string
  rightLabel?: string
  backgroundColor?: string
  name?: string
  required?: boolean
  confirm?: string
  initialDate?: string
  finalDate?: string
  placeholder?: string
  min?: number | string
  max?: number | string
  value: string | number
  hasTimeout?: boolean
  mask?: string | Array<string>
  customInside?: boolean
  isPassword?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:value', value?: any): void
  (e: 'keyPress', keyPress: any): void
  (e: 'focus', focus: boolean): void
  (e: 'valid', valid: boolean): void
  (e: 'showPassword', valid: boolean): void
}>()

const state = ref({
  error: '',
  value: '',
  showPassword: false,
})

let timeoutInput: any
const timeOutInputTime = 800

const timeStamp = `input-random-id-${(1 + Date.now() + Math.random()).toString().replace('.', '')}`

function validate(value: any) {
  if (props.externalError) {
    emit('valid', false)
    state.value.error = ''
  } else if (!!props.required && (!value || (value as string)?.length < 1) && value !== 0) {
    emit('valid', false)
    state.value.error = 'Campo obrigatório'
  } else if (props.type === 'email' && !validatorHelper.email(value as string)) {
    emit('valid', false)
    state.value.error = 'E-mail inválido'
  } else if (props.type === 'confirm-email' && value !== props.confirm) {
    emit('valid', false)
    state.value.error = 'Os e-mails não coincidem'
  } else if (props.type === 'tel' && !validatorHelper.phone(validatorHelper.clearPhone(value as string))) {
    emit('valid', false)
    state.value.error = 'Telefone inválido'
  } else if (props.type === 'url' && value && (value as string)?.length && !validatorHelper.url(value as string)) {
    emit('valid', false)
    state.value.error = 'URL inválido'
  } else if (props.type === 'date' && value < dateHelper.dateTodayPlusFive()) {
    emit('valid', false)
    state.value.error = 'Data inválida'
  } else if (props.type === 'date' && props.initialDate && value <= props.initialDate) {
    emit('valid', false)
    state.value.error = 'A data final tem que ser maior que a data inical'
  } else if (props.type === 'date' && props.finalDate && value >= props.finalDate) {
    emit('valid', false)
    state.value.error = 'A data inicial tem que ser menor que a data final'
  } else {
    emit('valid', true)
    state.value.error = ''
  }
}

function change(event: any): void {
  validate(event)
  prepareEmit(event)
}

function prepareEmit(event: any) {
  if (props.hasTimeout) {
    timeoutInput = clearTimeout(timeoutInput)
    timeoutInput = setTimeout(() => {
      emit('update:value', event)
    }, timeOutInputTime)
  } else {
    emit('update:value', event)
  }
}

function keyDown(event: any) {
  emit('keyPress', event)
}

function showPassword(event: any) {
  state.value.showPassword = event

  emit('showPassword', event)
}
</script>

<template>
  <div class="wrapper-input-all">
    <label
      v-if="props.label && props.label.length > 0"
      class="label"
      :class="{
        error: (props.externalError && props.externalError !== '') || (state.error && state.error !== ''),
      }"
      :for="props.id || timeStamp"
      v-html="props.label"
    ></label>
    <div
      class="no-padding wrapper-input wrapper-input-squid"
      :class="{
        error: (externalError && externalError !== '') || (state.error && state.error !== ''),
        aligned: isPassword,
      }"
    >
      <span class="input-group-text" v-if="props.leftLabel" v-html="props.leftLabel"></span>
      <input
        v-maska="mask"
        v-if="type && type !== 'textarea'"
        class="col input"
        :style="{
          'background-color': props.backgroundColor,
        }"
        :class="{
          'has-icon': state.error || props.externalError,
          error: (props.externalError && props.externalError !== '') || (state.error && state.error !== ''),
          disabled: props.disabled,
          readonly: props.readonly,
          custom_inside_input: props.customInside,
        }"
        :id="props.id || timeStamp"
        :type="type || 'text'"
        :name="name || timeStamp"
        :placeholder="props.placeholder || ''"
        :required="props.required"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :min="props.min || ''"
        :max="props.max || ''"
        :maxlength="props.maxLength"
        :value="value"
        @input="change(($event?.target as any)?.value || '')"
        @keydown="keyDown($event)"
        @focus="emit('focus', true)"
        @blur="emit('focus', false)"
      />
      <textarea
        v-if="type && type === 'textarea'"
        class="col textarea scrollbar"
        :style="{
          'background-color': props.backgroundColor,
        }"
        :class="{
          'has-icon': state.error || props.externalError,
          error: (props.externalError && props.externalError !== '') || (state.error && state.error !== ''),
          disabled: props.disabled,
          readonly: props.readonly,
        }"
        :id="props.id || timeStamp"
        :type="type || 'text'"
        :name="name || timeStamp"
        :placeholder="props.placeholder || ''"
        :required="props.required"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :maxlength="props.maxLength"
        :value="value"
        @input="change(($event?.target as any)?.value || '')"
        @keydown="keyDown($event)"
        @focus="emit('focus', true)"
        @blur="emit('focus', false)"
      ></textarea>
      <span
        class="input-group-text"
        :class="{ custom_inside_span: props.customInside }"
        v-if="props.rightLabel"
        v-html="props.rightLabel"
      ></span>
      <div v-if="isPassword" class="hide-password">
        <Button
          class="hide-password-button"
          backgroundColor="transparent"
          borderColor="transparent"
          textColor="var(--black_light)"
          @click="showPassword(!state.showPassword)"
        >
          <i v-if="state.showPassword" class="fa-solid fa-eye"></i>
          <i v-if="!state.showPassword" class="fa-solid fa-eye-slash"></i>
        </Button>
      </div>
    </div>
    <Loader v-if="props.loading" class="display-block text-center" :class="{ label: props.label }" />
    <div
      class="box-validation box-invalid show"
      v-if="!props.hiddenErrorSpan"
      :class="{
        'has-max-length': props.maxLength,
      }"
    >
      <i v-if="externalError || state.error" class="fa-solid fa-triangle-exclamation"></i>
      {{ externalError ? externalError : '' }}
      {{ state.error && !externalError ? state.error : '' }}
      <span
        class="max-length-name"
        :class="{
          'visibility-hidden-force': props.disabled || props.readonly,
        }"
        v-if="props.maxLength"
      >
        {{ props.maxLength - state?.value?.length }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-input-all,
.wrapper-input {
  position: relative;
}
.aligned {
  display: flex;
  align-items: center;
}
.loader {
  position: absolute;
  right: 1rem;
  top: 0;
  &.label {
    top: 35px;
  }
}
.box-validation {
  min-height: 16px;
}
.custom_inside_input {
  padding: 0 0 0 0.5rem !important;
  border-right: none;
  &:after {
    border: none;
  }
}
.custom_inside_span {
  padding: 0 0.5rem 0 0 !important;
  border: 1px solid var(--black_light) !important;
  background-color: var(--background) !important;
  color: var(--gray) !important;
}
.hide-password {
  position: absolute;
  right: 0;
}
</style>
