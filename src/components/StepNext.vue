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
    id="next-btn"
    class="btn btn-primary btn-rounded"
    :disabled="disabled"
    @click.prevent="action"
  >
    Next
  </button>
</template>
<style>

#next-btn {
  border: 1px solid var(--title-color);
  color: white;
  padding: 4px 16px;
  background-color: var(--title-color);
}

#next-btn:disabled {
  background-color: #d1d5db;
  border-color: #d1d5db;
  color: #6b7280;
}
</style>