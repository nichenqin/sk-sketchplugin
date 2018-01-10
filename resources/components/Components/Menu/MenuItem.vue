<template>
  <div>

    <div class="input-group mb-2">

      <div class="input-group-prepend">
        <label class="input-group-text">name</label>
      </div>
      <input type="text" class="form-control mb-1 mr-1" v-model="option.name">

      <div class="input-group-prepend">
        <label class="input-group-text">sub title</label>
      </div>
      <input type="text" class="form-control mb-1 mr-1" v-model="option.subtitle">

      <i class="fa fa-plus-circle" @click="addOption"></i>

    </div>

    <template v-if="option.children && option.children.length">
      <sk-menu-item :style="{ marginLeft }" v-for="(child, index) of option.children" :key="index"
        :option="child" :generateOption="generateOption" :level="level + 1"></sk-menu-item>
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
    generateOption: Function,
    level: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    marginLeft() {
      return `${this.level * 10}px`;
    },
  },
  methods: {
    addOption() {
      const { option: { children }, generateOption, level } = this;
      children.push(generateOption(`level-${level + 1}-${children.length + 1}`));
    },
  },
};
</script>
