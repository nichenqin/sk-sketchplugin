<template>
  <div>
    <form class="mb-3" @submit.prevent="handleImport">
      <div class="form-group">
        <label> Path </label>
        <div class="alert alert-success" role="alert">
          {{ path }}
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Type</label>
        </div>
        <select class="custom-select" v-model="type">
          <option value="">Choose a type...</option>
          <option v-for="t of types" :value="t">{{ t }}</option>
        </select>
      </div>

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

      <button class="btn btn-primary btn-lg btn-block" type="submit">Import To Sketch</button>
    </form>

    <sk-preview>
      <tb-button :type="previewType" :isAnother="isAnother" :disabled="disabled">
        <i class="fa fa-search" v-if="hasIcon" aria-hidden="true"></i>
        {{ text }}
      </tb-button>
    </sk-preview>

    <sk-code-html tag="button" :properties="properties" :innerText="text"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { TbButton } from '@zhinan/tb-components';
import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';
import SkPreview from '../../Shared/Preview.vue';

const data = {
  risk: {
    type: 'error',
    isAnother: false,
  },
  line_blue: {
    type: 'border',
    isAnother: false,
  },
  line_grey: {
    type: 'border',
    isAnother: true,
  },
  tab: {
    type: 'label',
    isAnother: true,
  },
  tab_line: {
    type: 'label',
    isAnother: false,
  },
  iconBasic: {
    type: 'primary',
    isAnother: false,
  },
  iconRisk: {
    type: 'error',
    isAnother: false,
  },
  ghost: {
    type: 'ghost',
    isAnother: false,
  },
  link_grey: {
    type: 'link',
    isAnother: false,
  },
  link_blue: {
    type: 'link',
    isAnother: true,
  },
  menu: {
    type: 'menu',
    isAnother: false,
  },
  icon: {
    type: 'icon',
    isAnother: true,
  },
  icon_large: {
    type: 'icon',
    isAnother: false,
  },
  iconLink_blue: {
    type: 'iconLink',
    isAnother: true,
  },
  iconLink_grey: {
    type: 'link',
    isAnother: false,
  },
};

export default {
  data() {
    return {
      text: '按钮',
      type: '',
      status: 'normal',
      allStatus: ['normal', 'active', 'hover', 'disable'],
    };
  },
  props: ['currentComponent'],
  components: {
    TbButton,
    SkCodeHtml,
    SkPreview,
    SkCodeJavascript,
  },
  computed: {
    path() {
      const { currentComponent, type, status } = this;
      const path = [currentComponent, type, status].filter(p => !!p);
      return path.join('/');
    },
    types() {
      return Object.keys(data);
    },
    isAnother() {
      if (!this.type) return false;
      return data[this.type].isAnother;
    },
    disabled() {
      return this.status === 'disable';
    },
    hasIcon() {
      return /icon/i.test(this.type);
    },
    previewType() {
      if (!this.type) return 'primary';
      return data[this.type].type;
    },
    properties() {
      const { isAnother, previewType, disabled } = this;
      return { isAnother, type: previewType, disabled };
    },
  },
  methods: {
    handleImport() {
      PluginCall('import', this.currentComponent, this.path);
    },
  },
};
</script>
