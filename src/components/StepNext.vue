<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
    {{ t('Next') }}
  </button>
</template>