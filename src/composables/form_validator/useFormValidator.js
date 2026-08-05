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

    return tzPhoneRegex.test(value) ? true : "Enter a valid Tanzania phone number";
  });

  defineRule("email", value => {
    if (!value) return true; // let "required" handle empty

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(value) ? true : "Enter a valid email address";
  });

  defineRule("not_future", value => {
    if (!value) return true;
    return new Date(value) <= new Date() ? true : "Date cannot be in the future";
  });

  defineRule("not_past", value => {
    if (!value) return true;

    let selectedDate;

    // Handle ISO format: "YYYY-MM-DD"
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [year, month, day] = value.split("-").map(Number);
      selectedDate = new Date(year, month - 1, day);
    }
    // Handle DD-MM-YYYY format
    else if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
      const [day, month, year] = value.split("-").map(Number);
      selectedDate = new Date(year, month - 1, day);
    } else {
      return "Invalid date format";
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) return "Date cannot be in the past";
    if (selectedDate.getDay() === 0) return "Centers are closed on Sundays"; // 0 = Sunday

    return true;
  });

  defineRule("adult", value => {
    if (!value) return true;

    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 18 ? true : "You must be at least 18 years old";
  });

  defineRule("occupational_adult", value => {
    if (!value) return true;

    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 16 ? true : "You must be at least 16 years old";
  });

  defineRule("student", value => {
    if (!value) return true;

    const today = new Date();
    const birthDate = new Date(value);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    //  Too young (toddler)
    if (age < 5) {
      return "Student must be at least 5 years old";
    }

    return true;
  });

  defineRule("confirmed", value => {
    if (!value) {
      return "You must confirm that the details are correct";
    }
    return true;
  });

  defineRule("image_file", value => {
    if (!value) return "* Required";

    // If value is array (sometimes vee-validate wraps file)
    const file = Array.isArray(value) ? value[0] : value;

    if (!(file instanceof File)) {
      return "Invalid file";
    }

    // ✅ Check file type
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return "Only PNG or JPG images are allowed";
    }

    // ✅ Check file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return "Image must not exceed 5MB";
    }

    return true;
  });

  defineRule("alpha_optional", value => {
    if (!value) return true;

    const regex = /^[\p{L}\s'-]+$/u;

    return regex.test(value) ? true : "Invalid name format";
  });

  const idPatterns = {
    "E3E3E6F2-579F-44E7-82EC-748BA2BD4861": {
      regex: /^[0-9]{20}$/,
      message: "valid NIDA required",
    },
    "9CC37F67-68C9-46BB-97C0-AF5B90799A0E": { regex: /^\d{9}$/, message: "valid ZANID required" },
    "61FB1E47-C639-40E7-90F9-258345FCA575": {
      regex: /^[A-Z0-9]{6,9}$/,
      message: "valid passport required",
    },
    3: { regex: /^[A-Z0-9-]{6,15}$/, message: "valid driving license required" },
    4: { regex: /^[A-Z0-9\/-]{4,15}$/, message: "valid voter ID required" },
  };

  

 
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
 
    /*
    |--------------------------------------------------------------------------
    | Step 3 – Confirmation
    |--------------------------------------------------------------------------
    */

    confirmRules: requiredIf(isConfirmed),

  };
}
