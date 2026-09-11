<script setup>

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
          {{ label }}
        </span>
      </li>
    </ul>
  </nav>
</template>

