<template>
  <div id="app" class="container">
    <h1>Component:
      <span class="badge badge-secondary">{{ root }}</span>
    </h1>
    <h2>layerName:
      <span class="badge badge-secondary">{{ layerName }}</span>
    </h2>
    <h2>objectID:
      <span class="badge badge-secondary">{{ objectID }}</span>
    </h2>
    <button class="btn btn-success btn-block" @click="handleSelect">选择</button>
    <button class="btn btn-success btn-block" @click="handleDuplicate">复制</button>
    <button class="btn btn-success btn-block" @click="test">测试</button>
    <br>
    <div class="card">
      <div class="card-header">
        预览
      </div>
      <div class="card-body">
        <h4 class="card-title">Button</h4>
        <tb-button :type="type">按钮</tb-button>
      </div>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label> 完整路径： </label>
        <input type="text" class="form-control" readonly disabled v-model.lazy="path">
      </div>
      <div class="form-group">
        <label>类型</label>
        <select class="form-control" v-model="type">
          <option value="">请选择类型</option>
          <option value="risk">risk</option>
          <option value="tab">tab</option>
          <option value="ghost">ghost</option>
          <option value="line_gray">line_gray</option>
          <option value="line_blue">line_blue</option>
        </select>
      </div>
      <div class="form-group">
        <label>状态</label>
        <select class="form-control" v-model="status">
          <option value="normal">normal</option>
          <option value="hover">hover</option>
          <option value="active">active</option>
          <option value="disable">disable</option>
        </select>
      </div>
      <button class="btn btn-primary btn-block" @submit="handleSubmit">导入到Sketch</button>
    </form>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';
import { TbButton } from '@zhinan/tb-components';
import bridgeHandler from './assets/js/handler';

export default {
  name: 'app',
  components: {
    TbButton,
  },
  data() {
    return {
      root: 'button',
      type: '',
      status: 'normal',
      layerName: '',
      objectID: '',
    };
  },
  computed: {
    path() {
      const { root, type, status } = this;
      const path = [root, type, status].filter(p => !!p);
      return path.join('/');
    },
  },
  methods: {
    handleSubmit() {
      pluginCall('import', this.path);
    },
    handleSelect() {
      if (!this.objectID) return;
      pluginCall('select', this.objectID);
    },
    handleDuplicate() {
      if (!this.objectID) return;
      pluginCall('duplicate', this.objectID);
    },
    test() {
      pluginCall('test');
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

</style>