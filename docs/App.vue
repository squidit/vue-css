<script setup lang="ts">
import { LoaderSquid } from '@squidit/css-vue'
</script>

<template>
  <div class="display-flex justify-content-center mt-3">
    <LoaderSquid />
  </div>
</template>

<style>
#app {
  max-width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
