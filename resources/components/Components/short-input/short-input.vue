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
            Types
          </div>
        </div>
        <select class="custom-select" v-model="type">
          <option :value="t" v-for="t of types" :key="t">{{ t }}</option>
        </select>
      </div>

      <div class="custom-control custom-checkbox mb-3" v-if="type === 'password'">
        <input type="checkbox" class="custom-control-input" id="shortInputIsVisible" v-model="isVisible">
        <label class="custom-control-label" for="shortInputIsVisible">Is Visible</label>
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Max Length
          </div>
        </div>
        <input type="number" class="form-control" v-model.number="maxLength">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Min Length
          </div>
        </div>
        <input type="number" class="form-control" v-model.number="minLength">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Width
          </div>
        </div>
        <input type="number" class="form-control" v-model.number="width">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Unit
          </div>
        </div>
        <input type="text" class="form-control" v-model="unit">
      </div>

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <div class="input-group-text">
            Verify
          </div>
        </div>
        <select class="custom-select" v-model="verify">
          <option value="">select one</option>
          <option :value="v" v-for="v of verifies" :key="v">{{ v }}</option>
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

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="shortInputAutofocus" v-model="autofocus">
        <label class="custom-control-label" for="shortInputAutofocus">Auto Focus</label>
      </div>

      <sk-show-tips :content.sync="tips.content" :direction.sync="tips.direction" :show-tips="tips.show"></sk-show-tips>

      <button class="btn btn-primary btn-block btn-lg" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-short-input v-model="content" :type="type" :min-length="minLength" :max-length="maxLength"
        :unit="unit" :autofocus="autofocus" :placeholder="placeholder" :width="width"
        :verify="verify"></tb-short-input>
    </sk-preview>
  </div>
</template>

<script>
import { ShortInput as TbShortInput } from '@zhinan/tb-components';

import SkCodeHtml from '../../shared/code/code-html.vue';
import SkCodeJavascript from '../../shared/code/code-javascript.vue';
import SkPreview from '../../shared/preview.vue';
import SkShowTips from '../../shared/show-tips.vue';

export default {
  data() {
    return {
      type: 'text',
      types: ['text', 'password', 'number'],
      isVisible: false,

      verify: '',
      verifies: ['number', 'phone', 'email'],
      content: '',
      unit: '',
      autofocus: true,
      minLength: 0,
      maxLength: 0,
      width: 300,
      placeholder: 'default placeholder',
      status: 'normal',
      allStatus: ['normal', 'error', 'active', 'disable'],

      tips: {
        show: true,
        content: '',
        direction: 'left',
      },
    };
  },
  components: {
    TbShortInput,
    SkPreview,
    SkCodeHtml,
    SkCodeJavascript,
    SkShowTips,
  },
  methods: {
    handleImport() {
      const { path, content, unit, placeholder, width, tips, type, status, isVisible } = this;
      const payload = { path, content, unit, placeholder, width, tips, type, status, isVisible };
      this.$emit('import', payload);
    },
  },
};
</script>
