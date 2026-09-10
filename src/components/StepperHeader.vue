<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  header_title: {
    type: Array,
    required: true,
  },
})

const labels = props.header_title

const icons = [null, null, null, null, null, null]

const isCompleted = (i) => {
  return i + 1 < props.step
}

const isCurrent = (i) => {
  return i + 1 === props.step
}
</script>

<template>
  <nav
    class="stepper"
    aria-label="progress"
  >
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
        <span
          class="step-dot d-inline-flex align-items-center justify-content-center rounded-circle"
        >
          <template v-if="icons[i]?.emoji">
            <span
              class="step-emoji"
              aria-hidden="true"
            >
              {{ icons[i].emoji }}
            </span>
          </template>

          <template v-else>
            <span class="fw-semibold">
              {{ i + 1 }}
            </span>
          </template>
        </span>

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
  justify-content: center;
  overflow-x: visible;
  scrollbar-width: thin;
}

@media (min-width: 768px) {
  .stepper-track {
    justify-content: space-between;
  }
}

.step-item {
  position: relative;
  flex: 0 0 auto;
}

@media (min-width: 768px) {
  .step-item {
    flex: 1 1 0;
    min-width: 0;
  }
}

.step-dot {
  position: relative;
  width: 40px;
  height: 40px;
  min-width: 40px;
  font-size: 0.95rem;
  z-index: 2;
  background-color: #fff;
}

@media (max-width: 575.98px) {
  .step-dot {
    width: 30px;
    height: 30px;
    min-width: 30px;
    font-size: 0.9rem;
  }
}

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

.step-item::after {
  content: '';
  position: absolute;
  z-index: 0;
  top: 20px;
  left: calc(50% + 25px);
  width: calc(100% - 40px);
  border-top: 2px dashed #dee2e6;
}

@media (max-width: 767.98px) {
  .step-item::after {
    top: 15px;
    left: calc(50% + 15px);
    width: 28px;
  }
}

.step-item:last-child::after {
  content: none;
}

.step-item.completed::after {
  border-top-style: dashed;
  border-top-color: #4fa633;
}

.step-item.current::after {
  border-top-style: dashed;
  border-top-color: #dee2e6;
}
</style>