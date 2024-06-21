<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  name?: string
  type?: 'checkbox' | 'radio'
  id?: string
  value?: string
  checked?: boolean
  indeterminate?: boolean
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  hideInput?: boolean
  toggle?: boolean
  externalError?: string
  label?: string
  errorSpan?: boolean
  block?: boolean
}>()

type Emits = {
  'value-change': [{ checked: boolean; value?: string }]
  valid: [value: boolean]
}

const emit = defineEmits<Emits>()

const thisChecked = ref(props?.checked)
const thisIndeterminate = ref(props?.indeterminate)
const error = ref('')

watch(
  () => props?.checked,
  (checked) => {
    thisChecked.value = checked
  },
)

watch(
  () => props?.indeterminate,
  (indeterminate) => {
    thisIndeterminate.value = indeterminate
  },
)

const validate = () => {
  if (props?.externalError) {
    error.value = ''
  } else if (props?.required && !thisChecked.value) {
    emit('valid', false)
    error.value = t('Globals.forms.required')
  } else {
    emit('valid', true)
    error.value = ''
  }
}

const change = (event: boolean) => {
  if (!props?.readonly && !props?.disabled) {
    emit('value-change', { checked: event, value: props?.value })
    thisChecked.value = event
  }
  validate()
}
</script>

<template>
  <div
    class="wrapper-selectors"
    :class="{
      toggle: props?.toggle,
      checked: thisChecked,
      indeterminate: !thisChecked ? thisIndeterminate : false,
      error: error,
      block: props?.block,
    }"
  >
    <label :for="props?.id" v-if="$slots.leftLabel" :class="{ 'label-max-width': props?.hideInput }">
      <slot name="leftLabel"></slot>
    </label>
    <input
      :id="props?.id"
      :name="props?.name"
      :type="props?.type || 'checkbox'"
      @input="change(($event?.target as any)?.checked)"
      :value="props?.value"
      :disabled="props?.disabled"
      :readonly="props?.readonly"
      :required="props?.required"
      :checked="thisChecked"
      :class="{
        indeterminate: !(props?.checked || thisChecked) ? props?.indeterminate || thisIndeterminate : undefined,
      }"
      :indeterminate="!(props?.checked || thisChecked) ? props?.indeterminate || thisIndeterminate : undefined"
    />
    <label
      :for="id"
      :class="[
        props?.type,
        {
          disabled: props?.disabled,
          'hide-input': props?.hideInput,
        },
      ]"
      class="checkbox"
    ></label>
    <label :for="props?.id" v-if="props?.label" v-html="props?.label" :class="{ 'label-max-width': props?.hideInput }"></label>
    <label :for="props?.id" v-if="$slots.rightLabel" :class="{ 'label-max-width': props?.hideInput }">
      <slot name="rightLabel"></slot>
    </label>
  </div>
  <div class="box-validation box-invalid show" v-if="props?.errorSpan">
    <i v-if="props?.externalError || error" class="fa-solid fa-triangle-exclamation" />
    {{ props?.externalError ? props?.externalError : '' }}
    {{ error && !props?.externalError ? error : '' }}
  </div>
</template>

<style lang="scss" scoped>
.wrapper-selectors {
  .hide-input {
    display: none !important;
  }
  &.block {
    .label-max-width {
      width: 100%;
    }
  }
}
.block {
  width: 100%;
}
</style>
