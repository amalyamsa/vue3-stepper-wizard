import {
  computed,
  ref,
  unref,
} from 'vue'

export function useStepperForm(
  totalSteps,
  initialStep = 1
) {
  const step = ref(initialStep)

  const total = computed(() => {
    return Number(unref(totalSteps)) || 0
  })

  const isFirstStep = computed(() => {
    return step.value <= 1
  })

  const isLastStep = computed(() => {
    return step.value >= total.value
  })

  const progress = computed(() => {
    if (total.value <= 1) {
      return 100
    }

    return (
      ((step.value - 1) /
        (total.value - 1)) * 100
    )
  })

  function next() {
    if (step.value < total.value) {
      step.value++
    }
  }

  function previous() {
    if (step.value > 1) {
      step.value--
    }
  }

  function goTo(targetStep) {
    if (
      targetStep >= 1 &&
      targetStep <= total.value
    ) {
      step.value = targetStep
    }
  }

  function reset() {
    step.value = initialStep
  }

  return {
    step,
    total,
    isFirstStep,
    isLastStep,
    progress,
    next,
    previous,
    goTo,
    reset,
  }
}