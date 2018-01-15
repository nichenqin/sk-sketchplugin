<template>
  <label class="btn btn-secondary" :class="{ active: checked }" :for="id">
    <input type="radio" :id="id" :value="value" :checked="checked" @change="handleChange">
    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    value: {},
    id: {
      type: String,
      default() {
        return `sk-radio-${this._uid}`;
      },
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleChange() {
      this.$parent.handleChange(this.value);
    },
  },
};
</script>

<style scoped>
label.btn {
  flex: 1;
}
</style>
