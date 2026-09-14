<script setup>
import { reactive, inject } from 'vue'
import {
  StepperWizard,
  Step,
} from '../components'

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
  <section class="space-bottom section">
    <div class="container-div">
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
  </section>
</template>

<style scoped>
section{
  padding-top: 60px;
  margin-bottom: 2rem;
}

.styled-card {
  position: relative;
  background: #fff;
}

.accept-state {
  border: 1px solid var(--theme-color) !important;
  background-color: var(--theme-color) !important;
}

.shadow-sm {
  box-shadow: var(--bs-box-shadow-sm) !important;
}

.position-relative {
  position: relative !important;
}

.rounded {
  border-radius: 0.375rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.container-div {
  padding-left: calc(1.5rem * .5);
  padding-right: calc(1.5rem * .5);
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

@media (max-width: 1200px) {
  .container-div {
    max-width: 980px;
  }
}
@media (min-width: 1201px) {
  .container-div {
    max-width: 1160px;
  }
}

</style>
