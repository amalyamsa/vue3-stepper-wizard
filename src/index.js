
import StepperHeader from '@/components/StepperHeader.vue'
import StepperWizard from '@/components/StepperWizard.vue'
import Step from '@/components/Step.vue'
import StepPrevious from '@/components/StepPrevious.vue'
import StepNext from '@/components/StepNext.vue'
import StepConfirm from '@/components/StepConfirm.vue'

import { useStepperForm } from '@/composables/useStepperForm'

export {
  StepperHeader,
  StepperWizard,
  Step,
  StepPrevious,
  StepNext,
  StepConfirm,
  useStepperForm
}

export default {
  install(app) {
    app.component('StepperForm', StepperForm)
    app.component('StepperHeader', StepperHeader)
    app.component('StepperWizard', StepperWizard)
    app.component('Step', Step)
    app.component('StepPrevious', StepPrevious)
    app.component('StepNext', StepNext)
    app.component('StepConfirm', StepConfirm)
  },
}