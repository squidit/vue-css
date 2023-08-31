<script setup lang="ts">
  // @ts-ignore
  import { ButtonSquid, InputSquid, LoaderSquid } from '@squidit/css-vue'
</script>

<template>
  <InputSquid
    class="mb-3"
    label="Endereço"
    placeholder="Digite seu Endereço"
    name="street-address"
    id="street-address"
    :value="null"
    @update:value="null"
    @valid="null"
    type="text"
    required
  />
  <ButtonSquid class="button-pink" @emitClick="null">
    <span>teste</span>
  </ButtonSquid>
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
