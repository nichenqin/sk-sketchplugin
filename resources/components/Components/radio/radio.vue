<template>
  <section>
    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-primary" @click="addOption">Add Option</button>
      <button class="btn btn-warning" @click="removeOption">Remove Option</button>
    </div>

    <div class="input-group mb-3" v-for="(option, index) of options" :key="index">
      <div class="input-group-prepend">
        <label class="input-group-text">option-{{index + 1}}</label>
      </div>
      <input type="text" class="form-control" v-model="option.value">

      <div class="custom-control custom-checkbox ml-2">
        <input type="checkbox" class="custom-control-input" :id="`radioDisable${index}`"
          v-model="option.disabled">
        <label class="custom-control-label" :for="`radioDisable${index}`">Disabled</label>
      </div>
    </div>

    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" class="custom-control-input" id="radioIsCol" v-model="isCol">
      <label class="custom-control-label" for="radioIsCol">Column</label>
    </div>

    <button class="btn btn-primary btn-lg btn-block" @click="handleImport">Import To Sketch</button>

    <sk-preview>
      <tb-radio-group :options="optionValues" :arrange="arrange" v-model="option" width="100"
        :disabled="disabled"></tb-radio-group>
    </sk-preview>
  </section>
</template>

<script>
import { RadioGroup as TbRadioGroup } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';

const optionsData = [...new Array(3)].map((val, index) => ({
  value: `option-${index + 1}`,
  type: 'normal',
  disabled: false,
}));

export default {
  data() {
    return {
      isCol: true,
      option: 'option-1',
      options: optionsData,
    };
  },
  components: {
    SkPreview,
    TbRadioGroup,
  },
  computed: {
    arrange() {
      return this.isCol ? undefined : 'row';
    },
    optionValues() {
      return this.options.map(({ value }) => value);
    },
    disabled() {
      return this.options.filter(({ disabled }) => disabled).map(({ value }) => value);
    },
  },
  methods: {
    addOption() {
      const len = this.options.length;
      this.options.push({ value: `option-${len + 1}`, type: 'normal', disabled: false });
    },
    removeOption() {
      this.options.pop();
    },
    handleImport() {
      const { options, option, isCol } = this;
      const payload = { options, option, isCol };
      this.$emit('import', payload);
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
