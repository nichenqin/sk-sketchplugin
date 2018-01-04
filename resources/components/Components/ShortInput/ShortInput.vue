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
          <option :value="s" v-for="s of allStatus">{{ s }}</option>
        </select>
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
          <option :value="v" v-for="v of verifies">{{ v }}</option>
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
import PluginCall from 'sketch-module-web-view/client';
import { ShortInput as TbShortInput } from '@zhinan/tb-components';

import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      type: 'text',
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
    };
  },
  props: ['currentComponent'],
  components: {
    TbShortInput,
    SkPreview,
    SkCodeHtml,
    SkCodeJavascript,
  },
  computed: {
    path() {
      const { currentComponent, unit, status, content } = this;
      const path = [currentComponent, unit ? 'unit' : '', content ? status : 'placeholder'].filter(
        p => !!p,
      );
      return path.join('/');
    },
  },
  methods: {
    handleImport() {
      const { currentComponent, path, content, unit, placeholder, width } = this;
      const payload = { path, content, unit, placeholder, width };
      PluginCall('import', currentComponent, payload);
    },
  },
};
</script>
