<script lang="ts" setup>
const props = defineProps<{
  color?: string
  size?: 'small' | 'bigger' | 'big' | ''
  customSize?: string
  borderSize?: string
}>()
</script>

<template>
  <div
    class="loader"
    :class="props.size"
    role="status"
    :style="{
      borderColor: props.color || 'var(--pink)',
      width: props.customSize,
      height: props.customSize,
      borderWidth: props.borderSize,
    }"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style lang="scss" scoped></style>
