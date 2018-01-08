<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Content</label>
        </div>
        <input type="text" class="form-control" v-model="content">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Placeholder</label>
        </div>
        <input type="text" class="form-control" v-model="placeholder">
      </div>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-picker v-model="content" :placeholder="placeholder"></tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPicker } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      content: 'picker content',
      placeholder: 'default placeholder',
    };
  },
  components: {
    TbPicker,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { content, placeholder } = this;
      const payload = { content, placeholder };
      this.$emit('import', payload);
    },
  },
};
</script>
