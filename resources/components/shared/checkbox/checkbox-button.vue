<template>
  <label class="btn btn-primary btn-lg btn-block" :class="{ 'btn-secondary': !checked }">
    <input type="checkbox" v-model="checked" @change="handleChange">
    <slot></slot>
  </label>
</template>

<script>
export default {
  data() {
    return {
      checked: this.value,
    };
  },
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  methods: {
    handleChange() {
      this.$emit('input', this.checked);
    },
  },
};
</script>

<style scoped>
input {
  display: none;
}
</style>
