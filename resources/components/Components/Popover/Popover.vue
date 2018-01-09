<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Size</label>
        </div>
        <select class="custom-select" v-model="size">
          <option v-for="(value, size) of sizeConfigs" :value="size" :key="size">{{ size }}</option>
        </select>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="popoverShowFooter" v-model="showFooter">
        <label class="custom-control-label" for="popoverShowFooter">Show Footer</label>
      </div>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-popover :width="rect.width"></tb-popover>
    </sk-preview>

  </section>
</template>

<script>
import { TbPopover } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

const sizeConfigs = {
  large: {
    width: 500,
    height: 400,
  },
  medium: {
    width: 400,
    height: 300,
  },
  small: {
    width: 250,
    height: 200,
  },
};

export default {
  data() {
    return {
      size: 'large',
      showFooter: true,
      sizeConfigs,
    };
  },
  components: {
    TbPopover,
    SkPreview,
  },
  computed: {
    rect() {
      return this.sizeConfigs[this.size];
    },
  },
  methods: {
    handleImport() {
      const { rect, showFooter } = this;
      const payload = { rect, showFooter };
      this.$emit('import', payload);
    },
  },
};
</script>
