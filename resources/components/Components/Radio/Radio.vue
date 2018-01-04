<template>
  <section>
    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-primary" @click="addOption">Add Option</button>
      <button class="btn btn-warning" @click="removeOption">Remove Option</button>
    </div>

    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" class="custom-control-input" id="radioIsCol" v-model="isCol">
      <label class="custom-control-label" for="radioIsCol">Column</label>
    </div>

    <button class="btn btn-primary btn-lg btn-block" @click="handleImport">Import To Sketch</button>

    <sk-preview>
      <tb-radio-group :options="optionValues" :arrange="arrange"></tb-radio-group>
    </sk-preview>
  </section>
</template>

<script>
import { RadioGroup as TbRadioGroup } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

const optionsData = [...new Array(3)].map((val, index) => ({
  value: `option-${index + 1}`,
  type: 'normal',
}));

export default {
  data() {
    return {
      isCol: true,
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
  },
  methods: {
    addOption() {
      const len = this.options.length;
      this.options.push({ value: `option-${len + 1}`, type: 'normal' });
    },
    removeOption() {
      this.options.pop();
    },
    handleImport() {
      const { options } = this;
      const payload = { options };
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
