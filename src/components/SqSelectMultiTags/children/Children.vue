<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Children } from './index'
import { SqSelector } from '@components/index'
import { OptionMulti } from '@interfaces/index'

const props = defineProps<{
  options: Array<OptionMulti>
  option: OptionMulti
  id?: string
  name?: string
  value?: Array<OptionMulti>
  index?: number
  searchText?: string
}>()

type Emits = {
  'value-change': [{ valueChanged: boolean; value?: Array<OptionMulti> }]
  validate: []
  valid: [value: boolean]
}

const emit = defineEmits<Emits>()

const timeouted = ref(false)
const _value = ref(props?.value)
const childrenOptions = ref<Array<OptionMulti>>(props?.option.children || [])

watch(
  () => props?.value,
  (value) => {
    _value.value = value || []
  },
)

watch(
  () => props?.searchText,
  (searchText) => {
    childrenOptions.value =
      props?.option.children?.filter((option) => {
        return (
          option.label.toLowerCase().includes(searchText?.toLowerCase() || '') ||
          (option.children?.length && option.children.some((child) => child.label.toLowerCase().includes(searchText?.toLowerCase() || '')))
        )
      }) || []
  },
)

const findItemInValue = (item: OptionMulti, value?: Array<OptionMulti>) => {
  return !!value?.find((value) => value.value === item.value)
}

const verifyIfHasChildrenInValue = (item: OptionMulti, value?: Array<OptionMulti>) => {
  if (item.children?.length) {
    const hasAllChildren = item.children.every((child) => findItemInValue(child, value))
    if (hasAllChildren && !findItemInValue(item, value) && !timeouted.value) {
      timeouted.value = true
      setTimeout(() => {
        emitFn(item, true)
        timeouted.value = false
      }, 0)
    }
    return !!item.children.find((child) => findItemInValue(child, value))
  }
  return false
}

const emitFn = (object: OptionMulti, checked: boolean) => {
  if (checked) {
    _value.value?.push(object)
  } else {
    _value.value = _value.value?.filter((item) => item.value !== object.value)
    if (object.children?.length) {
      object.children.forEach((item) => {
        _value.value = _value.value?.filter((child) => child.value !== item.value)
      })
    }
  }

  emit('value-change', { valueChanged: true, value: _value.value })
  emit('validate')
}

const handleCollapse = (item: OptionMulti) => {
  item.open = !item.open
}
</script>

<template>
  <li>
    <div class="label">
      <i
        class="icon-collapse fas fa-chevron-down"
        :class="{ 'fa-rotate-by': !props?.option?.open }"
        :style="{
          color: !childrenOptions?.length || props?.option?.disabled ? 'transparent' : '',
          cursor: !childrenOptions?.length ? 'inherit' : 'pointer',
        }"
        @click="handleCollapse(props?.option)"
        style="--fa-rotate-angle: -90deg"
      />
      <SqSelector
        :id="(props?.id || props?.name) + '-checkbox-' + props?.option?.value + '-' + index"
        :name="props?.name + '-checkbox'"
        :value="props?.option?.value"
        :disabled="props?.option?.disabled"
        :checked="findItemInValue(props?.option, _value)"
        :indeterminate="verifyIfHasChildrenInValue(props?.option, _value)"
        @value-change="emitFn(props?.option, $event.checked)"
      />
      <span
        class="text m-0 display-inline-block"
        :class="{ 'cursor-pointer': childrenOptions?.length }"
        @click="handleCollapse(props?.option)"
      >
        {{ props?.option?.label }}
      </span>
    </div>
    <ul class="children" v-if="childrenOptions?.length" :class="{ open: !props?.option?.disabled && props?.option?.open }">
      <Children
        v-for="(child, i) in childrenOptions"
        :key="i"
        :options="childrenOptions"
        :option="child"
        :id="props?.id"
        :name="props?.id"
        :value="_value"
        :index="i"
        @value-change="emit('value-change', $event)"
        @validate="emit('validate')"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.icon-collapse {
  width: 24px;
  height: 24px;
  padding: 0.35rem;
  position: relative;
  transition: var(--transition);
}

.children {
  width: 100%;
  max-height: 0;
  margin: 0;
  padding: 0;
  padding-left: 1.4rem;
  list-style: none;
  overflow: hidden;
  transition: var(--transition);

  &.open {
    max-height: 9999px;
  }
}

li {
  display: grid;
  .label {
    margin: 0 0 0.5rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: baseline;
    justify-content: flex-start;
    transition: var(--transition);
    &.has-child {
      padding-left: 1.1rem;
    }
  }
}
</style>
