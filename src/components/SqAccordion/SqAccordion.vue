<script lang="ts" setup>
import { provide, ref, onMounted, ComponentInternalInstance } from 'vue'
import { SqSleep } from '@helpers/index'

const props = defineProps<{
  openOnlyOne?: boolean
  openFirst?: boolean
}>()

const collapses = ref<ComponentInternalInstance[]>([])

onMounted(async () => {
  if (props?.openFirst) {
    if (collapses.value.length) {
      await SqSleep()
      collapses.value[0].exposed?.toggleCollapse()
    }
  }
})

const returnOpenValue = (instance: ComponentInternalInstance): boolean => {
  return instance?.exposed?.open?.value ?? instance?.exposed?.open
}

const closeCollapses = (collapse: ComponentInternalInstance) => {
  if (props?.openOnlyOne) {
    collapses.value.forEach((thisCollapse) => {
      if (returnOpenValue(collapse) && returnOpenValue(thisCollapse as ComponentInternalInstance) && collapse.uid !== thisCollapse.uid) {
        thisCollapse.exposed?.toggleCollapse()
      }
    })
  }
}

const registerChild = (child: ComponentInternalInstance) => {
  if (!collapses.value.find((c) => c.uid === child.uid)) {
    collapses.value.push(child)
  } else {
    closeCollapses(child as ComponentInternalInstance)
  }
}

provide('parentRegister', registerChild)
</script>

<template>
  <div class="accordion-container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.accordion-container {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
  width: 100%;
}
</style>
