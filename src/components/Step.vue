<script setup lang="ts">

import { inject } from "vue";


const props = defineProps<{
    title: string
    canNext?: boolean
}>()


// optional: access wizard state
const stepper = inject("stepper");


</script>


<template>

<div
    class="step"
    :data-title="props.title"
>

    <slot />

</div>

</template>