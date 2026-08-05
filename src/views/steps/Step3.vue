<script setup>
import { computed } from "vue";
import { useBookingsStore } from "@/stores/bookings";
import { storeToRefs } from "pinia";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";
import { Field, ErrorMessage } from "vee-validate";
import { useSplashStore } from "@/stores/splash.store";
import { useDateFormat } from "@/composables/useDateFormat";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const { dateFormat } = useDateFormat();
const splashStore = useSplashStore();
const bookingsStore = useBookingsStore();
const { occupationalForm } = storeToRefs(bookingsStore);
const { confirmRules } = useFormValidation(occupationalForm);

const photoPreview = computed(() => {
  const file = occupationalForm.value.photo;

  if (!file) return null;

  // If vee-validate wrapped it in array
  const selectedFile = Array.isArray(file) ? file[0] : file;

  if (selectedFile instanceof File) {
    return URL.createObjectURL(selectedFile);
  }

  return null;
});

// get nameBy Ids

const centerName = computed(() => {
  const id = occupationalForm.value?.test_center;
  if (!id) return null;
  const center = splashStore.splash.test_centers.find(c => c.id === id);
  return center?.name || null;
});

const nationalityName = computed(() => {
  const id = occupationalForm.value?.nationality;
  if (!id) return null;
  const nationality = splashStore.splash.nationalities.find(c => c.id === id);
  return nationality?.name || null;
});

const genderName = computed(() => {
  const genderId = occupationalForm.value?.gender;
  if (!genderId) return null;

  const g = splashStore.splash.gender.find(g => g.id === genderId);
  return g?.name || null;
});

const citizenTypeName = computed(() => {
  const citizenId = occupationalForm.value?.citizen_type;
  if (!citizenId) return "Not Selected";

  const citizen = splashStore.splash.citizen_types.find(c => c.id === citizenId);
  return citizen?.name || "Not Selected";
});

const idTypeName = computed(() => {
  const citizenId = occupationalForm.value?.citizen_type;
  const idTypeId = occupationalForm.value?.identity_type;

  if (!citizenId || !idTypeId) return "Not Entered";

  const citizen = splashStore.splash.citizen_types.find(c => c.id === citizenId);

  if (!citizen || !citizen.identity_types) return "Not Entered";

  const idType = citizen.identity_types.find(idt => idt.id === idTypeId);
  return idType?.name || "Not Entered";
});

const jobTypeName = computed(() => {
  const id = occupationalForm.value?.job_type;
  const job = splashStore.splash.job_types.find(j => j.id === id);
  return job?.name || "Not Selected";
});
</script>

<template>
  <h5 class="mb-3">3: {{ t("booking.booking_forms.step_4.title") }}</h5>

  <div class="summary-wrapper p-3 p-md-4">
    <!-- STEP 1 -->
    <h5 class="summary-title mb-3">{{ t("booking.booking_forms.step_3.title") }}</h5>

    <div class="row g-3 mb-4">
      <div class="col-12 col-sm-6 col-md-4">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_3.label_2") }}</small>
          <div class="value">{{ dateFormat(occupationalForm.test_date) || "Not Selected" }}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_4.label_1") }}</small>
          <div class="value">{{ occupationalForm.slot_time || "Not Selected" }}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_3.label_1") }}</small>
          <div class="value">{{ centerName || "Migombani Test Center" }}</div>
        </div>
      </div>
    </div>

    <!-- STEP 2: Personal Details -->
    <h5 class="summary-title mb-3">{{ t("booking.booking_forms.step_1.title") }}</h5>

    <div class="row g-3 flex-wrap align-items-start">
      <!-- Left: Personal Details -->
      <div class="col-12 col-md-9">
        <div class="row g-3">
          <div class="col-12 col-sm-6">
            <div class="summary-item">
              <small>{{ t("booking.booking_forms.step_4.label_2") }}</small>
              <div class="value">
                {{ occupationalForm.first_name || "Not Entered" }}
                {{ occupationalForm.second_name || "" }} {{ occupationalForm.last_name || "" }}
              </div>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="summary-item">
              <small>{{ t("booking.booking_forms.step_1.label_4") }}</small>
              <div class="value">{{ genderName || "Not Selected" }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="summary-item">
              <small>{{ t("booking.booking_forms.step_1.label_5") }}</small>
              <div class="value">{{ dateFormat(occupationalForm.dob) || "Not Entered" }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <div class="summary-item">
              <small>{{ t("booking.booking_forms.step_1.label_6") }}</small>
              <div class="value">{{ occupationalForm.phone_number || "Not Entered" }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Photo -->
      <div class="col-12 col-sm-4 col-md-3 text-center mb-3 mb-md-0">
        <div class="summary-item p-2">
          <small>{{ t("booking.booking_forms.step_4.label_3") }}</small>
          <img v-if="photoPreview" :src="photoPreview" class="photo-preview mx-auto" />
          <img
            v-else
            src="https://via.placeholder.com/120x120.png?text=Photo"
            class="photo-preview mx-auto"
          />
        </div>
      </div>
    </div>

    <!-- Citizenship & ID -->
    <div class="row g-3 mt-2">
      <div class="col-12 col-sm-6 col-md-3">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_1.label_7") }}</small>
          <div class="value">{{ citizenTypeName || "Not Selected" }}</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-md-3">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_1.label_8") }}</small>
          <div class="value">
            {{ occupationalForm.nationality ? nationalityName : "Tanzania" }}
          </div>
        </div>
      </div>

      <div
        :class="
          occupationalForm.citizen_type ? 'col-12 col-sm-6 col-md-3' : 'col-12 col-sm-6 col-md-6'
        "
      >
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_1.label_9") }}</small>
          <div class="value">{{ idTypeName || "Not Entered" }}</div>
        </div>
      </div>

      <div v-if="occupationalForm.identity_type" class="col-12 col-sm-6 col-md-3">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_1.label_11") }}</small>
          <div class="value">{{ occupationalForm.id_number || "Not Entered" }}</div>
        </div>
      </div>
    </div>

    <!-- Job Type & Trainee -->
    <div class="row g-3 mt-2">
      <div class="col-12">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_1.label_12") }}</small>
          <div class="value">{{ jobTypeName || "Not Selected" }}</div>
        </div>
      </div>

      <!-- <div class="col-12 col-sm-6" v-if="occupationalForm.isTrainee === 'yes'">
        <div class="summary-item">
          <small>{{ t("booking.booking_forms.step_4.label_4") }}</small>
          <div class="value">
            {{ occupationalForm.isTrainee || t("booking.booking_forms.step_1.yes") }}
          </div>
        </div>
      </div> -->
    </div>

    <!-- Confirm Checkbox -->
    <div class="mt-4">
      <div class="alert alert-warning small mb-3">
        <strong>{{ t("booking.booking_forms.step_4.important") }}:</strong>
        {{ t("booking.booking_forms.step_4.notice") }}
      </div>
      <Field name="isConfirmed" type="checkbox" :rules="confirmRules">
        <label class="d-flex align-items-center gap-2 flex-wrap">
          <input type="checkbox" v-model="occupationalForm.isConfirmed" />
          {{ t("booking.booking_forms.step_4.confirm") }}
        </label>
      </Field>
      <ErrorMessage name="isConfirmed" class="text-danger small mt-1" />
    </div>
  </div>
</template>

<style scoped>
.photo-preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-top: 8px;
}

.summary-wrapper {
  border: 2px dashed #c4c3c33d;
  border-radius: 8px;
  background: #fff;
}

.summary-title {
  color: #26afb2;
  font-weight: 600;
}

.summary-item {
  border: 1px dashed #e0e0e0;
  padding: 12px;
  border-radius: 6px;
  background: #fafafa;
}

.summary-item small {
  display: block;
  color: #6c757d;
  font-size: 12px;
  margin-bottom: 4px;
}

.summary-item .value {
  font-weight: 600;
  color: #212529;
}
</style>
