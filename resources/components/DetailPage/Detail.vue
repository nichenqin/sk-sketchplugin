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

    <keep-alive>
      <component class="mb-3" :is="`sk-${currentComponent}`" :currentComponent="currentComponent"
        @import="handleImport" :objectID="objectID"></component>
    </keep-alive>

    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-primary" :disabled="!objectID" @click="handleSelect">Select</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handelDeselect">Deselect</button>
    </div>

    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-warning" :disabled="!objectID" @click="handleDuplicate">Duplicate</button>
      <button class="btn btn-danger" :disabled="!objectID" @click="handleRemove">Remove</button>
    </div>

    <button class="btn btn-primary btn-lg btn-block mb-3" @click="test">Test</button>

  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import bridgeHandler from '../../assets/js/handler';

import SkBread from '../Components/Bread';
import SkButton from '../Components/Button';
import SkList from '../Components/List';
import SkText from '../Components/Text';
import SkLongInput from '../Components/LongInput';
import SkShortInput from '../Components/ShortInput';
import SkRadio from '../Components/Radio';
import SkDatepicker from '../Components/Datepicker';
import SkSwitch from '../Components/Switch';
import SkUploadFile from '../Components/UploadFile';
import SkPagination from '../Components/Pagination';
import SkRectangle from '../Components/Rectangle';
import SkDropdown from '../Components/Dropdown';
import SkPicker from '../Components/Picker';
import SkTimepicker from '../Components/Timepicker';
import SkCheckbox from '../Components/Checkbox';
import SkPopover from '../Components/Popover';
import SkMenu from '../Components/Menu';

export default {
  name: 'app',
  components: {
    SkBread,
    SkButton,
    SkList,
    SkText,
    SkLongInput,
    SkShortInput,
    SkRadio,
    SkDatepicker,
    SkSwitch,
    SkUploadFile,
    SkPagination,
    SkRectangle,
    SkDropdown,
    SkPicker,
    SkTimepicker,
    SkCheckbox,
    SkPopover,
    SkMenu,
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
      PluginCall('select', this.objectID);
    },
    handelDeselect() {
      if (!this.objectID) return;
      PluginCall('deselect', this.objectID);
      this.clearObjectID();
    },
    handleDuplicate() {
      if (!this.objectID) return;
      PluginCall('duplicate', this.objectID);
    },
    handleRemove() {
      PluginCall('remove', this.objectID);
    },
    handleImport(payload) {
      PluginCall('import', this.currentComponent, payload);
    },
    test() {
      PluginCall('test', this.objectID);
    },
  },
  beforeCreate() {
    PluginCall('appLoaded');
    bridgeHandler(({ layerName, objectID }) => {
      this.layerName = layerName;
      this.$emit('updateComponent', layerName.split('/')[0]);
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
