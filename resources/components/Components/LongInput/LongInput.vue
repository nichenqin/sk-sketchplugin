<template>
  <div>
    <form @submit.prevent="handleImport">

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
            Placeholder
          </div>
        </div>
        <input type="text" class="form-control" v-model="placeholder">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Height
          </div>
        </div>
        <input type="number" v-model.number="height" class="form-control">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Width
          </div>
        </div>
        <input type="number" v-model.number="width" class="form-control">
      </div>

      <button class="btn btn-primary btn-block btn-lg" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-long-input v-model="content" :height="height" :width="width" :placeholder="placeholder"
        :fixedHeight="fixedHeight" :fixedWidth="fixedWidth" :fixed="fixed" :disabled="disabled"></tb-long-input>
    </sk-preview>

    <sk-code-html tag="tb-long-input" :properties="properties"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>
  </div>
</template>

<script>
import { LongInput as TbLongInput } from '@zhinan/tb-components';

import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      content: '',
      status: 'normal',
      height: 300,
      width: 300,
      fixedHeight: false,
      fixedWidth: false,
      fixed: false,
      placeholder: 'default placeholder',
      allStatus: ['normal', 'active', 'error', 'disable'],
    };
  },
  components: {
    TbLongInput,
    SkPreview,
    SkCodeHtml,
    SkCodeJavascript,
  },
  computed: {
    disabled() {
      return this.status === 'disable';
    },
    properties() {
      const {
        content,
        width,
        height,
        fixedHeight,
        fixedWidth,
        fixed,
        disabled,
        placeholder,
      } = this;
      const properties = {
        value: content,
        width,
        height,
        fixedHeight,
        fixedWidth,
        fixed,
        disabled,
        placeholder,
      };
      return properties;
    },
  },
  methods: {
    handleImport() {
      const { status, content, width, height, placeholder } = this;
      const payload = { status, content, width, height, placeholder };
      this.$emit('import', payload);
    },
  },
};
</script>
