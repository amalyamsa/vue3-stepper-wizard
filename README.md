# StepperForm

A lightweight and reusable **multi-step form wizard for Vue 3**.

StepperForm provides a simple component-based API for creating multi-step forms with built-in step navigation, progress tracking, optional validation, and VeeValidate integration.

Built with **Vue 3 Composition API** and **JavaScript**.

---

## ✨ Features

* Vue 3 support
* JavaScript — no TypeScript
* Reusable step components
* Built-in step navigation
* Previous / Next / Confirm buttons
* Step progress header
* Active, completed, and upcoming step states
* Optional form validation
* VeeValidate integration
* Programmatic step navigation
* Reset wizard state
* `change` and `finish` events
* Vue `provide/inject` support for child components
* Custom navigation labels
* No dependency on Vue I18n
* Easy to customize with CSS

---

## 📦 Project Structure

```text
StepperForm/
│
├── src/
│   ├── index.js
│   │
│   ├── composables/
│   │   └── useStepperForm.js
│   │
│   ├── components/
│   │   ├── StepperHeader.vue
│   │   ├── StepperWizard.vue
│   │   ├── Step.vue
│   │   ├── StepPrevious.vue
│   │   ├── StepNext.vue
│   │   └── StepConfirm.vue
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── StepperForm.css
│   │
│   └── views/
│       └── WizardForm.vue
│
└── README.md
```

---

# 🚀 Installation

Install StepperForm using npm:

```bash
npm install StepperForm
```

Or Yarn:

```bash
yarn add StepperForm
```

---

# 🔌 Plugin Setup

Register StepperForm in your Vue application.

```js
import { createApp } from 'vue'
import App from './App.vue'

import StepperForm from 'StepperForm'

const app = createApp(App)

app.use(StepperForm)

app.mount('#app')
```

The following components will then be globally available:

```text
StepperHeader
StepperWizard
Step
StepPrevious
StepNext
StepConfirm
```

The `useStepperForm` composable is also available as a named export.

---

# 🧩 Basic Usage

A basic StepperForm wizard consists of a `StepperWizard` containing multiple `Step` components.

```vue
<script setup>
import {
  StepperWizard,
  Step,
} from 'StepperForm'

const headerTitle = [
  'Step 1',
  'Step 2',
  'Step 3',
]

function handleFinish() {
  console.log('Wizard completed')
}
</script>

<template>
  <StepperWizard
    :header-title="headerTitle"
    @finish="handleFinish"
  >

    <Step title="Step 1">
      <h3>Personal Information</h3>

      <input
        type="text"
        placeholder="First name"
      />
    </Step>

    <Step title="Step 2">
      <h3>Contact Information</h3>

      <input
        type="email"
        placeholder="Email"
      />
    </Step>

    <Step title="Step 3">
      <h3>Confirmation</h3>

      <p>
        Review your information before submitting.
      </p>
    </Step>

  </StepperWizard>
</template>
```

The wizard automatically handles:

```text
Step 1
  ↓
Step 2
  ↓
Step 3
  ↓
Confirm
```

---

# 🪜 Components

## StepperWizard

The main component responsible for managing the wizard.

```vue
<StepperWizard>
  ...
</StepperWizard>
```

It manages:

* Current step
* Total steps
* Progress
* Navigation
* Validation
* Finish state
* Step changes

The wizard owns the step state internally, so the parent component does not need to maintain a separate `step` variable.

---

## Step

Represents an individual wizard step.

```vue
<Step title="Personal Information">
  <PersonalInformation />
</Step>
```

Example:

```vue
<StepperWizard>

  <Step title="Step 1">
    <Step1 />
  </Step>

  <Step title="Step 2">
    <Step2 />
  </Step>

  <Step title="Step 3">
    <Step3 />
  </Step>

</StepperWizard>
```

---

## StepperHeader

Displays the wizard progress.

The header is normally rendered automatically by `StepperWizard`.

```vue
<StepperWizard
  :header-title="[
    'Personal Information',
    'Contact',
    'Confirmation',
  ]"
/>
```

The header tracks the wizard's internal state.

Each step can have one of three states:

```text
✓ Completed
● Current
○ Upcoming
```

---

## StepPrevious

Displays the Previous button.

```vue
<StepPrevious
  :action="previous"
/>
```

The button is normally managed by `StepperWizard`.

---

## StepNext

Displays the Next button.

```vue
<StepNext
  :action="next"
/>
```

---

## StepConfirm

Displays the Confirm button on the final step.

```vue
<StepConfirm
  :action="confirm"
/>
```

---

# 🎯 Header Configuration

Pass an array of labels using `header-title`.

```vue
<StepperWizard
  :header-title="[
    'Personal Information',
    'Contact Details',
    'Confirmation',
  ]"
/>
```

The number of actual steps is determined from the `<Step>` components.

For example:

```vue
<StepperWizard
  :header-title="[
    'Personal Information',
    'Contact Details',
    'Confirmation',
  ]"
>
  <Step title="Personal Information">
    ...
  </Step>

  <Step title="Contact Details">
    ...
  </Step>

  <Step title="Confirmation">
    ...
  </Step>
</StepperWizard>
```

---

# 👁️ Show / Hide Header

The progress header can be disabled.

```vue
<StepperWizard
  :header-title="headerTitle"
  :show-header="false"
>
```

By default:

```js
showHeader: true
```

---

# 📝 Custom Button Labels

Navigation buttons support custom labels.

```vue
<StepNext
  :action="next"
  label="Continue"
/>

<StepPrevious
  :action="previous"
  label="Back"
/>

<StepConfirm
  :action="confirm"
  label="Submit"
/>
```

This allows the host application to handle translations without StepperForm requiring Vue I18n.

---

# ✅ VeeValidate Integration

StepperForm can optionally integrate with VeeValidate.

Install VeeValidate:

```bash
npm install vee-validate
```

Then use the VeeValidate `Form` component.

```vue
<script setup>
import { Form } from 'vee-validate'

import {
  StepperWizard,
  Step,
} from 'StepperForm'

const headerTitle = [
  'Personal Information',
  'Contact Information',
  'Confirmation',
]

async function handleFinish() {
  await submitForm()
}

async function submitForm() {
  console.log('Submitting form')
}
</script>

<template>
  <Form v-slot="{ validate }">

    <StepperWizard
      :header-title="headerTitle"
      :validate="validate"
      @finish="handleFinish"
    >

      <Step title="Personal Information">
        <Step1 />
      </Step>

      <Step title="Contact Information">
        <Step2 />
      </Step>

      <Step title="Confirmation">
        <Step3 />
      </Step>

    </StepperWizard>

  </Form>
</template>
```

When the user clicks **Next**, StepperForm calls the supplied validation function.

If validation fails:

```text
User clicks Next
       ↓
   validate()
       ↓
   Invalid
       ↓
Stay on current step
```

If validation succeeds:

```text
User clicks Next
       ↓
   validate()
       ↓
     Valid
       ↓
Move to next step
```

---

# 🏁 Finish Event

When the final step is confirmed, StepperForm emits the `finish` event.

```vue
<StepperWizard
  @finish="handleFinish"
>
```

Example:

```js
async function handleFinish() {
  await submitBooking()
}
```

This is where the application can:

* Submit data
* Call an API
* Save the form
* Show a success message
* Redirect the user

---

# 🔄 Change Event

Step changes emit the `change` event.

```vue
<StepperWizard
  @change="handleStepChange"
/>
```

Example:

```js
function handleStepChange(step) {
  console.log('Current step:', step)
}
```

The value is **1-based**:

```text
Step 1 → 1
Step 2 → 2
Step 3 → 3
```

---

# 🧠 useStepperForm

StepperForm exposes its step-management logic through the `useStepperForm` composable.

```js
import {
  useStepperForm,
} from 'StepperForm'
```

Usage:

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

---

## API

### `step`

Reactive current step.

```js
step.value
```

Example:

```text
1
```

---

### `total`

Total number of steps.

```js
total.value
```

---

### `isFirstStep`

Indicates whether the wizard is currently on the first step.

```js
isFirstStep.value
```

---

### `isLastStep`

Indicates whether the wizard is currently on the final step.

```js
isLastStep.value
```

---

### `progress`

Returns the current progress percentage.

```js
progress.value
```

For three steps:

```text
Step 1 → 0%
Step 2 → 50%
Step 3 → 100%
```

---

### `next()`

Moves to the next step.

```js
next()
```

---

### `previous()`

Moves to the previous step.

```js
previous()
```

---

### `goTo(step)`

Navigates directly to a specific step.

```js
goTo(3)
```

---

### `reset()`

Resets the wizard to its initial step.

```js
reset()
```

---

# 🔗 Accessing Wizard State in Steps

StepperForm provides wizard state to child components through Vue's `provide/inject`.

Inside a component:

```js
import { inject } from 'vue'

const stepper = inject('stepper')
```

Available properties include:

```js
stepper.step

stepper.currentStep

stepper.totalSteps

stepper.isFirstStep

stepper.isLastStep

stepper.progress
```

Navigation methods are also available:

```js
stepper.next()

stepper.previous()

stepper.goTo(2)

stepper.reset()
```

---

# 🌍 Internationalization

StepperForm does not depend on Vue I18n.

This keeps the library framework-friendly and allows the host application to use any translation solution.

For example:

```vue
<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const headerTitle = [
  t('booking.steps.personal'),
  t('booking.steps.contact'),
  t('booking.steps.confirmation'),
]
</script>

<template>
  <StepperWizard
    :header-title="headerTitle"
  />
</template>
```

The same approach can be used for navigation labels:

```vue
<StepNext
  :action="next"
  :label="t('common.next')"
/>
```

---

# 🎨 Styling

StepperForm includes a dedicated stylesheet:

```text
src/assets/styles/StepperForm.css
```

The main styling classes include:

```css
.stepper
.stepper-track
.step-item
.step-dot
.step-label
.stepper-wizard
.wizard-content
```

Step states use:

```css
.step-item.completed
.step-item.current
.step-item.upcoming
```

You can override these styles from the host application to match your design system.

---

# 📐 Responsive Design

StepperForm is designed to work across:

* Desktop
* Tablet
* Mobile

The header uses responsive behavior to keep the wizard usable on smaller screens.

For example, step labels can be hidden on mobile while the step indicators remain visible.

---

# 🏗️ Architecture

StepperForm follows a simple architecture:

```text
                    StepperWizard
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
   StepperHeader      Wizard Content   Navigation
                          │               │
                    ┌─────┼─────┐    ┌────┼────┐
                    ▼     ▼     ▼    ▼    ▼    ▼
                  Step1 Step2 Step3 Prev Next Confirm
```

The important principle is:

> **StepperWizard owns the state.**

The parent application only provides the steps and responds to events.

This avoids having to maintain duplicate state such as:

```js
step
maxStep
isFirstStep
isLastStep
progress
```

inside the parent component.

---

# 📋 Complete Example

A complete wizard can look like this:

```vue
<script setup>
import { Form } from 'vee-validate'

import {
  StepperWizard,
  Step,
} from 'StepperForm'

import Step1 from './steps/Step1.vue'
import Step2 from './steps/Step2.vue'
import Step3 from './steps/Step3.vue'

const headerTitle = [
  'Personal Information',
  'Contact Details',
  'Confirmation',
]

async function handleFinish() {
  await submitBooking()
}

async function submitBooking() {
  // Submit booking data
}
</script>

<template>
  <Form v-slot="{ validate }">

    <StepperWizard
      :header-title="headerTitle"
      :validate="validate"
      @finish="handleFinish"
    >

      <Step title="Personal Information">
        <Step1 />
      </Step>

      <Step title="Contact Details">
        <Step2 />
      </Step>

      <Step title="Confirmation">
        <Step3 />
      </Step>

    </StepperWizard>

  </Form>
</template>
```

---

# 🔧 Development

Install dependencies:

```bash
npm install
```

Run the development project:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

# 🛠️ Requirements

StepperForm requires:

* Vue 3
* Node.js
* A modern JavaScript environment

VeeValidate is **optional** and only required when form validation is needed.

---

# 🚧 Roadmap

Possible future improvements:

* Per-step validation
* Validation schemas
* Skippable steps
* Disabled steps
* Step locking
* Custom header slots
* Custom navigation slots
* Step transitions
* Vertical wizard layout
* Custom progress indicators
* Async validation
* Persistent wizard state
* Accessibility improvements

---

# 🤝 Contributing

Contributions are welcome.

When contributing:

1. Keep the project JavaScript-based.
2. Maintain the existing component structure.
3. Avoid unnecessary dependencies.
4. Keep components reusable.
5. Preserve the public API where possible.
6. Test navigation behavior.
7. Test validation behavior.
8. Ensure responsive behavior.

---
