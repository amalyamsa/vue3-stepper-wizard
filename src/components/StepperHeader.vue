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
  <nav class="stepper" aria-label="progress">
    <ul class="stepper-track" role="list">
      <li v-for="(label, i) in labels" :key="i" class="step-item" :class="{
        completed: isCompleted(i),
        current: isCurrent(i),
        upcoming: !isCompleted(i) && !isCurrent(i),
      }" :aria-current="isCurrent(i) ? 'step' : null">
        <span class="step-dot">
          <template v-if="icons[i]?.emoji">
            <span class="step-emoji" aria-hidden="true">
              {{ icons[i].emoji }}
            </span>
          </template>

          <template v-else>
            <span class="step-number">
              {{ i + 1 }}
            </span>
          </template>
        </span>

        <span class="step-label" :class="{ 'step-number': isCurrent(i) }">
          {{ label }}
        </span>
      </li>
    </ul>
  </nav>
</template>
<style>




</style>
