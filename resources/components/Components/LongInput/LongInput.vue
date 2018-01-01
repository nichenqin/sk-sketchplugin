<template>
  <div>
    <form @submit.prevent="handleImport">

      <textarea class="form-control mb-3" v-model="content"></textarea>

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

      <button class="btn btn-primary btn-block btn-lg" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-long-input v-model="content"></tb-long-input>
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
      content: 'content',
      status: 'normal',
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
      const { currentComponent, path } = this;
      PluginCall('import', currentComponent, { path });
    },
  },
};
</script>
