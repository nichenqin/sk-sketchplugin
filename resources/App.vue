<template>
  <div id="app">
    <button @click="importComponent">button</button>
    <div v-if="currentComponent">
      {{ currentComponent.title }}
    </div>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';

export default {
  name: 'app',
  data() {
    return {
      currentComponent: null,
    };
  },
  methods: {
    importComponent() {
      pluginCall('import', 'button');
      console.log(this.currentComponent);
    },
  },
  created() {
    window.initComponent = component => {
      this.currentComponent = component;
    };
  },
};
</script>

<style lang="less">

</style>