<script setup>

defineProps({
  action: {
    type: Function,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <button
    type="button"
    class="stepper-button stepper-button-primary"
    :disabled="disabled"
    @click.prevent="action"
  >
    Next
  </button>
</template>
