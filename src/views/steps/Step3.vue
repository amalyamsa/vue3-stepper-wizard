<script setup>
defineProps({
  details: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="summary">

    <h5 class="summary-title">
      3: Summary
    </h5>

    <!-- Names -->
    <div class="summary-grid summary-grid-three">

      <div class="summary-field">
        <label class="summary-label">
          First Name
        </label>

        <p class="summary-value">
          Firts Name Added
        </p>
      </div>

      <div class="summary-field">
        <label class="summary-label">
          Middle Name
        </label>

        <p class="summary-value">
          Middle Name Added
        </p>
      </div>

      <div class="summary-field">
        <label class="summary-label">
          Last Name
        </label>

        <p class="summary-value">
          Last Name Added
        </p>
      </div>

    </div>

    <!-- Contact -->
    <div class="summary-grid summary-grid-two">

      <div class="summary-field">
        <label class="summary-label">
          Phone Number
        </label>

        <p class="summary-value">
          Phone Number Added
        </p>
      </div>

      <div class="summary-field">
        <label class="summary-label">
          Email Address
        </label>

        <p class="summary-value">
          Email Address Added
        </p>
      </div>
    </div>
  </div>
</template>

