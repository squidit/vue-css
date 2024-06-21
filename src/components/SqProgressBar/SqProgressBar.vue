<script lang="ts" setup>
const props = defineProps<{
  color?: string
  hasLabel?: boolean
  value?: number
  height?: string
  striped?: boolean
  animated?: boolean
}>()

const roundValue = (value: number) => {
  return Math.round(value)
}
</script>

<template>
  <div class="progress">
    <div
      class="progress-bar"
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="100"
      :class="{
        [`background-${props?.color || 'var(--pink)'}`]: props?.color,
        'background-dashed': props?.striped,
        'animate-bar': props?.animated,
      }"
      :style="{
        maxWidth: `${props?.value || 0}%`,
        height: props?.height || '1rem',
        backgroundColor: props?.color || 'var(--pink)',
      }"
    >
      {{ hasLabel ? `${roundValue(props?.value || 0)}%` : null }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  display: inline-block;
  width: 100%;
  height: 14px;
  .progress-bar {
    font-size: 0.86rem;
  }
}
</style>
