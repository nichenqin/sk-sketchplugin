<template>
  <div>
    <form @submit.prevent="handleImport">

      <h6>数据类型</h6>
      <sk-radio-group v-model="textType">
        <sk-radio-button value="static" name="button-text" :checked="isStatic">静态</sk-radio-button>
        <sk-radio-button value="dynamic" name="button-text" :checked="!isStatic">动态</sk-radio-button>
      </sk-radio-group>

      <div class="input-group mb-3" v-if="isStatic">
        <div class="input-group-prepend">
          <span class="input-group-text">Custom Text</span>
        </div>
        <input type="text" class="form-control" placeholder="type something" v-model="innerText">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Tag</label>
        </div>
        <select class="custom-select" v-model="currentFontSize">
          <option v-for="size of sizes" :key="size" :value="size">{{ fontSizeConfig[size] }}</option>
        </select>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Font Size</label>
        </div>
        <input type="number" class="form-control" v-model.number="currentFontSize">
      </div>

      <sk-show-tips :content.sync="tips.content" :direction.sync="tips.direction" :show-tips.sync="tips.show"></sk-show-tips>

      <button type="submit" class="btn btn-primary btn-lg btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <sk-text-preview :tag="currentTag" :font-size="currentFontSize">
        {{ innerText }}
      </sk-text-preview>
    </sk-preview>

    <sk-code-html :tag="currentTag" :inner-text="isStatic ? innerText : '{{ innerText }}'"></sk-code-html>

    <sk-code-javasript v-if="!isStatic" :properties="properties"></sk-code-javasript>

  </div>
</template>

<script>
import SkTextPreview from './text-preview.vue';

import SkPreview from '../../shared/preview.vue';
import SkCodeHtml from '../../shared/code/code-html.vue';
import SkCodeJavasript from '../../shared/code/code-javascript.vue';

import SkRadioGroup from '../../shared/radio/radio-group.vue';
import SkRadioButton from '../../shared/radio/radio-button.vue';

import SkShowTips from '../../shared/show-tips.vue';

const fontSizeConfig = {
  40: 'h1',
  32: 'h2',
  28: 'h3',
  16: 'h6',
  14: 'p',
};

export default {
  data() {
    return {
      textType: 'static',
      innerText: 'from sketch plugin',
      fontSizeConfig,
      currentFontSize: 40,

      tips: {
        show: true,
        direction: 'up',
        content: '',
      },
    };
  },
  components: {
    SkTextPreview,
    SkPreview,
    SkCodeHtml,
    SkCodeJavasript,
    SkRadioGroup,
    SkRadioButton,
    SkShowTips,
  },
  computed: {
    isStatic() {
      return this.textType === 'static';
    },
    sizes() {
      return Object.keys(this.fontSizeConfig).sort((a, b) => b - a);
    },
    currentTag() {
      return this.fontSizeConfig[this.currentFontSize] || 'span';
    },
    properties() {
      const { innerText } = this;
      return { innerText };
    },
  },
  methods: {
    handleImport() {
      const { innerText, currentFontSize, tips } = this;
      const payload = { text: innerText, fontSize: currentFontSize, tips };
      this.$emit('import', payload);
    },
  },
};
</script>
