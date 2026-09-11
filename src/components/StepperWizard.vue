<script setup>
import {
  computed,
  provide,
  useSlots,
} from 'vue'

import StepPrevious from './StepPrevious.vue'
import StepNext from './StepNext.vue'
import StepConfirm from './StepConfirm.vue'
import StepperHeader from './StepperHeader.vue'

import { useStepperForm } from '../composables/useStepperForm'

const props = defineProps({
  validate: {
    type: Function,
    default: null,
  },
  headerTitle: {
    type: Array,
    default: () => [],
  },

  showHeader: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  'finish',
  'change',
])

const slots = useSlots()

const steps = computed(() => {
  const content = slots.default?.() || []

  return content.filter((vnode) => {
    return vnode.type !== Symbol.for('v-fgt')
  })
})

const totalSteps = computed(() => {
  return steps.value.length
})

const {
  step,
  isFirstStep,
  isLastStep,
  next: goNext,
  previous,
  goTo,
  reset,
  progress,
} = useStepperForm(totalSteps)

async function next() {
  // Validation is optional
  if (props.validate) {
    const result = await props.validate()

    if (!result?.valid) {
      return
    }
  }

  // Last step
  if (isLastStep.value) {
    emit('finish')
    return
  }

  // Move to next step
  goNext()

  emit('change', step.value)
}

function prev() {
  previous()

  emit('change', step.value)
}

function confirm() {
  next()
}

provide('stepper', {
  step,

  currentStep: computed(() => {
    return step.value - 1
  }),

  totalSteps,

  isFirstStep,
  isLastStep,

  progress,

  next,
  previous: prev,
  goTo,
  reset,
})
</script>

<template>
  <div class="stepper-wizard">

    <div class="row justify-content-center mb-4" v-if="showHeader && headerTitle.length">

      <StepperHeader :step="step" :header_title="headerTitle" />

    </div>
    <!-- Current step -->
    <div class="wizard-content">

      <component :is="steps[step - 1]" v-if="steps.length" />

    </div>

    <!-- Navigation -->
    <div class="d-flex justify-content-between mt-4">

      <StepPrevious v-if="!isFirstStep" :action="prev" />

      <StepNext v-if="!isLastStep" :action="next" />

      <StepConfirm v-if="isLastStep" :action="confirm" />

    </div>

  </div>
</template>