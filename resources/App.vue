<template>
  <div id="app">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model.lazy="path">
      <button @submit="handleSubmit">导入到Sketch</button>
    </form>
    <h1>current selected symbol name:</h1>
    <h2>{{currentComponent}}</h2>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';
import bridgeHandler from './assets/js/handler';

export default {
  name: 'app',
  data() {
    return {
      path: 'button/normal',
      currentComponent: '',
    };
  },
  methods: {
    handleSubmit() {
      pluginCall('import', this.path);
    },
  },
  created() {
    pluginCall('appLoaded');
    bridgeHandler(name => {
      this.currentComponent = name;
    });
  },
};
</script>

<style lang="less">
input,
button {
  font-size: 16px;
  width: 100%;
  height: 30px;
}
</style>