<script setup>
import { Field, ErrorMessage } from "vee-validate";
import { ref, computed, watch, onMounted } from "vue";
import { useBookingsStore } from "@/stores/bookings";
import { storeToRefs } from "pinia";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";
import { useDateFormat } from "@/composables/useDateFormat";
import { useSplashStore } from "@/stores/splash.store";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const splashStore = useSplashStore();
const bookingsStore = useBookingsStore();
const { occupationalForm } = storeToRefs(bookingsStore);

const { dateFormat } = useDateFormat();
const { testCenterRules, testDateRules, slotRules } = useFormValidation(occupationalForm);

const test_centers = computed(() => splashStore.splash.test_centers);

// Slots state
const slots = ref([]);
const loadingSlots = ref(false);


// ==============================
//  RESTORE SLOTS ON MOUNT (BACK NAV)
// ==============================
onMounted(async () => {
  const { test_date, test_center } = occupationalForm.value;

  if (test_date && test_center) {
    loadingSlots.value = true;
    try {
      await bookingsStore.getSlots({
        test_date,
        center_id: test_center,
      });
      slots.value = bookingsStore.slot_availability || [];
    } catch (err) {
      console.error(err);
      slots.value = [];
    } finally {
      loadingSlots.value = false;
    }
  }
});


// ==============================
//  WATCH DATE + CENTER
// ==============================
watch(
  () => ({
    date: occupationalForm.value.test_date,
    center: occupationalForm.value.test_center,
  }),
  async (newVal, oldVal) => {
    if (!oldVal) return; // skip initial mount

    const { date, center } = newVal;
    if (!date || !center) {
      slots.value = [];
      return;
    }

    loadingSlots.value = true;
    try {
      await bookingsStore.getSlots({ test_date: date, center_id: center });
      slots.value = bookingsStore.slot_availability || [];

      //  Keep slot if still valid
      const valid = slots.value.some(s => s.slot_id === occupationalForm.value.slot);
      if (!valid) {
        occupationalForm.value.slot = null;
        occupationalForm.value.vip_service = false;
      }

    } catch (err) {
      console.error(err);
      slots.value = [];
    } finally {
      loadingSlots.value = false;
    }
  },
  { deep: true }
);


// ==============================
//  WATCH CENTER CHANGE ONLY
// ==============================
watch(
  () => occupationalForm.value.test_center,
  (newVal, oldVal) => {
    if (newVal === oldVal) return;

    occupationalForm.value.test_date = null;
    occupationalForm.value.slot = null;
    occupationalForm.value.vip_service = false;
    slots.value = [];
  }
);


// ==============================
//  APPOINTMENT SUMMARY
// ==============================
const appointmentSummary = computed(() => {
  const { test_date, slot, test_center } = occupationalForm.value || {};
  if (!test_date || !slot || !test_center) return null;

  const center = splashStore.splash.test_centers.find(c => c.id === test_center);
  const centerName = center ? center.name : test_center;

  const slotObj = slots.value.find(s => s.slot_id === slot);
  const slotTime = slotObj ? slotObj.slot_time : slot;
  occupationalForm.value.slot_time = slotTime;

  let summary = `${centerName} at ${slotTime} on ${dateFormat(test_date)}`;
  if (occupationalForm.value.vip_service) summary += " (* VIP Service *)";

  return summary;
});


// ==============================
//  DISABLE PAST & SUNDAYS
// ==============================
const disablePastAndSundays = date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  return d < today || d.getDay() === 0;
};
</script>

<template>
  <h5 class="mb-3">3: {{ t("booking.booking_forms.step_3.title") }}</h5>

  <!-- Test Date -->
  <div class="row g-2 mb-3">
    <div class="col-12 mb-2">
      <label class="form-label">{{ t("booking.booking_forms.step_3.label_1") }}</label>
      <Field
        as="select"
        name="test_center"
        class="form-select large-input"
        v-model="occupationalForm.test_center"
        :rules="testCenterRules"
      >
        <option value="" disabled>{{ t("booking.booking_forms.step_3.placeholder_1") }}</option>
        <option v-for="(center, cidx) in test_centers" :key="center.id" :value="center.id">
          {{ center.name }}
        </option>
      </Field>
      <ErrorMessage name="test_center" class="text-danger small" />
    </div>

    <div class="col-12">
      <label class="form-label">{{ t("booking.booking_forms.step_3.label_2") }}</label>

      <Field
        name="test_date"
        v-slot="{ field }"
        :rules="testDateRules"
        v-model="occupationalForm.test_date"
      >
        <DatePicker
          v-bind="field"
          :disabled-date="disablePastAndSundays"
          value-type="YYYY-MM-DD"
          format="DD-MM-YYYY"
          :placeholder="t('booking.booking_forms.step_3.placeholder_2')"
          class="mx-datepicker large-input w-100 p-0"
          :disabled="!occupationalForm.test_center"
        />
      </Field>
      <ErrorMessage name="test_date" class="text-danger small" />
    </div>
  </div>

  <!-- Slots Section -->
  <div v-if="occupationalForm.test_date" class="row g-3">
    <label class="form-label mb-0">{{ t("booking.booking_forms.step_3.label_3") }}</label>

    <!-- Loader -->
    <div v-if="loadingSlots" class="text-muted small">
      {{ t("Loading available slots...") }}
    </div>

    <!-- No slots -->
    <div v-else-if="!slots.length" class="text-danger small">
      {{ t("No slots available for selected date.") }}
    </div>
    <!-- Slots -->
    <div v-for="slot in slots" :key="slot.slot_id" class="col-6 col-sm-4 col-md-3 col-xl-2 d-flex">
      <button
        type="button"
        class="slot-card w-100 position-relative"
        @click="
          () => {
            occupationalForm.slot = slot.slot_id;
            occupationalForm.vip_service = false;
          }
        "
        :disabled="slot.allocations === 0"
        :class="{
          selected: occupationalForm.slot === slot.slot_id,
          disabled: slot.allocations === 0,
        }"
        :selected="occupationalForm.slot === slot.slot_id"
      >
        <span class="slot-badge">{{ slot.allocations }}</span>

        <span v-if="occupationalForm.slot === slot.slot_id" class="check-icon">
          <i class="fa fa-check" style="font-size: small"></i>
        </span>

        <div class="fw-semibold small text-center">
          {{ slot.slot_time }}
        </div>
      </button>
    </div>

    <!-- Hidden field for validation -->
    <Field name="slot" v-model="occupationalForm.slot" type="hidden" :rules="slotRules" />
    <ErrorMessage name="slot" class="text-danger small" />
  </div>

  <!-- VIP Service Option -->
  <div v-if="occupationalForm.slot" class="vip-service mt-3">
    <Field name="vip_service" type="checkbox">
      <label class="d-flex align-items-center gap-2">
        <input type="checkbox" v-model="occupationalForm.vip_service" />
        {{ t("booking.booking_forms.step_3.vip_title") }}
      </label>
    </Field>

    <small class="text-muted">
      {{ t("booking.booking_forms.step_3.vip_subtitle") }}
    </small>
  </div>
  <!-- Appointment Summary -->
  <div v-if="appointmentSummary" class="appointment-summary mt-3">
    <strong>{{ t("booking.booking_forms.step_3.title") }}:</strong><br />
    {{ appointmentSummary }}
  </div>
</template>

<style scoped>
.primary {
  color: #26afb2;
}

.vip-service {
  border: 1px dashed #ffc107;
  background: #fff8e1;
  padding: 12px;
  border-radius: 6px;
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

.slot-card {
  border: 1px dashed #c3c3c4;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: #fff;
}

.slot-card.selected {
  border-color: #26afb2;
  background-color: #e6f7f7;
  transform: scale(1.05);
}

.slot-card:hover {
  border-color: #26afb2;
}

.slot-card.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f8f9fa;
}

/* Badge */
.slot-badge {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
  background-color: #26afb2;
  color: #fff;
  font-size: 11px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.check-icon {
  position: absolute;
  bottom: 4px;
  right: 6px;
  color: #26afb2;
}

.appointment-summary {
  border: 2px dashed #26afb24d;
  padding: 20px;
  border-radius: 8px;
  background: #f0fbfb70;
}
</style>
