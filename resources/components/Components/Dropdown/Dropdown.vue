<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="dropdownShowSearch" v-model="showSearch">
        <label for="dropdownShowSearch" class="custom-control-label">Show Search</label>
      </div>

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

export default {
  data() {
    return {
      showPicker: true,
      showSearch: false,
      searchWord: 'search word',
      option: '',
      options: [...new Array(3)].map((val, index) => ({ title: `option-${index + 1}` })),
    };
  },
  components: {
    TbDropdown,
    TbPicker,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { showPicker, showSearch, searchWord } = this;
      const payload = { showPicker, showSearch, searchWord };
      this.$emit('import', payload);
    },
  },
};
</script>
