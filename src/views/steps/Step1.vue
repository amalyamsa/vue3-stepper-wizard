
<script setup>
import { reactive } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
import { useFormValidation } from '../../composables/form_validator/useFormValidator'

const details = reactive({
  first_name: '',
  middle_name: '',
  last_name: '',
})

const {
  firstNameRules,
  middleNameRules,
  lastNameRules,
} = useFormValidation(details)
</script>

<template>
  <h5 class="step-title">
    1: Step1 Information
  </h5>

  <!-- Full Name -->
  <div class="form-grid">

    <!-- First Name -->
    <div class="form-field">
      <label
        for="first_name"
        class="form-label"
      >
        First Name
      </label>

      <Field
        id="first_name"
        name="first_name"
        type="text"
        class="form-control large-input"
        v-model="details.first_name"
        placeholder="Enter Name"
        :rules="firstNameRules"
      />

      <ErrorMessage
        name="first_name"
        class="form-error"
      />
    </div>

    <!-- Middle Name -->
    <div class="form-field">
      <label
        for="middle_name"
        class="form-label"
      >
        Middle Name
      </label>

      <Field
        id="middle_name"
        name="middle_name"
        type="text"
        class="form-control large-input"
        v-model="details.middle_name"
        placeholder="Enter Name"
        :rules="middleNameRules"
      />

      <ErrorMessage
        name="middle_name"
        class="form-error"
      />
    </div>

    <!-- Last Name -->
    <div class="form-field">
      <label
        for="last_name"
        class="form-label"
      >
        Last Name
      </label>

      <Field
        id="last_name"
        name="last_name"
        type="text"
        class="form-control large-input"
        v-model="details.last_name"
        placeholder="Enter Name"
        :rules="lastNameRules"
      />

      <ErrorMessage
        name="last_name"
        class="form-error"
      />
    </div>

  </div>
</template>

<style scoped>

</style>

