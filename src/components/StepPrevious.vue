<script setup>

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <button type="button" id="next-btn" class="btn btn-secondary btn-rounded" @click.prevent="props.action">
    Previous
  </button>
</template>

<style>
#back-btn {
  border: 1px solid var(--title-color);
  color: var(--title-color);
  border-radius: 20px;
  padding: 4px 16px;
  background-color: white;
}

#back-btn:hover {
  background-color: #ecfcfc;
}

#back-btn:disabled {
  border-color: #d1d5db;
  color: #6b7280;
}
</style>