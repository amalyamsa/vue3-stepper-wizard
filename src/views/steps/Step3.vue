<script setup>
import { computed, ref,reactive, watch, watchEffect } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";

const details = reactive({
  first_name:''
})
const {
  firstNameRules,
} = useFormValidation(details);

</script>

<template>
  <h5 class="mb-3">3: Step3</h5>

  <!-- Full Name -->
  <div class="row g-3 mb-2">
    <div class="col-12 col-md-4">
      <label class="form-label">Name</label>
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

  </div>


</template>
 
