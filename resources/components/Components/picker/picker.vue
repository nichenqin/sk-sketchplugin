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

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="pickerShowRelevant" v-model="relevant.show">
        <label class="custom-control-label" for="pickerShowRelevant">Show Relevant</label>
      </div>

      <template v-if="relevant.show">

        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text">relevants</label>
          </div>
          <select class="custom-select" v-model="relevant.name">
            <option value="">Choose a relevant...</option>
            <option v-for="r of relevants" :value="r" :key="r">{{ r }}</option>
          </select>
        </div>

        <sk-alignment :alignment.sync="relevant.alignment"></sk-alignment>

      </template>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-picker v-model="content" :placeholder="placeholder"></tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPicker } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';
import SkAlignment from '../../shared/radio/alignment.vue';

export default {
  data() {
    return {
      content: 'picker content',
      placeholder: 'default placeholder',

      status: 'normal',
      allStatus: ['active', 'hover', 'disable', 'normal'],

      type: '',
      types: ['time', 'date', 'empty'],

      relevant: {
        show: false,
        name: '',
        alignment: 'center',
      },
      relevants: ['dropdown', 'datepicker', 'timepicker'],
    };
  },
  components: {
    TbPicker,
    SkPreview,
    SkAlignment,
  },
  methods: {
    handleImport() {
      const { content, placeholder, type, status, relevant } = this;
      const payload = { content, placeholder, type, status, relevant };
      this.$emit('import', payload);
    },
  },
};
</script>
