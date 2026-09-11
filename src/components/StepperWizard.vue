<script setup>
import {
  computed,
  provide,
  ref,
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

/*
|--------------------------------------------------------------------------
| Registered steps
|--------------------------------------------------------------------------
*/

const registeredSteps = ref([])

function registerStep(stepData) {
  const index = registeredSteps.value.length

  registeredSteps.value.push({
    index,
    title: stepData.title,
    validate: stepData.validate,
  })

  return index
}

function unregisterStep(index) {
  registeredSteps.value = registeredSteps.value.filter(
    item => item.index !== index
  )
}

const totalSteps = computed(() => {
  return registeredSteps.value.length
})

/*
|--------------------------------------------------------------------------
| Stepper
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Validation
|--------------------------------------------------------------------------
*/

async function validateCurrentStep() {
  const currentStep = registeredSteps.value.find(
    item => item.index === step.value - 1
  )

  console.log(
    '[StepPerform] Current step:',
    step.value
  )

  console.log(
    '[StepPerform] Registered step:',
    currentStep
  )

  /*
   * Step-specific validation
   */
  if (currentStep?.validate) {
    const result = await currentStep.validate()

    console.log(
      '[StepPerform] Validation result:',
      result
    )

    /*
     * Boolean validator
     */
    if (typeof result === 'boolean') {
      return result
    }

    /*
     * VeeValidate-style result:
     *
     * {
     *   valid: true/false,
     *   errors: {}
     * }
     */
    if (
      result &&
      typeof result === 'object' &&
      'valid' in result
    ) {
      return result.valid === true
    }

    /*
     * Unknown result = valid
     */
    return true
  }

  /*
   * Optional global validator
   */
  if (props.validate) {
    const result = await props.validate()

    console.log(
      '[StepPerform] Global validation result:',
      result
    )

    if (typeof result === 'boolean') {
      return result
    }

    if (
      result &&
      typeof result === 'object' &&
      'valid' in result
    ) {
      return result.valid === true
    }

    return true
  }

  return true
}

/*
|--------------------------------------------------------------------------
| Next
|--------------------------------------------------------------------------
*/

async function next() {
  const valid = await validateCurrentStep()

  console.log(
    '[StepPerform] Can continue:',
    valid
  )

  if (!valid) {
    return
  }

  if (isLastStep.value) {
    emit('finish')
    return
  }

  goNext()

  emit('change', step.value)
}

/*
|--------------------------------------------------------------------------
| Previous
|--------------------------------------------------------------------------
*/

function prev() {
  previous()

  emit('change', step.value)
}

/*
|--------------------------------------------------------------------------
| Confirm
|--------------------------------------------------------------------------
*/

function confirm() {
  next()
}

/*
|--------------------------------------------------------------------------
| Provide
|--------------------------------------------------------------------------
*/

provide('stepper', {
  step,

  currentStep: computed(() => {
    return step.value - 1
  }),

  totalSteps,

  isFirstStep,
  isLastStep,

  progress,

  registerStep,
  unregisterStep,

  next,
  previous: prev,
  goTo,
  reset,
})
</script>

<template>
  <div class="stepper-wizard">

    <!-- Header -->
    <div
      v-if="showHeader && headerTitle.length"
      class="row justify-content-center mb-4"
    >
      <StepperHeader
        :step="step"
        :header_title="headerTitle"
      />
    </div>

    <!-- Steps -->
    <div class="wizard-content">

      <slot />

    </div>

    <!-- Navigation -->
    <div class="d-flex justify-content-between mt-4">

      <StepPrevious
        v-if="!isFirstStep"
        :action="prev"
      />

      <StepNext
        v-if="!isLastStep"
        :action="next"
      />

      <StepConfirm
        v-if="isLastStep"
        :action="confirm"
      />

    </div>

  </div>
</template>