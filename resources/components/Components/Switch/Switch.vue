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
  </div>
</template>

<script>
import { Switcher as TbSwitch } from '@zhinan/tb-components';

import SkPreview from '../../Shared/Preview.vue';

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
  },
  methods: {
    handleImport() {
      const { isOn, disabled } = this;
      const payload = { isOn, disabled };
      this.$emit('import', payload);
    },
  },
  watch: {
    disabled(disabled) {
      if (disabled) this.isOn = false;
    },
  },
};
</script>
