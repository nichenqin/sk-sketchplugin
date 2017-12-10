<template>
  <div id="app">
    <button @click="importComponent">button</button>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';

export default {
  name: 'app',
  methods: {
    importComponent() {
      pluginCall('import', 'button');
      console.log(window.button.title);
    },
    log() {
      pluginCall('nativeLog', 'From vue.js!');
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 240px;
  height: 180px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn {
  padding: 10px 15px;
  width: 100px;
  text-align: center;
  color: #fff;
  background-color: #42b983;
}
</style>