<script lang="ts" setup>
import { provide, ref, onMounted, ComponentInternalInstance } from 'vue'

const props = defineProps<{
  onlyOne?: boolean
  openFirst?: boolean
}>()

const collapses = ref<ComponentInternalInstance[]>([])

onMounted(() => {
  if (props?.openFirst) {
    if (collapses.value.length) {
      collapses.value[0].exposed?.toggleCollapse()
    }
  }
})

const returnOpenValue = (instance: ComponentInternalInstance) => {
  const { devtoolsRawSetupState } = instance as unknown as { devtoolsRawSetupState: { open: { _value: boolean } } }
  return devtoolsRawSetupState?.open?._value || devtoolsRawSetupState?.open
}

const closeCollapses = (collapse: ComponentInternalInstance) => {
  if (props?.onlyOne) {
    collapses.value.forEach((thisCollapse) => {
      if (collapse.uid !== thisCollapse.uid && returnOpenValue(thisCollapse as ComponentInternalInstance)) {
        thisCollapse.exposed?.toggleCollapse()
      }
    })
  }
}

const registerChild = (child: ComponentInternalInstance) => {
  let index = 0
  const findedChild = collapses.value.find((c, i) => c.uid === child.uid && (index = i))
  if (!findedChild) {
    collapses.value.push(child)
  } else if (returnOpenValue(findedChild as ComponentInternalInstance) !== returnOpenValue(child as ComponentInternalInstance)) {
    collapses.value.splice(index, 1, child)
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
