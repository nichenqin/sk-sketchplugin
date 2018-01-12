<template>
  <section>

    <div class="btn-group btn-group-lg mb-3 d-flex" role="group">
      <button class="btn btn-primary" @click.stop="addOption">Add Option</button>
      <button class="btn btn-warning" @click.stop="removeOption">Remove Option</button>
    </div>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3" v-for="(option, index) of options" :key="index">
        <div class="input-group-prepend">
          <label class="input-group-text">option-{{index + 1}}</label>
        </div>
        <input type="text" class="form-control" v-model="option.value">
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="checkboxIsCol" v-model="isCol">
        <label class="custom-control-label" for="checkboxIsCol">Column</label>
      </div>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-checkbox-group :options="optionValues" :arrange="arrange" v-model="selectedOptions"
        width="100"></tb-checkbox-group>
    </sk-preview>

  </section>
</template>

<script>
import { CheckboxGroup as TbCheckboxGroup } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';

const optionsData = [...new Array(3)].map((val, index) => ({
  value: `option-${index + 1}`,
  type: 'normal',
}));

export default {
  data() {
    return {
      isCol: true,
      selectedOptions: ['option-1'],
      options: optionsData,
    };
  },
  components: {
    TbCheckboxGroup,
    SkPreview,
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
      const { options, selectedOptions, isCol } = this;
      const payload = { options, selectedOptions, isCol };
      this.$emit('import', payload);
    },
  },
};
</script>
