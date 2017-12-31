<template>
  <div class="btn-group btn-group-toggle mb-3 d-flex">
    <label class="btn btn-secondary" :class="{ active: internalOption }" @click="internalOption = true">
      <input type="radio" name="options" autocomplete="off" :checked="internalOption">静态
    </label>
    <label class="btn btn-secondary" :class="{ active: !internalOption }" @click="internalOption = false">
      <input type="radio" name="options" autocomplete="off" :checked="!internalOption">动态
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      internalOption: true,
    };
  },
  props: ['option'],
  watch: {
    internalOption(option) {
      this.$emit('update:option', option);
    },
  },
};
</script>


<style scoped>
.btn {
  flex: 1;
}
</style>
