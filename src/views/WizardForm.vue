<script setup>
import { reactive, inject } from 'vue'
import {
  StepperHeader,
  StepperWizard,
  Step,
} from '@/components'

import {
  Step1,
  Step2,
  Step3,
} from '@/views/steps'

import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const headerTitle = reactive([
  'Step1',
  'Step2',
  'Step3',
])

async function handleFinish() {
  await submitBooking()
}

async function submitBooking() {
  // Submit booking here
}
</script>

<template>
  <section class="styled-form-section section mb-5">
    <div class="container">
      <div class="row justify-content-center">
        

        <div class="col-12">
          <div class="styled-card shadow-sm rounded position-relative">
            <i class="las la-user-md bg-icon"></i>

            <Form v-slot="{ validate }">
              <StepperWizard :header-title="headerTitle" :validate="validate" @finish="handleFinish">
                <Step title="Step 1">
                  <Step1 />
                </Step>

                <Step title="Step 2">
                  <Step2 />
                </Step>

                <Step title="Step 3">
                  <Step3 />
                </Step>
              </StepperWizard>
            </Form>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>