<script setup>
import { reactive, inject } from 'vue'
import {
  StepperWizard,
  Step,
} from '@/components'

import {
  Step1,
  Step2,
  Step3,
} from '@/views/steps'

import { Form } from 'vee-validate'

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
  <section class="space-bottom section mb-5" style="padding-top: 60px;">
    <div class="container">
     
      <div class="row justify-content-center">

        <div class="col-12">
          <div class="styled-card shadow-sm rounded position-relative p-4">
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

<style scoped>
.styled-card {
  position: relative;
  background: #fff;
}

.accept-state {
  border: 1px solid var(--theme-color) !important;
  background-color: var(--theme-color) !important;
}
</style>
