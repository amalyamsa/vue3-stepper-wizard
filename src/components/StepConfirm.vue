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
    class="btn btn-primary btn-rounded"
    :disabled="disabled"
    @click.prevent="action"
  >
    Confirm
  </button>
</template>