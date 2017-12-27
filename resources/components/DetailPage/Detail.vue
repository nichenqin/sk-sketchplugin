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
    <button class="btn btn-success btn-block" @click="handleSelect">选择</button>
    <button class="btn btn-success btn-block" @click="handleDuplicate">复制</button>
    <button class="btn btn-success btn-block" @click="test">测试</button>

    <component :is="`sk-${currentComponent}`" :path="path" :currentComponent="currentComponent"
      :status.sync="status" :currentType.sync="currentType"></component>

    <button class="btn btn-primary btn-block" @click="handleSubmit">导入到Sketch</button>
  </div>
</template>

<script>
import pluginCall from 'sketch-module-web-view/client';
import SkButton from '../Components/Button/Button.vue';
import SkList from '../Components/List/List.vue';
import SkDatepicker from '../Components/Datepicker/Datepicker.vue';
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
      currentType: '',
      status: 'normal',
      layerName: '',
      objectID: '',
    };
  },
  props: ['currentComponent'],
  computed: {
    path() {
      const { currentComponent, currentType, status } = this;
      const path = [currentComponent, currentType, status].filter(p => !!p);
      return path.join('/');
    },
  },
  methods: {
    back() {
      this.$emit('updateCurrentPage', 'sk-home');
    },
    handleSubmit() {
      console.log(this.path);
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