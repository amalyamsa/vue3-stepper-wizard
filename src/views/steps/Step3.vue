<script setup>
defineProps({
  details: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <h5 class="mb-3">3: Summary</h5>

  <div class="row g-3 mb-2">
    
    <div class="row gy-2">
      <div class="col-12 col-md-4">
        <label class="form-label text-muted">First Name</label>
        <p class="large-input mb-0">Firts Name Added</p>
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label text-muted">Middle Name</label>
        <p class="large-input mb-0">Middle Name Added</p>
      </div>
      <div class="col-12 col-md-4">
        <label class="form-label text-muted">Last Name</label>
        <p class="large-input mb-0">Last Name Added</p>
      </div>
    </div>
    <div class="row gy-2">
      <div class="col-12 col-md-6">
        <label class="form-label text-muted">Phone Number</label>
        <p class="large-input mb-0">Phone Number Added</p>
      </div>
      <div class="col-12 col-md-6">
        <label class="form-label text-muted">Email Address</label>
        <p class="large-input mb-0">Email Address Added</p>
      </div>
    </div>

  </div>
</template>