<template>
  <div>
    <div class="form-group mb-3">
      <label> Path </label>
      <div class="alert alert-success" role="alert">
        {{ path }}
      </div>
    </div>

    <form class="mb-3" @submit.prevent="handleImport">

      <button class="btn btn-secondary btn-lg btn-block mb-3" @click.prevent="handleAddEvent">add event</button>

      <div class="mb-3" v-for="(usedEvent, index) in usedEvents" :key="index">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text">Events</label>
          </div>
          <select class="custom-select" v-model="usedEvents[index].event">
            <option value="">Choose a type...</option>
            <option v-for="domEvent of domEvents" :value="domEvent">{{ domEvent }}</option>
          </select>
        </div>

        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text">Description</label>
          </div>
          <input type="text" class="form-control" v-model="usedEvents[index].description">
        </div>
      </div>

      <h6>数据类型</h6>
      <sk-radio-group v-model="textType">
        <sk-radio-button value="static" name="button-text" :checked="isStatic">静态</sk-radio-button>
        <sk-radio-button value="dynamic" name="button-text" :checked="!isStatic">动态</sk-radio-button>
      </sk-radio-group>

      <div class="input-group mb-3" v-if="isStatic">
        <div class="input-group-prepend">
          <div class="input-group-text">Custom Text</div>
        </div>
        <input type="text" class="form-control" v-model="text">
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

    <sk-code-html tag="button" :properties="properties" :innerText="isStatic ? text : '{{ text }}'"
      :events="usedEvents"></sk-code-html>

    <sk-code-javascript :properties="properties"></sk-code-javascript>
  </div>
</template>

<script>
import PluginCall from 'sketch-module-web-view/client';
import { TbButton } from '@zhinan/tb-components';

import Events from '../../../minxins/events';

import SkCodeHtml from '../../Shared/Code/CodeHtml.vue';
import SkCodeJavascript from '../../Shared/Code/CodeJavascript.vue';
import SkPreview from '../../Shared/Preview.vue';

import SkRadioGroup from '../../Shared/Radio/RadioGroup.vue';
import SkRadioButton from '../../Shared/Radio/RadioButton.vue';

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
      textType: 'static',
      text: 'ADD',
      type: '',
      status: 'normal',
      allStatus: ['normal', 'active', 'hover', 'disable'],
      componentEvents: ['btn'],
    };
  },
  props: ['currentComponent', 'objectID'],
  components: {
    TbButton,
    SkCodeHtml,
    SkPreview,
    SkCodeJavascript,
    SkRadioGroup,
    SkRadioButton,
  },
  mixins: [Events],
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
      const { isAnother, previewType, disabled, isStatic, text } = this;
      const properties = { isAnother, type: previewType, disabled };
      if (!isStatic) properties.text = text;
      return properties;
    },
    isStatic() {
      return this.textType === 'static';
    },
  },
  methods: {
    handleImport() {
      const { text, path, type } = this;
      const payload = { text, path };
      if (type === 'menu') payload.iconPath = 'icon/arrowDown';
      this.$emit('import', payload);
    },
    updateText(text) {
      if (!this.objectID) return;
      PluginCall('button:updateText', this.objectID, text);
    },
    updatePath() {
      if (!this.objectID) return;
      PluginCall('button:updatePath', this.objectID, this.path);
    },
  },
  watch: {
    text(text) {
      this.updateText(text);
    },
    path(path) {
      this.updatePath(path);
    },
  },
};
</script>
