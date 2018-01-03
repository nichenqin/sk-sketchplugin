<template>
  <div>
    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Status
          </div>
        </div>
        <select class="custom-select" v-model="status">
          <option :value="s" v-for="s of allStatus">{{ s }}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Height
          </div>
        </div>
        <input type="number" v-model="height" class="form-control">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Width
          </div>
        </div>
        <input type="number" v-model="width" class="form-control">
      </div>

      <button class="btn btn-primary btn-block btn-lg" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-long-input v-model="content" :height="height" :width="width" :placeholder="placeholder"></tb-long-input>
    </sk-preview>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { LongInput as TbLongInput } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      content: '',
      status: 'normal',
      height: 300,
      width: 300,
      placeholder: 'default placeholder',
      allStatus: ['normal', 'active', 'error', 'disable'],
    };
  },
  props: ['currentComponent'],
  components: {
    TbLongInput,
    SkPreview,
  },
  computed: {
    path() {
      const { content, status } = this;
      return content ? `longInput/${status}` : 'longInput/placeholder';
    },
  },
  methods: {
    handleImport() {
      const { currentComponent, path, content, width, height, placeholder } = this;
      const payload = { path, content, width, height, placeholder };
      PluginCall('import', currentComponent, payload);
    },
  },
};
</script>
