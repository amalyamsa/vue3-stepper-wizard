# StepPerform

A lightweight and reusable **Vue 3 stepper wizard** for building multi-step forms and workflows.

StepPerform handles the **step navigation and wizard state**. Your application remains responsible for **form data and validation**.

It works with any validation approach, including:

* VeeValidate
* Yup
* Zod
* custom validation
* API validation
* no validation

---

## Installation

Install StepPerform with npm:

```bash
npm install stepperform
```

Import the components and stylesheet:

```vue
<script setup>
import {
  StepperWizard,
  Step,
} from 'stepperform'

import 'stepperform/style.css'
</script>
```

---

# Basic Usage

A simple three-step wizard looks like this:

```vue
<script setup>
import {
  StepperWizard,
  Step,
} from 'stepperform'

function handleFinish() {
  console.log('Wizard completed')
}
</script>

<template>
  <StepperWizard
    :header-title="[
      'Personal',
      'Details',
      'Confirmation',
    ]"
    @finish="handleFinish"
  >

    <Step title="Personal">
      <h3>Personal information</h3>

      <input
        type="text"
        placeholder="First name"
      />
    </Step>

    <Step title="Details">
      <h3>Additional details</h3>

      <input
        type="text"
        placeholder="Phone number"
      />
    </Step>

    <Step title="Confirmation">
      <h3>Confirmation</h3>

      <p>
        Review your information before submitting.
      </p>
    </Step>

  </StepperWizard>
</template>
```

That's all you need for a basic wizard.

StepPerform automatically:

* starts at Step 1
* displays the current step
* hides inactive steps
* handles Next
* handles Previous
* detects the final step
* emits `finish` when the wizard is completed

---

# Per-Step Validation

This is the recommended way to use validation with StepPerform.

Each `<Step>` can receive a `validate` function:

```vue
<Step
  title="Personal"
  :validate="validatePersonal"
>
  ...
</Step>
```

The important concept is:

```text
Step 1
   ↓
validatePersonal()
   ↓
valid?
 ┌───────┐
 │       │
 YES     NO
 │       │
 ▼       ▼
Next    Stay
```

When the user clicks **Next**, StepPerform calls the validator belonging to the current step.

If the validator returns:

```js
true
```

the wizard moves forward.

If it returns:

```js
false
```

the wizard stays on the current step.

---

# Simple Validation Example

You don't need a validation library.

For example:

```vue
<script setup>
import {
  ref,
} from 'vue'

import {
  StepperWizard,
  Step,
} from 'stepperform'

const firstName = ref('')
const email = ref('')

function validatePersonal() {
  return firstName.value.trim() !== ''
}

function validateContact() {
  return email.value.includes('@')
}

function handleFinish() {
  console.log('Wizard completed')
}
</script>

<template>
  <StepperWizard
    :header-title="[
      'Personal',
      'Contact',
      'Finish',
    ]"
    @finish="handleFinish"
  >

    <!-- Step 1 -->
    <Step
      title="Personal"
      :validate="validatePersonal"
    >
      <input
        v-model="firstName"
        type="text"
        placeholder="First name"
      />
    </Step>

    <!-- Step 2 -->
    <Step
      title="Contact"
      :validate="validateContact"
    >
      <input
        v-model="email"
        type="email"
        placeholder="Email"
      />
    </Step>

    <!-- Step 3 -->
    <Step title="Finish">
      <h3>Ready to submit</h3>
    </Step>

  </StepperWizard>
</template>
```

Now each step has its own validation:

```js
validatePersonal()
```

and:

```js
validateContact()
```

StepPerform only calls the validator. It does not know how your validation works.

---

# Using VeeValidate

StepPerform does **not** require VeeValidate.

However, if your application already uses VeeValidate, you can easily connect it to each step.

For example:

```bash
npm install vee-validate yup
```

Then create your schema:

```js
import * as yup from 'yup'

const validationSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required'),

  middle_name: yup
    .string()
    .required('Middle name is required'),

  last_name: yup
    .string()
    .required('Last name is required'),
})
```

Use VeeValidate's `validateField()` for each step:

```vue
<Form
  :validation-schema="validationSchema"
  v-slot="{ validateField }"
>

  <StepperWizard
    :header-title="[
      'First name',
      'Middle name',
      'Last name',
    ]"
  >

    <Step
      title="First name"
      :validate="
        () => validateField('first_name')
      "
    >
      ...
    </Step>

    <Step
      title="Middle name"
      :validate="
        () => validateField('middle_name')
      "
    >
      ...
    </Step>

    <Step
      title="Last name"
      :validate="
        () => validateField('last_name')
      "
    >
      ...
    </Step>

  </StepperWizard>

</Form>
```

### Why `validateField()`?

Suppose you have three steps:

```text
Step 1 → first_name
Step 2 → middle_name
Step 3 → last_name
```

You generally don't want Step 1 to validate fields belonging to Steps 2 and 3.

Instead of:

```js
validate()
```

which can validate the entire form, use:

```js
validateField('first_name')
```

for Step 1.

Then:

```js
validateField('middle_name')
```

for Step 2.

And:

```js
validateField('last_name')
```

for Step 3.

This allows each step to control its own validation.

---

# Complete VeeValidate Example

Here is a complete example you can copy into your Vue application:

```vue
<script setup>
import {
  Form,
  Field,
  ErrorMessage,
} from 'vee-validate'

import * as yup from 'yup'

import {
  StepperWizard,
  Step,
} from 'stepperform'

import 'stepperform/style.css'

const validationSchema = yup.object({
  first_name: yup
    .string()
    .required('First name is required'),

  middle_name: yup
    .string()
    .required('Middle name is required'),

  last_name: yup
    .string()
    .required('Last name is required'),
})

function handleFinish() {
  console.log('Wizard completed')
}
</script>

<template>
  <Form
    :validation-schema="validationSchema"
    v-slot="{ validateField }"
  >

    <StepperWizard
      :header-title="[
        'First name',
        'Middle name',
        'Last name',
      ]"
      @finish="handleFinish"
    >

      <!-- STEP 1 -->

      <Step
        title="First name"
        :validate="
          () => validateField('first_name')
        "
      >

        <div class="mb-3">

          <label>
            First name
          </label>

          <Field
            name="first_name"
            class="form-control"
            placeholder="Enter first name"
          />

          <ErrorMessage
            name="first_name"
            class="text-danger"
          />

        </div>

      </Step>

      <!-- STEP 2 -->

      <Step
        title="Middle name"
        :validate="
          () => validateField('middle_name')
        "
      >

        <div class="mb-3">

          <label>
            Middle name
          </label>

          <Field
            name="middle_name"
            class="form-control"
            placeholder="Enter middle name"
          />

          <ErrorMessage
            name="middle_name"
            class="text-danger"
          />

        </div>

      </Step>

      <!-- STEP 3 -->

      <Step
        title="Last name"
        :validate="
          () => validateField('last_name')
        "
      >

        <div class="mb-3">

          <label>
            Last name
          </label>

          <Field
            name="last_name"
            class="form-control"
            placeholder="Enter last name"
          />

          <ErrorMessage
            name="last_name"
            class="text-danger"
          />

        </div>

      </Step>

    </StepperWizard>

  </Form>
</template>
```

---

# Multiple Fields in One Step

A step can contain multiple fields.

You can validate all fields belonging to that step inside one validator.

For example:

```js
async function validatePersonal() {
  const firstName = await validateField(
    'first_name'
  )

  const middleName = await validateField(
    'middle_name'
  )

  return (
    firstName.valid &&
    middleName.valid
  )
}
```

Then:

```vue
<Step
  title="Personal"
  :validate="validatePersonal"
>
  ...
</Step>
```

This gives you complete control over which fields belong to each step.

---

# Async Validation

Validation can also be asynchronous.

For example, you may need to check an email address against your API:

```js
async function validateEmail() {
  const validFormat =
    email.value.includes('@')

  if (!validFormat) {
    return false
  }

  const response =
    await checkEmailWithApi(email.value)

  return response.valid
}
```

Use it normally:

```vue
<Step
  title="Email"
  :validate="validateEmail"
>
  ...
</Step>
```

StepPerform waits for the validator before continuing.

---

# Validation Return Values

A validator can return a boolean:

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

It can also return an object containing `valid`:

```js
function validateStep() {
  return {
    valid: true,
  }
}
```

Async validators are supported:

```js
async function validateStep() {
  return {
    valid: await checkSomething(),
  }
}
```

The basic contract is:

```text
true
  → continue

false
  → stay on current step

{ valid: true }
  → continue

{ valid: false }
  → stay on current step
```

---

# The Important Part: StepPerform Does Not Validate Your Form

StepPerform does **not** contain:

```text
Yup
Zod
VeeValidate
Joi
```

and it does not require any of them.

Instead, the responsibilities are separated:

### Your application

Handles:

* form fields
* form state
* validation schema
* validation messages
* API requests
* submission

### StepPerform

Handles:

* current step
* next / previous navigation
* step visibility
* progress
* validation callback execution
* finish event

For example:

```text
Your validation
      │
      ▼
validatePersonal()
      │
      ▼
StepPerform
      │
      ├── true  → Next step
      │
      └── false → Stay here
```

This allows StepPerform to work with virtually any validation strategy.

---

# Navigation Events

## `change`

The `change` event is emitted whenever the current step changes.

```vue
<StepperWizard
  @change="handleChange"
>
```

```js
function handleChange(step) {
  console.log('Current step:', step)
}
```

The step number starts at `1`.

---

## `finish`

The `finish` event is emitted when the user confirms the final step.

```vue
<StepperWizard
  @finish="handleFinish"
>
```

```js
function handleFinish() {
  console.log('Submit your form here')
}
```

A typical application might then submit its form:

```js
async function handleFinish() {
  await submitForm()
}
```

---

# Stepper Header

You can provide labels for the header:

```vue
<StepperWizard
  :header-title="[
    'Personal',
    'Address',
    'Confirmation',
  ]"
>
```

To hide the header:

```vue
<StepperWizard
  :show-header="false"
>
```

---

# Programmatic Stepper Control

For applications that need direct stepper state, StepPerform also exports:

```js
useStepperForm
```

Example:

```js
import {
  useStepperForm,
} from 'stepperform'

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

Available methods:

| Method       | Description                |
| ------------ | -------------------------- |
| `next()`     | Move to the next step      |
| `previous()` | Move to the previous step  |
| `goTo(step)` | Jump to a specific step    |
| `reset()`    | Return to the initial step |

Available state:

| Property      | Description                           |
| ------------- | ------------------------------------- |
| `step`        | Current step                          |
| `total`       | Total number of steps                 |
| `isFirstStep` | Whether the current step is the first |
| `isLastStep`  | Whether the current step is the last  |
| `progress`    | Current progress percentage           |

---

# Components

StepPerform exports:

```js
import {
  StepperHeader,
  StepperWizard,
  Step,
  StepPrevious,
  StepNext,
  StepConfirm,
  useStepperForm,
} from 'stepperform'
```

### `StepperWizard`

Main wizard component.

### `Step`

Individual step container.

### `StepperHeader`

Displays the step progress header.

### `StepPrevious`

Previous navigation button.

### `StepNext`

Next navigation button.

### `StepConfirm`

Final confirmation button.

### `useStepperForm`

Composable for stepper state and navigation.

---

# Global Registration

You can register StepPerform as a Vue plugin.

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

After registration:

```vue
<StepperWizard>
  <Step title="Step 1">
    Step 1
  </Step>

  <Step title="Step 2">
    Step 2
  </Step>
</StepperWizard>
```

---

# Styling

Import the default stylesheet:

```js
import 'stepperform/style.css'
```

The default styles are intentionally lightweight and can be overridden by your application's CSS.

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

Run the development demo:

```bash
npm run dev
```

Build the library:

```bash
npm run build
```

---

# Test the npm Package Locally

To test the actual package that will be published:

```bash
npm run build
```

Then:

```bash
npm pack
```

This creates:

```text
stepperform-1.0.0.tgz
```

Install that package into another Vue 3 application:

```bash
npm install /path/to/stepperform-1.0.0.tgz
```

Then import it normally:

```js
import {
  StepperWizard,
  Step,
} from 'stepperform'

import 'stepperform/style.css'
```

This verifies the **built npm package**, rather than only the development source.

---

# Vue Compatibility

StepPerform requires:

```text
Vue 3.3+
```

Vue is provided as a peer dependency.

---

# License

MIT License

Copyright © 2026 malaly
