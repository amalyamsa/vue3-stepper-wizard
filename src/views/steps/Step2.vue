<script setup>
import { reactive} from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useFormValidation } from "@/composables/form_validator/useFormValidator";

const details = reactive({
  phone_number:'',
  email:''
});

const {
  phoneRules,
  emailRules,
} = useFormValidation(details);

</script>

<template>
  <h5 class="mb-3">2: Step2 Information</h5>

  <!-- Full Name -->
  <div class="row g-3">
    <div class="col-12 col-md-6">
      <label class="form-label">Phone Number</label>
      <Field
        name="phone_number"
        type="tel"
        class="form-control large-input"
        v-model="details.phone_number"
        maxlength="10"
        placeholder="Enter Phone Number"
        :rules="phoneRules"
      />
      <ErrorMessage name="phone_number" class="text-danger small" />
    </div>
    <div class="col-12 col-md-6">
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

