<template>
  <div id="app">
    <button @click="handleClick">按钮</button>
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
    handleClick() {
      pluginCall('import', 'button');
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
button {
  width: 100%;
  height: 30px;
}
</style>