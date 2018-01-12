<template>
  <div class="btn-group btn-group-toggle mb-3 d-flex">
    <slot></slot>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>
