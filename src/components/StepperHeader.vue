<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const props = defineProps({
  step: { type: Number, required: true }, // 1-based current step
  header_title: { type: Array, required: true },
})

// const labels = ['Availability', 'Trip', 'Ferry Class', 'Passengers', 'Payment', 'Ticket']
const labels = props.header_title
const icons = [null, null, null, null, null, null]

const isCompleted = (i) => i + 1 < props.step
const isCurrent = (i) => i + 1 === props.step
</script>

<template>
  <nav aria-label="progress" class="stepper">
    <ul
      class="stepper-track list-unstyled d-flex flex-nowrap align-items-start justify-content-center justify-content-md-between gap-4 gap-md-3 m-0 p-2 p-md-3"
      role="list"
    >
      <li
        v-for="(label, i) in labels"
        :key="i"
        class="step-item d-inline-flex flex-column align-items-center"
        :class="{
          completed: isCompleted(i),
          current: isCurrent(i),
          upcoming: !isCompleted(i) && !isCurrent(i),
        }"
        :aria-current="isCurrent(i) ? 'step' : null"
      >
        <!-- Circle -->
        <span
          class="step-dot d-inline-flex align-items-center justify-content-center rounded-circle"
        >
          <template v-if="icons[i]?.emoji">
            <span class="step-emoji" aria-hidden="true">{{ icons[i].emoji }}</span>
          </template>
          <template v-else>
            <span class="fw-semibold">{{ i + 1 }}</span>
          </template>
        </span>

        <!-- Label below the circle (hidden on xs/sm, shown ≥ md) -->
        <span
          class="step-label d-none d-md-block text-center mt-2 small"
          :class="{ 'fw-semibold': isCurrent(i) }"
        >
          {{ t(label) }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.stepper-track {
  justify-content: center; /* default: centered on xs/sm */
  overflow-x: visible; /* no scrollbar now that it fits */
  scrollbar-width: thin;
}

@media (min-width: 768px) {
  .stepper-track {
    justify-content: space-between;
  }
}

/* Each step item is inline (no wrapping), spaced with gap from parent. */
.step-item {
  position: relative;
  flex: 0 0 auto; /* prevent wrapping into a new line on small screens */
}

/* On medium and up, distribute space more evenly */
@media (min-width: 768px) {
  .stepper-track {
    justify-content: space-between;
  }
  .step-item {
    flex: 1 1 0;
    min-width: 0;
  }
}

/* Circle sizes */
.step-dot {
  position: relative;
  width: 40px;
  height: 40px;
  min-width: 40px;
  font-size: 0.95rem;
  z-index: 2; /* above the connector */
  background-color: #fff; /* mask the line under all states */
}
@media (max-width: 575.98px) {
  .step-dot {
    width: 30px;
    height: 30px;
    min-width: 30px;
    font-size: 0.9rem;
  }
}

/* states */
.step-item.completed .step-dot {
  background-color: #fff;
  color: #4fa633;
  border: 2px solid #4fa633;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.1);
}
.step-item.current .step-dot {
  background-color: #26afb2;
  color: #fff;
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.18);
}
.step-item.upcoming .step-dot {
  background-color: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}
/* --- Connectors (line between circles) --- */
.step-item::after {
  content: '';
  position: absolute;
  z-index: 0; /* behind the dot */
  top: 20px; /* center for 40px dot */
  left: calc(50% + 25px);
  width: calc(100% - 40px);
  border-top: 2px dashed #dee2e6;
}

/* On small screens (tight spacing), make connector span the gap */
@media (max-width: 767.98px) {
  .step-item::after {
    top: 15px; /* center for 30px dot */
    left: calc(50% + 15px); /* start at dot edge */
    width: 28px; /* bridge the small gap */
  }
}

/* No connector after the last step */
.step-item:last-child::after {
  content: none;
}

/* Completed steps get a solid green connector forward */
.step-item.completed::after {
  border-top-style: dashed;
  border-top-color: #4fa633;
}

/* Connector after the current step stays dashed gray (indicating upcoming) */
.step-item.current::after {
  border-top-style: dashed;
  border-top-color: #dee2e6;
}
</style>
