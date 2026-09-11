import { computed } from "vue";
import { defineRule } from "vee-validate";

export function useFormValidation(piniaData) {
  /*
  |--------------------------------------------------------------------------
  | Rules
  |--------------------------------------------------------------------------
  */

  defineRule("required", value => {
    if (!value || !String(value).trim()) {
      return "* Required";
    }
    return true;
  });

  defineRule("phone", value => {
    if (!value) return true;

    const tzPhoneRegex = /^0(61|62|63|64|65|66|67|68|69|60|71|72|73|74|75|76|77|78|79|70)\d{7}$/;

    return tzPhoneRegex.test(value) ? true : "Enter a valid phone number";
  });

  defineRule("email", value => {
    if (!value) return true; // let "required" handle empty

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value) ? true : "Enter a valid email address";
  });

  defineRule("confirmed", value => {
    if (!value) {
      return "You must confirm that the details are correct";
    }
    return true;
  });


  defineRule("alpha_optional", value => {
    if (!value) return true;

    const regex = /^[\p{L}\s'-]+$/u;

    return regex.test(value) ? true : "Invalid name format";
  });

  

 
  /*
  |--------------------------------------------------------------------------
  | Computed Conditions
  |--------------------------------------------------------------------------
  */


  const isConfirmed = computed(() => !piniaData.value.isConfirmed);


  /*
  |--------------------------------------------------------------------------
  | Rule Builder
  |--------------------------------------------------------------------------
  */

  const requiredIf = condition => computed(() => (condition.value ? "required" : ""));

  /*
  |--------------------------------------------------------------------------
  | Exposed Rules
  |--------------------------------------------------------------------------
  */

  return {
    /*
    |--------------------------------------------------------------------------
    | Step 1 – Personal Details
    |--------------------------------------------------------------------------
    */

    firstNameRules: "alpha_optional|required",
    middleNameRules: "alpha_optional",
    lastNameRules: "alpha_optional|required",
 
    /*
    |--------------------------------------------------------------------------
    | Step 2 – Contact Details
    |--------------------------------------------------------------------------
    */

    phoneRules: "phone|required",
    emailRules: "email|required",
 
    /*
    |--------------------------------------------------------------------------
    | Step 3 – Confirmation
    |--------------------------------------------------------------------------
    */

    confirmRules: requiredIf(isConfirmed),

  };
}
