<template>
  <div>
    <h1>Switch</h1>
    <button class="btn btn-primary btn-lg btn-block mb-3" @click="handleImport">Import To Sketch</button>
    <sk-preview>
      <tb-switch v-model="status"></tb-switch>
    </sk-preview>
  </div>
</template>

<script>
import { TbSwitch } from '@zhinan/tb-components';

import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      status: 'on',
    };
  },
  components: {
    TbSwitch,
    SkPreview,
  },
  computed: {
    path() {
      const { status } = this;
      return `switch/${status}`;
    },
  },
  methods: {
    handleImport() {
      const { path } = this;
      const payload = { path };
      this.$emit('import', payload);
    },
  },
};
</script>
