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

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Status
          </div>
        </div>
        <select class="custom-select" v-model="status">
          <option :value="s" v-for="s of allStatus" :key="s">{{ s }}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Type
          </div>
        </div>
        <select class="custom-select" v-model="type">
          <option value="">Choose a type...</option>
          <option :value="t" v-for="t of types" :key="t">{{ t }}</option>
        </select>
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

      status: 'normal',
      allStatus: ['active', 'hover', 'disable', 'normal'],

      type: '',
      types: ['time', 'date'],
    };
  },
  components: {
    TbPicker,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { content, placeholder, type, status } = this;
      const payload = { content, placeholder, type, status };
      this.$emit('import', payload);
    },
  },
};
</script>
