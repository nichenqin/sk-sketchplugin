<template>
  <div id="app">
    <h1>{{currentComponent}}</h1>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';
import bridgeHandler from './assets/js/handler';

export default {
  name: 'app',
  data() {
    return {
      currentComponent: '',
    };
  },
  methods: {
    importComponent() {
      pluginCall('import', 'button');
      console.log(this.currentComponent);
    },
  },
  created() {
    pluginCall('appLoaded');
    bridgeHandler(name => {
      console.log(name);
      this.currentComponent = name;
    });
  },
};
</script>

<style lang="less">

</style>