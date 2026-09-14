<script setup>

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <button type="button" class="stepper-button stepper-button-secondary" @click.prevent="props.action">
    Previous
  </button>
</template>

