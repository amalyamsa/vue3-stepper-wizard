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
    id="confirm-btn"
    class="btn btn-primary btn-rounded"
    :disabled="disabled"
    @click.prevent="action"
  >
    Confirm
  </button>
</template>
<style>

#confirm-btn {
  border: 1px solid var(--title-color);
  color: white;
  padding: 4px 16px;
  background-color: var(--title-color);
}

#confirm-btn:disabled {
  background-color: #d1d5db;
  border-color: #d1d5db;
  color: #6b7280;
}
</style>