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

      <button class="btn btn-primary btn-block btn-lg" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-short-input v-model="content"></tb-short-input>
    </sk-preview>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { ShortInput as TbShortInput } from '@zhinan/tb-components';

import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      content: '',
      unit: '',
      placeholder: '',
      status: 'normal',
      allStatus: ['normal', 'error', 'active', 'disable', 'placeholder'],
    };
  },
  props: ['currentComponent'],
  components: {
    TbShortInput,
    SkPreview,
    SkCodeHtml,
    SkCodeJavascript,
  },
  computed: {
    path() {
      const { currentComponent, unit, status } = this;
      const path = [currentComponent, unit, status].filter(p => !!p);
      return path.join('/');
    },
  },
  methods: {
    handleImport() {
      const { currentComponent, path, content } = this;
      const payload = { path, content };
      PluginCall('import', currentComponent, payload);
    },
  },
};
</script>
