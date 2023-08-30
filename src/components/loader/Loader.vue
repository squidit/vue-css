<script lang="ts" setup>
import { ref } from 'vue'

// Props
const props = defineProps<{
  color?: string
}>()

// Local Variables
const styleObject = ref({
  borderColor: props.color || 'var(--pink)',
})
</script>

<template>
  <div class="loader" role="status" :style="styleObject">
    <span class="visually-hidden">Loading</span>
  </div>
</template>

<style lang="scss" scoped></style>
