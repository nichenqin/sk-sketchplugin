<template>
  <div>
    <form class="mb-3" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label> 完整路径： </label>
        <div class="alert alert-success" role="alert">
          {{ path }}
        </div>
      </div>
      <div class="form-group">
        <label>状态</label>
        <select class="form-control form-control-lg" v-model="type">
          <option v-for="t of types" :value="t">{{ t }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>类型</label>
        <select class="form-control form-control-lg" v-model="status">
          <option :value="s" v-for="s of allStatus">{{ s }}</option>
        </select>
      </div>
      <button class="btn btn-primary btn-lg btn-block" type="submit">引入到Sketch</button>
    </form>
    <!-- TODO: preview component -->
    <div class="card mb-3">
      <div class="card-header">
        预览 hasIcon {{hasIcon}}
      </div>
      <div class="card-body">
        <h4 class="card-title">{{currentComponent}}</h4>
        <tb-button :type="previewType" :isAnother="isAnother" :disabled="status === 'disable'">
          <i class="fa fa-search" v-if="hasIcon" aria-hidden="true"></i>
          按钮
        </tb-button>
      </div>
    </div>
    <sk-code-html tag="button"></sk-code-html>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { TbButton } from '@zhinan/tb-components';
import SkCodeHtml from '../../Shared/Code/CodeHtml';

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
      type: '',
      status: 'normal',
      allStatus: ['normal', 'active', 'hover', 'disable'],
    };
  },
  props: ['currentComponent'],
  components: {
    TbButton,
    SkCodeHtml,
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
    hasIcon() {
      return /icon/i.test(this.type);
    },
    previewType() {
      if (!this.type) return 'primary';
      return data[this.type].type;
    },
  },
  methods: {
    handleSubmit() {
      PluginCall('import', this.currentComponent, this.path);
    },
  },
};
</script>
