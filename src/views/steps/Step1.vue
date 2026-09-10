<script setup>
import { computed, reactive, ref, watch, watchEffect } from "vue";
import { Field, ErrorMessage } from "vee-validate";
// import { useBookingsStore } from "@/stores/bookings";
// import { storeToRefs } from "pinia";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";
// import { useSplashStore } from "@/stores/splash.store";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
// const splashStore = useSplashStore();
// // ----------- Stores & Refs -----------
// const bookingsStore = useBookingsStore();
// const { occupationalForm } = storeToRefs(bookingsStore);
// const {
//   firstNameRules,
// } = useFormValidation(occupationalForm);
const details = reactive({
  first_name:''
})

</script>

<template>
  <h5 class="mb-3">1: {{ t("Step1") }}</h5>

  <!-- Full Name -->
  <div class="row g-3 mb-2">
    <div class="col-12 col-md-4">
      <label class="form-label">{{ t("Name") }}</label>
      <Field
        name="first_name"
        type="text"
        class="form-control large-input"
        v-model="details.first_name"
        :placeholder="t('Enter Name')"
        :rules="firstNameRules"
      />
      <ErrorMessage name="first_name" class="text-danger small" />
    </div>

  </div>


</template>

<style scoped>
.file-theme::file-selector-button {
  background-color: #26afb2;
  color: #fff;
  border: none;
  /* padding: 0.5rem 1rem; */
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.file-theme::file-selector-button:hover {
  background-color: #fff !important;
  color: #26afb2 !important;
}

.file-theme:hover {
  background-color: #fff !important;
  color: #26afb2 !important;
}

.file-theme:active::file-selector-button {
  background-color: #1f8c99;
  color: #fff;
}

.primary {
  color: #26afb2;
}

.download-btn {
  border: 1px solid #ced4da;
  color: #26afb2;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
}

.download-btn:hover {
  background-color: #26afb2;
  color: #fff;
}

.large-input {
  height: 45px;
  font-size: 1rem;
  padding: 0.6rem 1rem;
}

:deep(.mx-input) {
  height: 45px !important;
  font-size: 1rem !important;
  color: #151616 !important;
  background-color: #fff !important;
  background-clip: padding-box !important;
  border: 1px solid #ddd !important;
  border-radius: 0.375rem !important;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  box-shadow: inset 0 1px 0px rgba(0, 0, 0, 0.001) !important;
}

.radio-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  flex: 1 1 220px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  min-width: 180px;
}

.radio-card input {
  display: none;
}

.radio-card.selected {
  border-color: #26afb2;
  background-color: #f0fbfb;
}

.radio-card:hover {
  border-color: #26afb2;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon img {
  width: 40px;
  height: 40px;
}

.title {
  font-weight: 600;
  color: #212529;
}

.desc {
  font-size: 0.85rem;
}
</style>
