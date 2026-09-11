<script setup>
import {  reactive } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";

const details = reactive({
  first_name:'',
  middle_name:'',
  last_name:'',
})
const {
  firstNameRules,
  middleNameRules,
  lastNameRules,
} = useFormValidation(details);

</script>

<template>
  <h5 class="mb-3">1: Step1 Information</h5>

  <!-- Full Name -->
  <div class="row g-3 mb-2">
    <div class="col-12 col-md-4">
      <label class="form-label">First Name</label>
      <Field
        name="first_name"
        type="text"
        class="form-control large-input"
        v-model="details.first_name"
        placeholder="Enter Name"
        :rules="firstNameRules"
      />
      <ErrorMessage name="first_name" class="text-danger small" />
    </div>

     <div class="col-12 col-md-4">
      <label class="form-label">Middle Name</label>
      <Field
        name="middle_name"
        type="text"
        class="form-control large-input"
        v-model="details.middle_name"
        placeholder="Enter Name"
        :rules="middleNameRules"
      />
      <ErrorMessage name="middle_name" class="text-danger small" />
    </div>

     <div class="col-12 col-md-4">
      <label class="form-label">Last Name</label>
      <Field
        name="last_name"
        type="text"
        class="form-control large-input"
        v-model="details.last_name"
        placeholder="Enter Name"
        :rules="lastNameRules"
      />
      <ErrorMessage name="last_name" class="text-danger small" />
    </div>
  </div>

</template>


