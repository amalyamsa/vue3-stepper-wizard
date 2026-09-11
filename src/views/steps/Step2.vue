<script setup>
import { computed, ref,reactive, watch, watchEffect } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";

const details = reactive({
  phone_number:'',
  email:''
});

const {
  phoneRules,
  emailRules,
} = useFormValidation(details.value);

</script>

<template>
  <h5 class="mb-3">2: Step2</h5>

  <!-- Full Name -->
  <div class="row g-3">
    <div class="col-12 col-md-4">
      <label class="form-label">Phone Number</label>
      <Field
        name="phone_number"
        type="text"
        class="form-control large-input"
        v-model="details.phone_number"
        placeholder="Enter Name"
        :rules="phoneRules"
      />
      <ErrorMessage name="phone_number" class="text-danger small" />
    </div>
    <div class="col-12 col-md-4">
      <label class="form-label">Email Address</label>
      <Field
        name="email"
        type="text"
        class="form-control large-input"
        v-model="details.email"
        placeholder="Enter Email"
        :rules="emailRules"
      />
      <ErrorMessage name="email" class="text-danger small" />
    </div>

  </div>


</template>

