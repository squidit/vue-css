<script lang="ts" setup>
import { ref } from 'vue'

// Props
const props = defineProps<{
  color?: string
  size?: 'small' | 'bigger' | 'big' | ''
  customSize?: string
  borderSize?: string
}>()

// Local Variables
const styleObject = ref({
  borderWidth: props.borderSize,
  height: props.customSize,
  width: props.customSize,
  borderColor: props.color || 'var(--pink)',
})
</script>

<template>
  <div class="loader" :class="size" role="status" :style="styleObject">
    <span class="visually-hidden">Loading...</span>
  </div>
</template>

<style lang="scss" scoped></style>
