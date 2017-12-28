<template>
  <div class="detail">
    <button type="button" class="btn btn-warning" @click="back">返回</button>
    <h1>Component:
      <span class="badge badge-secondary">{{ currentComponent }}</span>
    </h1>
    <h2>layerName:
      <span class="badge badge-secondary">{{ layerName }}</span>
    </h2>
    <h2>objectID:
      <span class="badge badge-secondary">{{ objectID }}</span>
    </h2>
    <div class="btn-group btn-group-lg mb-3" role="group">
      <button class="btn btn-success" :disabled="!objectID" @click="handleSelect">选择</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handelDeselect">取消选择</button>
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDuplicate">复制</button>
      <button class="btn btn-primary" @click="test">测试</button>
    </div>

    <component :is="`sk-${currentComponent}`" :currentComponent="currentComponent"></component>

  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';
import SkButton from '../Components/Button/Button';
import SkList from '../Components/List/List';
import SkDatepicker from '../Components/Datepicker/Datepicker';
import bridgeHandler from '../../assets/js/handler';

export default {
  name: 'app',
  components: {
    SkButton,
    SkList,
    SkDatepicker,
  },
  data() {
    return {
      layerName: '',
      objectID: '',
    };
  },
  props: ['currentComponent'],

  methods: {
    back() {
      this.$emit('updateCurrentPage', 'sk-home');
    },
    handleSelect() {
      if (!this.objectID) return;
      pluginCall('select', this.objectID);
    },
    handelDeselect() {
      if (!this.objectID) return;
      pluginCall('deselect', this.objectID);
    },
    handleDuplicate() {
      if (!this.objectID) return;
      pluginCall('duplicate', this.objectID);
    },
    test() {
      pluginCall('test');
    },
  },
  beforeCreate() {
    pluginCall('appLoaded');
    bridgeHandler(({ layerName, objectID }) => {
      this.layerName = layerName;
      this.objectID = objectID;
    });
  },
};
</script>

<style lang="less">

</style>