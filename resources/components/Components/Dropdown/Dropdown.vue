<template>
  <section>
    <form @submit.prevent="handleImport">

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
import SkPreview from '../../Shared/Preview.vue';
import SkAlignment from '../../Shared/Radio/Alignment.vue';

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
      const { showPicker, showSearch, searchWord, dropdownAlign } = this;
      const payload = { showPicker, showSearch, searchWord, dropdownAlign };
      this.$emit('import', payload);
    },
  },
};
</script>
