<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useBookingsStore } from "@/stores/bookings";
import { storeToRefs } from "pinia";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";
import { useSplashStore } from "@/stores/splash.store";
import { useI18n } from "vue-i18n";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

const { t } = useI18n();
const splashStore = useSplashStore();
// ----------- Stores & Refs -----------
const bookingsStore = useBookingsStore();
const { occupationalForm } = storeToRefs(bookingsStore);
const {
  firstNameRules,
  secondNameRules,
  lastNameRules,
  genderRules,
  dobRules,
  occupationalDobRules,
  phoneRules,
  citizenTypeRules,
  nationalityRules,
  identityTypeRules,
  idNumberRules,
  jobTypeRules,
  traineeRules,
  photoRules,
} = useFormValidation(occupationalForm);

// ----------- Computed Splash Options -----------

const gender_types = computed(() => splashStore.splash.gender);
const nationalities = computed(() => splashStore.splash.nationalities);
const job_types = computed(() => splashStore.splash.job_types);
const citizen_types = computed(() => splashStore.splash.citizen_types);
const isFoodHandler = ref("32E7773C-3147-4079-8DD4-10F0E3E43C7C");
const isNonFoodHandler = ref("B0A17E2F-D607-44C6-9C85-713AB39C9C8B");
const isForeign = ref("FF76228D-A532-4D73-AE66-4C77CB5480B5");
const isPassport = ref("61FB1E47-C639-40E7-90F9-258345FCA575");

const selectedCitizenType = computed(() => {
  const list = citizen_types.value;

  if (!Array.isArray(list)) return null;

  return list.find(type => type.id === occupationalForm.value.citizen_type) || null;
});

const filteredJobTypes = computed(() => {
  const jobs = job_types.value || [];
  const isForeignCitizen = occupationalForm.value.citizen_type === isForeign.value;

  return jobs.filter(job => {
    const name = job.name?.toLowerCase() || "";

    const isLocalJob = name.includes("local");
    const isForeignJob = name.includes("foreigner");

    // Foreign citizen → hide LOCAL jobs
    if (isForeignCitizen) {
      return !isLocalJob;
    }

    // Local citizen → hide FOREIGN jobs
    return !isForeignJob;
  });
});

const selectedPackage = computed(() => {
  const jobId = occupationalForm.value.job_type;

  if (!jobId || !Array.isArray(job_types.value)) {
    return null;
  }

  return job_types.value.find(job => job.id == jobId) || null;
});

watch(
  selectedPackage,
  pkg => {
    occupationalForm.value.selectedPackage = pkg;
  },
  { immediate: true }
);

const disableFuture = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // ignore time
  return date > today; // disable dates AFTER today
};
</script>

<template>
  <h5 class="mb-3">1: {{ t("booking.booking_forms.step_1.title") }}</h5>

  <!-- Full Name -->
  <div class="row g-3 mb-2">
    <div class="col-12 col-md-4">
      <label class="form-label">{{ t("booking.booking_forms.step_1.label_1") }}</label>
      <Field
        name="first_name"
        type="text"
        class="form-control large-input"
        v-model="occupationalForm.first_name"
        :placeholder="t('booking.booking_forms.step_1.placeholder_1')"
        :rules="firstNameRules"
      />
      <ErrorMessage name="first_name" class="text-danger small" />
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_2") }}
      </label>
      <Field
        name="second_name"
        type="text"
        class="form-control large-input"
        v-model="occupationalForm.second_name"
        :placeholder="t('booking.booking_forms.step_1.placeholder_2')"
        :rules="secondNameRules"
      />
      <ErrorMessage name="second_name" class="text-danger small" />
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_3") }}
      </label>
      <Field
        name="last_name"
        type="text"
        class="form-control large-input"
        v-model="occupationalForm.last_name"
        :placeholder="t('booking.booking_forms.step_1.placeholder_3')"
        :rules="lastNameRules"
      />
      <ErrorMessage name="last_name" class="text-danger small" />
    </div>
  </div>

  <!-- Gender, Citizen, Phone -->
  <div class="row g-3 mb-2">
    <div class="col-12 col-md-4">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_4") }}
      </label>
      <Field
        as="select"
        name="gender"
        class="form-select large-input"
        v-model="occupationalForm.gender"
        :rules="genderRules"
      >
        <option value="" disabled>
          {{ t("booking.booking_forms.step_1.placeholder_4") }}
        </option>
        <option v-for="(gender, gidx) in gender_types" :key="gidx" :value="gender.id">
          {{ gender.name }}
        </option>
      </Field>
      <ErrorMessage name="gender" class="text-danger small" />
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_5") }} </label
      ><br />
      <Field
        name="dob"
        v-slot="{ field }"
        :rules="occupationalDobRules"
        v-model="occupationalForm.dob"
      >
        <DatePicker
          v-bind="field"
          :disabled-date="disableFuture"
          value-type="YYYY-MM-DD"
          format="DD-MM-YYYY"
          :placeholder="t('booking.booking_forms.step_1.placeholder_5')"
          class="mx-datepicker large-input w-100 p-0"
        />
      </Field>
      <ErrorMessage name="dob" class="text-danger small" />
    </div>

    <div class="col-12 col-md-4">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_6") }}
      </label>
      <Field
        name="phone_number"
        type="tel"
        class="form-control large-input"
        v-model="occupationalForm.phone_number"
        :placeholder="t('booking.booking_forms.step_1.placeholder_6')"
        maxlength="10"
        :rules="phoneRules"
      />
      <ErrorMessage name="phone_number" class="text-danger small" />
    </div>
  </div>

  <!-- Citizenship & IDS -->
  <div class="row g-3 mb-2">
    <div
      class="col-12"
      :class="occupationalForm.citizen_type === isForeign ? 'col-md-3' : 'col-md-6'"
    >
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_7") }}
      </label>
      <Field
        as="select"
        name="citizen_type"
        class="form-select large-input"
        v-model="occupationalForm.citizen_type"
        :rules="citizenTypeRules"
      >
        <option value="" disabled>
          {{ t("booking.booking_forms.step_1.placeholder_7") }}
        </option>
        <option v-for="(citizen, cidx) in citizen_types" :key="citizen.id" :value="citizen.id">
          {{ citizen.name }}
        </option>
      </Field>
      <ErrorMessage name="citizen_type" class="text-danger small" />
    </div>

    <div class="col-12 col-md-3" v-if="occupationalForm.citizen_type === isForeign">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_8") }}
      </label>
      <Field
        as="select"
        name="nationality"
        class="form-select large-input"
        v-model="occupationalForm.nationality"
        :rules="nationalityRules"
      >
        <option value="" disabled>
          {{ t("booking.booking_forms.step_1.placeholder_8") }}
        </option>
        <option v-for="(nationality, nidx) in nationalities" :key="nidx" :value="nationality.id">
          {{ nationality.name }}
        </option>
      </Field>
      <ErrorMessage name="nationality" class="text-danger small" />
    </div>

    <div class="col-12" :class="occupationalForm.identity_type ? 'col-md-3' : 'col-md-6'">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_9") }}
      </label>
      <Field
        as="select"
        name="identity_type"
        class="form-select large-input"
        v-model="occupationalForm.identity_type"
        :rules="identityTypeRules"
        :disabled="!occupationalForm.citizen_type"
      >
        <option value="" disabled>
          {{ t("booking.booking_forms.step_1.placeholder_9") }}
        </option>

        <option
          v-for="identity in selectedCitizenType?.identity_types || []"
          :key="identity.id"
          :value="identity.id"
        >
          {{ identity.name }}
        </option>
      </Field>

      <ErrorMessage name="identity_type" class="text-danger small" />
    </div>

    <div class="col-12 col-md-3" v-if="occupationalForm.identity_type">
      <label class="form-label">{{
        occupationalForm.identity_type === isPassport
          ? t("booking.booking_forms.step_1.label_10")
          : t("booking.booking_forms.step_1.label_11")
      }}</label>
      <Field
        name="id_number"
        type="text"
        class="form-control large-input"
        v-model="occupationalForm.id_number"
        maxlength="20"
        :placeholder="
          occupationalForm.identity_type === isPassport
            ? t('booking.booking_forms.step_1.placeholder_10')
            : t('booking.booking_forms.step_1.placeholder_11')
        "
        :rules="idNumberRules"
      />
      <ErrorMessage name="id_number" class="text-danger small" />
    </div>
  </div>

  <!-- Job Type & Trainee -->
  <div class="row g-3 mb-2">
    <div class="col-12">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_12") }}
      </label>
      <Field
        as="select"
        name="job_type"
        class="form-select large-input"
        v-model="occupationalForm.job_type"
        :rules="jobTypeRules"
        :disabled="!occupationalForm.citizen_type"
      >
        <option value="" disabled>
          {{ t("booking.booking_forms.step_1.placeholder_12") }}
        </option>
        <option v-for="(job, jidx) in filteredJobTypes" :key="jidx" :value="job.id">
          {{ job.name }}
        </option>
      </Field>
      <ErrorMessage name="job_type" class="text-danger small" />
    </div>
  </div>

  <!-- Photo Upload -->
  <div class="row g-2 mb-3">
    <div class="col-12">
      <label class="form-label">
        {{ t("booking.booking_forms.step_1.label_17") }}
      </label>
      <Field name="photo" v-slot="{ handleChange }" :rules="photoRules">
        <input
          type="file"
          class="form-control large-input"
          accept="image/*"
          @change="
            e => {
              occupationalForm.photo = e.target.files[0];
              handleChange(e);
            }
          "
        />
      </Field>
      <ErrorMessage name="photo" class="text-danger small" />
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
