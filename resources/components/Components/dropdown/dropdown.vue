<template>
  <section>
    <form @submit.prevent="handleImport">

      <template v-for="(option, index) of options">

        <div class="input-group mb-3" :key="index">
          <div class="input-group-prepend">
            <div class="input-group-text">option-{{index}}</div>
          </div>
          <input type="text" class="form-control" v-model="option.title">
        </div>

      </template>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="dropdownShowPicker" v-model="showPicker">
        <label for="dropdownShowPicker" class="custom-control-label">Show Picker</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="dropdownShowSearch" v-model="showSearch">
        <label for="dropdownShowSearch" class="custom-control-label">Show Search</label>
      </div>

      <sk-alignment :alignment.sync="dropdownAlign"></sk-alignment>

      <button class="btn btn-lg btn-block btn-primary" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-picker v-model="option">
        <tb-dropdown v-model="option" :options="options" :hasSearch="showSearch"></tb-dropdown>
      </tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Dropdown as TbDropdown, Picker as TbPicker } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';
import SkAlignment from '../../shared/radio/alignment.vue';

export default {
  data() {
    return {
      showPicker: true,
      showSearch: true,
      searchWord: 'search word',

      option: '',
      options: [...new Array(3)].map((val, index) => ({ title: `option-${index + 1}` })),

      dropdownAlign: 'center',
    };
  },
  components: {
    TbDropdown,
    TbPicker,
    SkPreview,
    SkAlignment,
  },
  methods: {
    handleImport() {
      const { showPicker, showSearch, searchWord, dropdownAlign, options } = this;
      const payload = { showPicker, showSearch, searchWord, dropdownAlign, options };
      this.$emit('import', payload);
    },
  },
};
</script>
