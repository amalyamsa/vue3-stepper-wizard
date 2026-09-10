<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  action: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <button
    type="button"
    class="btn btn-secondary btn-rounded"
    @click.prevent="props.action"
  >
    {{ t('Previous') }}
  </button>
</template>