<script setup>
import { reactive} from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { useFormValidation } from "../../composables/form_validator/useFormValidator";

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
  <h5 class="step-title">2: Step2 Information</h5>

  <!-- Full Name -->
  <div class="form-grid">
    <div class="form-field">
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
    <div class="form-field">
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

