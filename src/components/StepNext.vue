<script setup lang="ts">

import { useI18n } from "vue-i18n";

const { t } = useI18n();


defineProps<{
    action: Function,
    canNext?: boolean
}>();

</script>


<template>

<button
    type="button"
    @click.prevent="action"
    class="btn btn-primary btn-rounded"
    :disabled="canNext"
>

    {{ t("Next") }}

</button>

</template>