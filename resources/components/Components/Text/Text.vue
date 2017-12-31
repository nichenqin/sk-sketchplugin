<template>
  <div>
    <form @submit.prevent="handleImport">

      <sk-toggle-radio :option.sync="isStatic"></sk-toggle-radio>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Text</span>
        </div>
        <input type="text" class="form-control" placeholder="type something" v-model="innerText">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Tag</label>
        </div>
        <select class="custom-select" v-model="currentTag">
          <option v-for="tag of tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary btn-lg btn-block">Import To Sketch</button>
    </form>

    <sk-preview>
      <sk-text-preview :tag="currentTag">
        {{ innerText }}
      </sk-text-preview>
    </sk-preview>

    <sk-code-html :tag="currentTag" :inner-text="innerText"></sk-code-html>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';

import SkToggleRadio from '../../Shared/ToggleRadio.vue';
import SkTextPreview from './TextPreview.vue';
import SkPreview from '../../Shared/Preview.vue';
import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavasript from '../../Shared/Code/CodeJavascript.vue';

const fontSizes = {
  h1: 40,
  h2: 32,
  h3: 28,
  h6: 16,
  p: 14,
  span: 12,
};

export default {
  data() {
    return {
      isStatic: true,
      innerText: 'from sketch plugin',
      currentTag: 'h1',
      fontSizes,
    };
  },
  props: ['currentComponent'],
  components: {
    SkTextPreview,
    SkPreview,
    SkCodeHtml,
    SkCodeJavasript,
    SkToggleRadio,
  },
  computed: {
    tags() {
      return Object.keys(fontSizes);
    },
  },
  methods: {
    handleImport() {
      const { innerText, currentTag } = this;
      const payload = { text: innerText, fontSize: fontSizes[currentTag] };
      PluginCall('import', this.currentComponent, payload);
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
