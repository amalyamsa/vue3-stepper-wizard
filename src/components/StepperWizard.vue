<script setup lang="ts">
import { StepperHeader, StepperWizard, Step, StepPrevious, StepConfirm, StepNext } from "@/components";
import {
    computed,
    ref,
    useSlots,
    provide
} from "vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();


const emit = defineEmits([
    "finish",
    "change"
]);


const slots = useSlots();


const currentStep = ref(0);


const steps = computed(() => {
    return slots.default?.() ?? [];
});


const step = computed(()=>{
    return currentStep.value + 1;
});



async function next(validate?:Function) {


    if(validate){

        const result = await validate();

        if(!result.valid)
            return;

    }



    if(currentStep.value < steps.value.length - 1){

        currentStep.value++;

        emit(
            "change",
            currentStep.value
        );

    }
    else{

        emit("finish");

    }

}



function previous(){

    if(currentStep.value > 0){

        currentStep.value--;

    }

}



provide(
    "stepper",
    {
        currentStep,
        step,
        next,
        previous
    }
);
const canNext = computed(()=>{
    return currentStep.value < steps.value.length - 1;
});

</script>


<template>

<div>


<div class="wizard-content">

    <component
        :is="steps[currentStep]"
    />

</div>



<div class="d-flex justify-content-between mt-4">


    <StepPrevious
        v-if="currentStep > 0"
        :action="previous"
    />



    <StepNext
        v-if="currentStep < steps.length-1"
        :action="next" :disabled="!canNext"
    />



    <StepConfirm
        v-if="currentStep === steps.length-1"
    />


</div>


</div>

</template>