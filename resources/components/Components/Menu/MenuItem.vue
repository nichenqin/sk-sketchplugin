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

      <div class="input-group-prepend">
        <label class="input-group-text">icon</label>
      </div>
      <select class="custom-select" v-model="option.icon">
        <option value="">Choose a icon...</option>
        <option v-for="icon of icons" :value="icon" :key="icon">{{ icon }}</option>
      </select>

      <i class="fa fa-plus-circle mr-1" @click="addOption" v-if="level < 3"></i>

      <i class="fa fa-minus-circle" @click="$emit('remove', index)"></i>

    </div>

    <template v-if="option.children && option.children.length">
      <sk-menu-item :style="{ marginLeft }" v-for="(child, index) of option.children" :key="index"
        :option="child" :generateOption="generateOption" :level="level + 1" :index="index"
        :icons="icons" @remove="removeOption"></sk-menu-item>
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
    index: Number,
    generateOption: Function,
    level: {
      type: Number,
      default: 1,
    },
    icons: {
      type: Array,
      required: true,
    },
  },
  computed: {
    marginLeft() {
      return `${this.level * 10}px`;
    },
  },
  methods: {
    addOption() {
      const { option: { children }, level } = this;
      children.push(this.generateOption(`level-${level + 1}-${children.length + 1}`));
      console.log(children);
    },
    removeOption(index) {
      this.option.children.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
i.fa {
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.1s;
  &.fa-plus-circle {
    color: #80e27e;
    &:hover {
      color: #087f23;
    }
  }
  &.fa-minus-circle {
    color: #fdd835;
    &:hover {
      color: #c6a700;
    }
  }
}
</style>
