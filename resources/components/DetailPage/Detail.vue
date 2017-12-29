<template>
  <div class="detail">
    <button type="button" class="btn btn-warning" @click="back">返回</button>
    <h1>Component:
      <span class="badge badge-secondary">{{ currentComponent }}</span>
    </h1>
    <div class="alert alert-primary" role="alert">
      LayerName:
      <strong>{{ layerName }}</strong>
    </div>
    <div class="alert alert-primary" role="alert">
      ObjectID:
      <strong>{{ objectID }}</strong>
    </div>

    <component :is="`sk-${currentComponent}`" :currentComponent="currentComponent"></component>

    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-success" :disabled="!objectID" @click="handleSelect">选择</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handelDeselect">取消选择</button>
    </div>
    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDuplicate">复制</button>
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDetach">分解Symbol</button>
    </div>
    <button class="btn btn-primary btn-lg btn-block mb-3" @click="test">测试按钮</button>

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
    handleDetach() {
      if (!this.objectID) return;
      pluginCall('detach', this.objectID);
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

<style scoped>
.btn {
  flex: 1;
}
</style>
