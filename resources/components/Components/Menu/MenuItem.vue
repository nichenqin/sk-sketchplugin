<template>
  <li>
    <input type="text" class="form-control mb-1" v-model="option.name">
    <template v-if="option.children && option.children.length">
      <sk-menu-item v-for="(child, index) of option.children" :key="index" :option="child"></sk-menu-item>
    </template>
  </li>
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
