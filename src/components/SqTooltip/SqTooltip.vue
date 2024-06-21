<script lang="ts" setup>
const props = defineProps<{
  color?: string
  icon?: string
  placement?:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'center top'
    | 'center center'
    | 'center bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
  message?: string
  fontSize?: string
  trigger?: 'hover' | 'click'
}>()
</script>

<template>
  <div
    class="wrapper-tooltip"
    v-tooltip="props?.message"
    :placement="props?.placement || 'center top'"
    :trigger="props?.trigger || 'hover'"
    :style="{
      color: props?.color,
      fontSize: props?.fontSize || '1rem',
    }"
  >
    <div class="icon" v-if="props?.icon" v-html="props?.icon" :style="{ fontSize: props?.fontSize || '1rem' }"></div>
    <i class="fa-solid fa-circle-question icon" v-if="!props?.icon" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper-tooltip {
  display: inline-block;
  cursor: help;
}
</style>
