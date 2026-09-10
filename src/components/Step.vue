<script setup>
import { inject } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  canNext: {
    type: Boolean,
    default: true,
  },
})

const stepper = inject('stepper', null)
</script>

<template>
  <div
    class="step"
    :data-title="title"
  >
    <slot />
  </div>
</template>