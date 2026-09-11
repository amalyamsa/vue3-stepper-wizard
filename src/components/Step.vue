<script setup>
import {
  computed,
  inject,
  onBeforeUnmount,
} from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  validate: {
    type: Function,
    default: null,
  },
})

const stepper = inject('stepper')

if (!stepper) {
  throw new Error(
    'Step must be used inside StepperWizard.'
  )
}

const stepIndex = stepper.registerStep({
  title: props.title,
  validate: props.validate,
})

const isActive = computed(() => {
  return stepper.currentStep.value === stepIndex
})

onBeforeUnmount(() => {
  stepper.unregisterStep(stepIndex)
})
</script>

<template>
  <div
    v-show="isActive"
    class="step"
    :data-step="stepIndex + 1"
    :data-title="title"
  >
    <slot />
  </div>
</template>