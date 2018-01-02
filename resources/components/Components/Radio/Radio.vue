<template>
  <section>
    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-primary" @click="addOption">Add Option</button>
      <button class="btn btn-warning" @click="removeOption">Remove Option</button>
    </div>

    <button class="btn btn-primary btn-lg btn-block" @click="handleImport">Import To Sketch</button>

    <sk-preview>
      <tb-radio-group :options="optionValues"></tb-radio-group>
    </sk-preview>
  </section>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { RadioGroup as TbRadioGroup } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

const optionsData = [...new Array(3)].map(() => ({ value: 'option', type: 'normal' }));

export default {
  data() {
    return {
      options: optionsData,
    };
  },
  props: ['currentComponent'],
  components: {
    SkPreview,
    TbRadioGroup,
  },
  computed: {
    optionValues() {
      return this.options.map(({ value }) => value);
    },
  },
  methods: {
    addOption() {
      this.options.push({ value: 'option', type: 'normal' });
    },
    removeOption() {
      this.options.pop();
    },
    handleImport() {
      const { currentComponent, options } = this;
      const payload = { options };
      PluginCall('import', currentComponent, payload);
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
