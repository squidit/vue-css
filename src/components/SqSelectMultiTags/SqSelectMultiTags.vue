<script lang="ts" setup>
import { onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { SqTooltip, SqLoader, SqInfinityScroll } from '@components/index'
import { OptionMulti } from '@interfaces/index'
import { Children } from './children/index'

const { t } = useI18n()

const props = defineProps<{
  name?: string
  value?: Array<OptionMulti>
  id?: string
  label?: string
  customClass?: string
  placeholder?: string
  externalError?: string
  externalIcon?: string
  placeholderSearch?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  loading?: boolean
  useFormErrors?: boolean
  errorSpan?: boolean
  backgroundColor?: string
  borderColor?: string
  labelColor?: string
  minCharactersToSearch?: number
  timeToChange?: number
  options?: Array<OptionMulti>
  maxTags?: number
  minTags?: number
  showInside?: boolean
  hideSearch?: boolean
  tooltipMessage?: string
  tooltipPlacement?:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'center top'
    | 'center center'
    | 'center bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
  tooltipColor?: string
  tooltipIcon?: string
}>()

type Emits = {
  'value-change': [value: Array<OptionMulti>]
  'search-change': [value: string]
  'close-change': [value: boolean]
  'remove-tag': [value: OptionMulti]
  valid: [value: boolean]
}

const emit = defineEmits<Emits>()

const fakeInput = ref<HTMLElement>({} as HTMLElement)
const _value = ref<Array<OptionMulti>>(props?.value || [])
const renderOptionsList = ref(false)
const open = ref(false)
const searchText = ref('')
const valueChanged = ref(false)
const error = ref<string | boolean>('')
const _options = ref<Array<OptionMulti>>(props?.options || [])
const hasMoreOptions = ref(true)
const loadingScroll = ref(false)
const quantity = ref(15)
const limit = ref(quantity.value)
const isMaxTags = ref(false)
const timeoutInput = ref<ReturnType<typeof setTimeout>>()

onMounted(() => {
  document.addEventListener('click', outsideClick)
})

onUpdated(() => {
  validate()
})

onUnmounted(() => {
  document.addEventListener('click', outsideClick)
})

watch(
  () => props?.value,
  (value) => {
    _value.value = value || []
    addMoreOptions(true)
  },
)

watch(
  () => searchText.value,
  (searchText) => {
    _options.value =
      props?.options?.filter((option) => {
        return (
          option.label.toLowerCase().includes(searchText.toLowerCase()) ||
          (option.children?.length && option.children.some((child) => child.label.toLowerCase().includes(searchText.toLowerCase())))
        )
      }) || []
  },
)

const removeItem = (item: OptionMulti, event: Event) => {
  event?.stopPropagation()
  if (!props?.readonly && !props?.disabled) {
    if (item.children?.length) {
      item.children.forEach((child) => {
        _value.value = _value.value?.filter((value) => value.value !== child.value)
      })
    }
    _value.value = _value.value?.filter((value) => value.value !== item.value)

    emit('value-change', _value.value)
    emit('remove-tag', item)
    validate()
  }
}

const doDropDownAction = async () => {
  if (open.value) {
    closeDropdown()
    renderOptionsList.value = await new Promise<boolean>((resolve) =>
      setTimeout(() => {
        resolve(false)
      }, 300),
    )
  } else {
    addMoreOptions()
    renderOptionsList.value = true
    open.value = await new Promise<boolean>((resolve) =>
      setTimeout(() => {
        resolve(true)
      }, 100),
    )
  }
}

const closeDropdown = async () => {
  open.value = false
  _options.value = []
  limit.value = quantity.value
  hasMoreOptions.value = true
  searchText.value = ''
  emit('close-change', valueChanged.value)
  valueChanged.value = false
}

const setError = (key: string, interpolateParams = {}) => {
  if (props?.useFormErrors) {
    error.value = t(key, interpolateParams)
  }
}

const validate = () => {
  if (props?.externalError) {
    error.value = false
  } else if (props?.required && !props?.value?.length) {
    setError('Globals.forms.required')
    emit('valid', false)
  } else if (props?.minTags && _value.value && _value.value?.length < props?.minTags) {
    setError('Globals.forms.minimumRequired', { minTags: props?.minTags })
    emit('valid', false)
  } else if (props?.maxTags && _value.value && _value.value?.length === props?.maxTags) {
    renderOptionsList.value = false
    isMaxTags.value = true
    error.value = ''
    emit('valid', true)
  } else {
    isMaxTags.value = false
    error.value = ''
    emit('valid', true)
  }
}

const modelChange = async (event: string) => {
  if (!props?.minCharactersToSearch || !event.length || event.length >= props?.minCharactersToSearch) {
    clearTimeout(timeoutInput.value)
    searchText.value =
      (await new Promise<string>(
        (resolve) =>
          (timeoutInput.value = setTimeout(() => {
            resolve(event)
          }, props?.timeToChange)),
      )) || ''
    emit('search-change', event)
  }
}

const addMoreOptions = (isOnChange = false) => {
  if (hasMoreOptions.value || isOnChange) {
    loadingScroll.value = true
    const limitState = limit.value > (props?.options?.length || 0) ? props?.options?.length || 0 : limit.value
    _options.value = props?.options?.slice(0, limitState) as Array<OptionMulti>
    limit.value = limit.value + quantity.value
    hasMoreOptions.value = limitState !== props?.options?.length
    loadingScroll.value = false
  }
}

const outsideClick = (event: Event) => {
  if (open.value && fakeInput.value && fakeInput.value === event.target) {
    doDropDownAction()
  }
}
</script>

<template>
  <div class="wrapper-all-inside-input" :class="customClass">
    <label
      class="display-flex align-items-center"
      v-if="label?.length || $slots.labelTemplate || tooltipMessage"
      :class="{
        readonly: readonly || isMaxTags,
      }"
      :for="id"
    >
      <div v-if="props?.label && !$slots.labelTemplate" :style="{ color: props?.labelColor }" v-html="props?.label"></div>
      <span v-if="$slots.labelTemplate">
        <slot name="labelTemplate"></slot>
      </span>
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
      class="wrapper-select-multi"
      :class="{
        error: (props?.externalError && props?.externalError !== '') || (error && error !== ''),
        disabled: props?.disabled,
        readonly: props?.readonly || isMaxTags,
        loading: props?.loading,
      }"
    >
      <div
        class="'input-fake col border-' + borderColor"
        style="min-height: auto"
        :class="{
          'no-label': !(props?.label && props?.label.length > 0),
          'has-icon': error || props?.externalError,
          disabled: props?.disabled,
          readonly: props?.readonly || isMaxTags,
        }"
        :style="{
          backgroundColor: props?.backgroundColor,
          borderColor: props?.borderColor,
        }"
        ref="fakeInput"
      >
        <div
          class="input-fake-content"
          :class="{
            disabled: props?.disabled,
          }"
          @click="doDropDownAction()"
        >
          <div class="loading-wrapper" v-if="props?.loading">
            <SqLoader />
          </div>
          <span v-if="!_value?.length || !props?.showInside">{{ props?.placeholder }}</span>
          <div class="input-fake-content-text" v-if="props?.showInside && _value?.length">
            <span class="tag" v-for="(option, i) in _value" :key="i" @click="removeItem(option, $event)">
              {{ option?.label }} <i v-if="!props?.readonly" class="fas fa-times" :style="{ minWidth: 'auto' }" />
            </span>
          </div>
          <span v-if="_value?.length" class="badge">{{ _value!.length }}</span>
          <i v-if="!props?.loading && !props?.readonly" class="icon-down fas fa-chevron-down" />
        </div>
        <div
          v-if="!props?.loading && !props?.disabled && !props?.readonly && !isMaxTags && renderOptionsList"
          id="sq-select-multi-tags-scroll"
          class="input-window scrollbar"
          :class="{
            open: !props?.loading && !props?.disabled && !isMaxTags && renderOptionsList && open,
          }"
        >
          <div class="input-search">
            <div class="wrapper-all-inside-input">
              <div class="p-0 wrapper-input wrapper-input-squid text-ellipsisarea">
                <input
                  :name="props?.name"
                  :id="props?.id"
                  :placeholder="props?.placeholderSearch || t('Globals.forms.search') || ''"
                  class="col input"
                  :value="searchText"
                  @input="modelChange(($event?.target as any)?.value)"
                  v-if="!props?.hideSearch"
                />
              </div>
              <span class="icon icon-external textarea-icon"><i class="fas fa-search" /></span>
            </div>
          </div>
          <SqInfinityScroll
            class="list"
            element-to-scroll-id="sq-select-multi-tags-scroll"
            loader-color="var(--pink)"
            :length="_options?.length || 0"
            :has-more="hasMoreOptions"
            :loading="loadingScroll"
            @scrolled-emitter="addMoreOptions()"
          >
            <Children
              v-for="(option, i) in _options"
              :key="i"
              :options="_options || []"
              :option="option"
              :id="props?.id"
              :name="props?.name"
              :value="_value"
              :index="i"
              :search-text="searchText"
              @value-change="
                (event) => {
                  valueChanged = event.valueChanged
                  _value = event?.value || []
                  emit('value-change', _value)
                }
              "
              @validate="validate()"
            />
          </SqInfinityScroll>
          <p v-if="!_options?.length">
            {{ t('Globals.forms.searchSelectEmpty') }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="box-validation box-invalid show"
      v-if="props?.errorSpan"
      :class="{
        'visibility-hidden-force':
          ((!props?.externalError || props?.externalError === '') && (!error || error === '')) || props?.disabled || props?.readonly,
      }"
    >
      <i
        :class="{
          'visibility-hidden-force': !error && !props?.externalError,
        }"
        class="fa-solid fa-triangle-exclamation"
      />
      {{ props?.externalError ? props?.externalError : '' }}
      {{ error && !props?.externalError ? error : '' }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper-select-multi {
  margin: 0;
  padding: 0;
  text-align: left;
  display: flex;
  flex-direction: column;
  position: relative;

  &.loading {
    cursor: wait;
  }

  .input-fake-content-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
    max-width: calc(100% - 40px);
    min-height: 51px;

    .tag {
      margin: 0;
      border: 1px solid var(--border_color);
      border-radius: 5px;
      padding: 0.2rem 0.35rem;
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      transition: var(--transition);
      background: var(--background_secondary);

      &:hover {
        background: var(--border_color);
      }
    }
  }

  .input-fake-content {
    min-height: 44px;
    border: 1px solid var(--border_color);
    background: var(--background);
    padding: 0.75rem 1rem;
    transition: var(--transition);
    color: var(--text_color);
    border-radius: 5px;

    .icon-down {
      right: 5px;
      bottom: calc(50% - 6px);
      position: absolute;
      font-size: 0.86rem;
    }
  }

  .loading-wrapper {
    position: absolute;
    right: 5px;
    bottom: 10px;
  }

  .badge {
    position: absolute;
    bottom: 15px;
    right: 20px;
    margin: 0;
    border-radius: 50%;
    background-color: var(--border_color);
    color: var(--black);
    font-size: 0.86rem;
    font-weight: 700;
    padding: 0 0.35rem;
    border-radius: 50%;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    transition: var(--transition);
  }

  .input-search {
    display: inline-block;
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    padding-top: 1.1rem;
    margin-bottom: 0.7rem;
    background-color: var(--background_secondary);

    .wrapper-all-inside-input {
      .icon {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        position: absolute;
        right: 11px;
        top: 27px;
      }

      .icon-external {
        color: inherit !important;
      }
    }
  }

  .input-window {
    width: 100%;
    position: absolute;
    top: 100%;
    max-height: 0;
    height: 0;
    transition: var(--transition);
    overflow: hidden;
    z-index: 1;

    &.open {
      height: auto;
      max-height: 400px;
      background: var(--background_secondary);
      padding: 0 0.7rem 1.1rem;
      overflow-y: auto;
      box-shadow: var(--box_shadow);
    }
  }

  .icon-collapse {
    transition: var(--transition);
    cursor: pointer;
    padding: 0.35rem;
    position: relative;
  }

  .list,
  .children {
    padding: 0;
    list-style: none;
    margin: 0;
    width: 100%;

    li {
      display: grid;
      .label {
        margin: 0 0 0.5rem;
        display: flex;
        flex-wrap: nowrap;
        align-items: baseline;
        justify-content: flex-start;
        transition: var(--transition);
      }
    }
  }

  .children {
    max-height: 0;
    overflow: hidden;
    transition: var(--transition);
    padding-left: 1.4rem;

    &.open {
      max-height: 9999px;
    }
  }
}
</style>
