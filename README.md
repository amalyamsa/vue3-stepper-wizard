# StepPerform

A lightweight, reusable **Vue 3 stepper wizard** for multi-step forms.

StepPerform handles the **step navigation, progress state, and wizard UI** while your application remains responsible for **form fields and validation**.

* Vue 3
* JavaScript
* Pure CSS
* No Bootstrap dependency
* No VeeValidate dependency
* No Yup/Zod dependency
* Supports custom synchronous and asynchronous validation
* Per-step validation
* VeeValidate-compatible
* Responsive
* Lightweight

---

## Installation

Install StepPerform from npm:

```bash
npm install stepperform
```

---

## Basic Usage

Import the components:

```vue
<script setup>
import {
  StepperWizard,
  Step,
} from 'stepperform'

import 'stepperform/style.css'
</script>
```

Then create your wizard:

```vue
<template>
  <StepperWizard
    :header-title="[
      'Personal Information',
      'Contact Information',
      'Summary',
    ]"
    @finish="handleFinish"
  >

    <Step title="Personal Information">
      <h3>Personal Information</h3>

      <input
        type="text"
        placeholder="First name"
      />
    </Step>

    <Step title="Contact Information">
      <h3>Contact Information</h3>

      <input
        type="email"
        placeholder="Email"
      />
    </Step>

    <Step title="Summary">
      <h3>Summary</h3>

      <p>Your information is ready to submit.</p>
    </Step>

  </StepperWizard>
</template>

<script setup>
function handleFinish() {
  console.log('Form completed')
}
</script>
```

---

# Per-Step Validation

StepPerform does not provide its own validation library.

Instead, each `<Step>` can receive a `validate` function.

```vue
<Step
  title="Personal Information"
  :validate="validatePersonal"
>
  <!-- fields -->
</Step>
```

The validator is executed when the user clicks **Next**.

If the validator returns `false`, the wizard stays on the current step.

If it returns `true`, the wizard proceeds to the next step.

### Simple Example

```vue
<script setup>
import { ref } from 'vue'

const firstName = ref('')

function validatePersonal() {
  return firstName.value.trim() !== ''
}
</script>

<template>
  <StepperWizard>

    <Step
      title="Personal Information"
      :validate="validatePersonal"
    >
      <input
        v-model="firstName"
        type="text"
        placeholder="First name"
      />
    </Step>

    <Step title="Summary">
      <p>Ready to submit.</p>
    </Step>

  </StepperWizard>
</template>
```

---

# Validation Return Values

A step validator can return:

### Boolean

```js
function validateStep() {
  return true
}
```

or:

```js
function validateStep() {
  return false
}
```

### Validation Object

Validators can also return an object containing `valid`:

```js
async function validateStep() {
  return {
    valid: true,
  }
}
```

or:

```js
async function validateStep() {
  return {
    valid: false,
  }
}
```

StepPerform uses the `valid` property to determine whether the user can continue.

---

# Multiple Fields Per Step

You can validate multiple fields with a single validator.

```vue
<script setup>
function validatePersonal() {
  const firstNameValid =
    firstName.value.trim() !== ''

  const lastNameValid =
    lastName.value.trim() !== ''

  return firstNameValid && lastNameValid
}
</script>
```

Then:

```vue
<Step
  title="Personal Information"
  :validate="validatePersonal"
>
  <!-- multiple fields -->
</Step>
```

This allows your application to keep complete control over how fields are validated.

---

# Async Validation

Validators can be asynchronous.

```vue
<script setup>
async function validateEmail() {
  const available = await checkEmailAvailability()

  return available
}
</script>
```

Use it normally:

```vue
<Step
  title="Email"
  :validate="validateEmail"
>
  <!-- email field -->
</Step>
```

StepPerform waits for the Promise before deciding whether to continue.

---

# VeeValidate

StepPerform does not depend on VeeValidate, but it works well with it.

Install VeeValidate separately in your application:

```bash
npm install vee-validate
```

Then use VeeValidate's validation functions as the Step validator.

```vue
<script setup>
import {
  Form,
  Field,
  ErrorMessage,
} from 'vee-validate'
</script>

<template>
  <Form
    v-slot="{ validateField }"
  >
    <StepperWizard
      :header-title="[
        'First Name',
        'Middle Name',
        'Last Name',
      ]"
      @finish="handleFinish"
    >

      <Step
        title="First Name"
        :validate="
          () => validateField('first_name')
        "
      >
        <Field
          name="first_name"
          class="form-control"
        />

        <ErrorMessage
          name="first_name"
        />
      </Step>

      <Step
        title="Middle Name"
        :validate="
          () => validateField('middle_name')
        "
      >
        <Field
          name="middle_name"
          class="form-control"
        />

        <ErrorMessage
          name="middle_name"
        />
      </Step>

      <Step
        title="Last Name"
        :validate="
          () => validateField('last_name')
        "
      >
        <Field
          name="last_name"
          class="form-control"
        />

        <ErrorMessage
          name="last_name"
        />
      </Step>

    </StepperWizard>
  </Form>
</template>
```

The important part is:

```vue
:validate="
  () => validateField('first_name')
"
```

StepPerform calls the function when the user attempts to continue.

VeeValidate remains completely optional.

---

# Global Validation

You can also provide a validator directly to `<StepperWizard>`.

```vue
<StepperWizard
  :validate="validateStep"
>
  ...
</StepperWizard>
```

Example:

```js
async function validateStep() {
  return true
}
```

However, **per-step validation is recommended** because it keeps each step's validation logic close to that step.

---

# StepperWizard Props

## `header-title`

Array of labels displayed in the stepper header.

```vue
<StepperWizard
  :header-title="[
    'Personal',
    'Contact',
    'Summary',
  ]"
>
```

Default:

```js
[]
```

---

## `show-header`

Controls whether the stepper header is displayed.

```vue
<StepperWizard
  :show-header="false"
>
```

Default:

```js
true
```

---

## `validate`

Optional global validation function.

```vue
<StepperWizard
  :validate="validateStep"
>
```

Per-step `validate` functions take priority.

---

# Step Props

## `title`

The title associated with the step.

```vue
<Step title="Personal Information">
  ...
</Step>
```

## `validate`

Optional validation function.

```vue
<Step
  title="Personal Information"
  :validate="validatePersonal"
>
  ...
</Step>
```

The function can return:

```js
true
```

```js
false
```

or:

```js
{
  valid: true
}
```

It can also return a Promise.

---

# Navigation Components

StepPerform provides three navigation components.

### StepNext

```vue
<StepNext
  :action="next"
/>
```

### StepPrevious

```vue
<StepPrevious
  :action="previous"
/>
```

### StepConfirm

```vue
<StepConfirm
  :action="confirm"
/>
```

In normal usage, `StepperWizard` handles these automatically.

---

# Events

## `finish`

Emitted when the user reaches the final step and confirms.

```vue
<StepperWizard
  @finish="handleFinish"
>
```

Example:

```js
function handleFinish() {
  console.log('Wizard completed')
}
```

---

## `change`

Emitted when the current step changes.

```vue
<StepperWizard
  @change="handleStepChange"
>
```

Example:

```js
function handleStepChange(step) {
  console.log('Current step:', step)
}
```

---

# Programmatic Step Control

StepPerform exposes the `useStepperForm` composable for applications that need direct control over the step state.

```js
import {
  useStepperForm,
} from 'stepperform'
```

Example:

```js
const {
  step,
  total,
  isFirstStep,
  isLastStep,
  progress,
  next,
  previous,
  goTo,
  reset,
} = useStepperForm(3)
```

### Available methods

```js
next()
```

Move to the next step.

```js
previous()
```

Move to the previous step.

```js
goTo(2)
```

Move directly to step 2.

```js
reset()
```

Return to the initial step.

### State

```js
step
```

Current step.

```js
total
```

Total number of steps.

```js
isFirstStep
```

Whether the current step is the first step.

```js
isLastStep
```

Whether the current step is the last step.

```js
progress
```

Current progress percentage.

---

# Components

StepPerform exports:

```js
import {
  StepperWizard,
  StepperHeader,
  Step,
  StepPrevious,
  StepNext,
  StepConfirm,
  useStepperForm,
} from 'stepperform'
```

---

# Global Registration

You can register StepPerform globally.

```js
import {
  createApp,
} from 'vue'

import App from './App.vue'

import StepPerform from 'stepperform'

import 'stepperform/style.css'

const app = createApp(App)

app.use(StepPerform)

app.mount('#app')
```

After registration, you can use:

```vue
<StepperWizard>
  <Step title="First">
    ...
  </Step>

  <Step title="Second">
    ...
  </Step>
</StepperWizard>
```

---

# Styling

StepPerform includes its own CSS.

Import it once:

```js
import 'stepperform/style.css'
```

StepPerform does **not** require:

* Bootstrap
* Bootstrap Icons
* Tailwind CSS
* Vuetify
* another UI framework

Your application can use any CSS framework or design system alongside StepPerform, but none is required.

The package's built-in styles handle the stepper, navigation buttons, progress indicators, and responsive behavior.

---

# Forms and Validation

StepPerform intentionally separates the wizard from form validation.

### StepPerform handles

* Step registration
* Current step
* Next/previous navigation
* Progress
* Step validation callbacks
* Completion
* Stepper header
* Responsive stepper UI

### Your application handles

* Form fields
* Form state
* Validation schemas
* Error messages
* API requests
* Submission
* Form libraries

This means you can use StepPerform with:

* VeeValidate
* Yup
* Zod
* custom validation
* native HTML validation
* other form libraries

without StepPerform needing to depend on them.

---

# Example Project Structure

A consuming application could look like:

```text
src/
├── components/
│   ├── Step1.vue
│   ├── Step2.vue
│   └── Step3.vue
│
├── composables/
│   └── validation.js
│
└── views/
    └── WizardForm.vue
```

Example:

```vue
<StepperWizard
  :header-title="[
    'Personal',
    'Contact',
    'Summary',
  ]"
  @finish="submitForm"
>

  <Step
    title="Personal"
    :validate="validatePersonal"
  >
    <Step1 />
  </Step>

  <Step
    title="Contact"
    :validate="validateContact"
  >
    <Step2 />
  </Step>

  <Step title="Summary">
    <Step3 />
  </Step>

</StepperWizard>
```

---

# Development

Clone the repository:

```bash
git clone https://github.com/amalyamsa/vue3-stepper-wizard.git
```

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

---

# Testing the npm Package Locally

Build the package:

```bash
npm run build
```

Create a package archive:

```bash
npm pack
```

This creates a file similar to:

```text
stepperform-1.0.0.tgz
```

Install that package into another Vue 3 application:

```bash
npm install /path/to/stepperform-1.0.0.tgz
```

Then test the package exactly as an npm consumer would.

---

# Package Contents

The published package contains the compiled distribution:

```text
stepperform/
├── dist/
│   ├── stepperform.css
│   ├── stepperform.js
│   └── stepperform.umd.cjs
├── LICENSE
├── README.md
└── package.json
```

Source files and development dependencies are not included in the published package.

---

# Vue Compatibility

StepPerform is designed for:

```text
Vue 3
```

Vue is declared as a peer dependency so the consuming application provides its own Vue installation.

---

# License

MIT License.

Copyright (c) 2026 malaly

```

This version now clearly states that **Bootstrap is not required**, documents **per-step validation as the recommended approach**, and explains the separation between StepPerform and validation libraries.
```
