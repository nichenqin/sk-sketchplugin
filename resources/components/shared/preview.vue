<template>
  <div class="card mb-3 mt-3">
    <div class="card-header">
      Preview
    </div>
    <div class="card-body d-flex justify-content-center">
      <h4 class="card-title">{{ title }}</h4>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
};
</script>
