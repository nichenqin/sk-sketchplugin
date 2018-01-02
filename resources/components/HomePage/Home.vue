<template>
  <div>
    <h1>Home</h1>
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action" :class="{ active: component === currentComponent }"
        v-for="(component, index) of components" :key="index" @click="handleClickComponent(component)">
        {{ component }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      components: ['button', 'list', 'text', 'long-input', 'radio'],
    };
  },
  props: ['currentComponent'],
  methods: {
    handleClickComponent(component) {
      this.$emit('updateComponent', component);
    },
  },
};
</script>
