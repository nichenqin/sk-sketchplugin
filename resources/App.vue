<template>
  <div id="app">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model.lazy="path">
      <button @submit="handleSubmit">导入到Sketch</button>
    </form>
    <hr>
    <h1>Selected Layer Name:</h1>
    <h2>{{layerName}}</h2>
    <hr>
    <h1>ObjectID:</h1>
    <h2>{{objectID}}</h2>
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
      layerName: '',
      objectID: '',
    };
  },
  methods: {
    handleSubmit() {
      pluginCall('import', this.path);
    },
  },
  mounted() {
    pluginCall('appLoaded');
    bridgeHandler(({ layerName, objectID }) => {
      this.layerName = layerName;
      this.objectID = objectID;
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