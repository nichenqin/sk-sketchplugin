<template>
  <div class="detail mb-4">
    <button type="button" class="btn btn-warning" @click="back">
      <i class="fa fa-arrow-left"></i>
      Back
    </button>
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
      <button class="btn btn-primary" :disabled="!objectID" @click="handleSelect">Select</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handelDeselect">Deselect</button>
    </div>
    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDuplicate">Duplicate</button>
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDetach">Detach</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handleRemove">Remove</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handleReplace">Replace</button>
    </div>
    <button class="btn btn-primary btn-lg btn-block mb-3" @click="test">Test</button>

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
    clearObjectID() {
      this.objectID = '';
    },
    handleSelect() {
      if (!this.objectID) return;
      pluginCall('select', this.objectID);
    },
    handelDeselect() {
      if (!this.objectID) return;
      pluginCall('deselect', this.objectID);
      this.clearObjectID();
    },
    handleDuplicate() {
      if (!this.objectID) return;
      pluginCall('duplicate', this.objectID);
    },
    handleDetach() {
      if (!this.objectID) return;
      pluginCall('detach', this.objectID);
    },
    handleRemove() {
      if (!this.objectID) return;
      pluginCall('remove', this.objectID);
      this.clearObjectID();
    },
    handleReplace() {
      pluginCall('replace', this.objectID, 'button/risk/normal');
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
