<template>
  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <label class="input-group-text">name</label>
    </div>
    <input type="text" class="form-control mb-1" v-model="option.name">
    <div class="input-group-prepend">
      <label class="input-group-text">expand</label>
    </div>
    <input type="text" disabled class="form-control mb-1" v-model="option.expand">
    <template v-if="option.children && option.children.length">
      <sk-menu-item v-for="(child, index) of option.children" :key="index" :option="child"></sk-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sk-menu-item',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
};
</script>
