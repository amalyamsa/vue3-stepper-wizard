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
    <button :step="step" @click.prevent="props.action" class="btn btn-primary btn-rounded" type="button">
        <!-- <span v-if="loading" class="spinner-border spinner-border-sm mr-1"></span> -->
        {{ t("Confirm") }}
    </button>
</template>