<script setup>
import { ref, reactive, computed } from "vue";
import { StepperHeader, StepperWizard, Step, StepPrevious, StepConfirm, StepNext } from "@/components";
import { Step1, Step2, Step3 } from "@/views/steps";


import { Form } from "vee-validate";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const step = ref(1);
const maxStep = 4;

const headerTitle = reactive([
  "booking.booking_forms.stepper.applicant",
  "booking.booking_forms.stepper.step2",
  "booking.booking_forms.stepper.step3",
  "booking.booking_forms.stepper.step4"
]);

// ---------------- STEP NAVIGATION ----------------
async function handleNext(validate) {
  const { valid } = await validate();
  if (!valid) return;

  if (step.value < maxStep) {
    step.value++;
  }
}

function prevStep() {
  if (step.value > 1) step.value -= 1;
}

async function handleSubmit(validate) {
  const { valid } = await validate();

  if (!valid) return;

  await submitBooking();
}

// ---------------- SUBMIT BOOKING ----------------
async function submitBooking() {

  // logics for submitting the booking would go here, such as calling an API or updating the store.
}

</script>

<template>
  <section class="styled-form-section section mb-5">
    <div class="container">
      <!-- Step content -->
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10">
          <StepperHeader :step="step" :max-step="maxStep" :header_title="headerTitle" class="p-3" />
        </div>
        <div class="col-12">
          <div class="styled-card shadow-sm rounded position-relative">
            <!-- Stepper header -->

            <!-- Optional subtle background icon -->
            <i class="las la-user-md bg-icon"></i>
            <StepperWizard v-slot="{ validate }">
              <Step title="Step 1"><Step1 /></Step>
              <Step title="Step 2"><Step2 /></Step>
              <Step title="Step 3"><Step3 /></Step>             
            </StepperWizard>           
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===============================
   CARD BASE
================================= */
.styled-card {
  background: #fcfcfc;
  border-radius: 16px;
  box-shadow: 0px 4px 34px rgba(206, 206, 206, 0.25);
  position: relative;
  overflow: hidden;
  padding: clamp(18px, 4vw, 50px);
  transition: all 0.3s ease;
}

/* Background icon */
.bg-icon {
  position: absolute;
  font-size: 180px;
  color: #26afb2;
  opacity: 0.05;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* ===============================
   BUTTONS
================================= */
.btn-rounded {
  border-radius: 44px;
  padding: 0.55rem 1.8rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-primary {
  background-color: #26afb2;
  color: #fff;
  border: 1px solid #26afb2;
}

.btn-primary:hover {
  background-color: transparent;
  color: #26afb2;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

/* ===============================
   RESPONSIVE
================================= */

/* Large Tablets */
@media (max-width: 991.98px) {
  .styled-card {
    padding: 40px 30px;
  }
}

/* Tablets */
@media (max-width: 767.98px) {
  .styled-card {
    padding: 30px 20px;
    border-radius: 14px;
  }

  /* Stack navigation buttons */
  .styled-card .d-flex {
    flex-direction: column;
    gap: 14px;
  }

  .btn-rounded {
    width: 100%;
    font-size: 0.95rem;
  }

  .bg-icon {
    font-size: 120px;
    opacity: 0.04;
  }
}

/* Mobile */
@media (max-width: 575.98px) {
  .styled-card {
    padding: 22px 16px;
  }

  .btn-rounded {
    font-size: 0.9rem;
    padding: 0.6rem 1rem;
  }

  .bg-icon {
    font-size: 90px;
    opacity: 0.03;
  }
}

/* Very Small Devices */
@media (max-width: 400px) {
  .styled-card {
    padding: 18px 14px;
  }

  .btn-rounded {
    font-size: 0.85rem;
  }
}
</style>
