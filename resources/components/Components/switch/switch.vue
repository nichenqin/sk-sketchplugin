<template>
  <div>
    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="switch-disabled" v-model="disabled">
        <label for="switch-disabled" class="custom-control-label">Disabled</label>
      </div>

      <button class="btn btn-primary btn-lg btn-block mb-3" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-switch v-model="isOn" :disabled="disabled"></tb-switch>
    </sk-preview>

    <sk-code-html :properties="properties"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>

  </div>
</template>

<script>
import { TbSwitch } from '@zhinan/tb-components';

import SkPreview from '../../shared/preview.vue';
import SkCodeHtml from '../../shared/code/code-html.vue';
import SkCodeJavascript from '../../shared/code/code-javascript.vue';

export default {
  data() {
    return {
      isOn: true,
      disabled: false,
    };
  },
  components: {
    TbSwitch,
    SkPreview,
    SkCodeHtml,
    SkCodeJavascript,
  },
  computed: {
    properties() {
      const { disabled, isOn } = this;
      return { disabled, isOn };
    },
  },
  methods: {
    handleImport() {
      const { isOn, disabled } = this;
      const payload = { isOn, disabled };
      this.$emit('import', payload);
    },
  },
};
</script>
