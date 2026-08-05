<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const props = defineProps({
    step: {
        type: Number,
        required: true
    },
    action: {
        type: Function,
        required: true
    }

});
</script>
<template>
    <button :step="step" @click.prevent="props.action" class="btn btn-secondary btn-rounded">
        {{ t("Previous") }}
    </button>
</template>