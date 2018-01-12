<template>
  <section>
    <h1>Bread</h1>

    <div class="btn-group d-flex mb-3">
      <button class="btn btn-primary btn-lg" :disabled="levels >= 4" @click="add">Add</button>
      <button class="btn btn-warning btn-lg" :disabled="levels <= 1" @click="remove">Remove</button>
    </div>

    <form @submit.prevent="handleImport">

      <div class="form-row mb-3">
        <div class="col" v-for="(path, index) of paths" :key="index">
          <label :for="`bread-path-${index}`">path-{{ index + 1 }}</label>
          <input type="text" class="form-control" :id="`bread-path-${index}`" v-model="path.value">
        </div>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="bread-icon" v-model="showIcon">
        <label class="custom-control-label" for="bread-icon">show icon</label>
      </div>

      <button class="btn btn-block btn-lg btn-primary" type="submit">Import To Sketch</button>
    </form>

    <sk-preview>
      <tb-breadcrumb :is-icon="showIcon">
        <tb-breadcrumb-item v-for="(path, index) of paths" :key="index">{{ path.value }}</tb-breadcrumb-item>
      </tb-breadcrumb>
    </sk-preview>
  </section>
</template>

<script>
import {
  Breadcrumb as TbBreadcrumb,
  BreadcrumbItem as TbBreadcrumbItem,
} from '@zhinan/tb-components';

import SkPreview from '../../shared/preview.vue';

export default {
  data() {
    return {
      showIcon: false,
      paths: [...new Array(4)].map((val, index) => ({ value: `path-${index + 1}` })),
    };
  },
  components: {
    TbBreadcrumb,
    TbBreadcrumbItem,
    SkPreview,
  },
  computed: {
    levels() {
      return this.paths.length;
    },
  },
  methods: {
    add() {
      if (this.levels >= 4) return;

      this.paths.push({ value: `path-${this.levels + 1}` });
    },
    remove() {
      if (this.levels <= 1) return;

      this.paths.pop();
    },
    handleImport() {
      const { paths, showIcon } = this;
      const payload = { paths, showIcon };
      this.$emit('import', payload);
    },
  },
};
</script>

<style scoped>
.btn {
  flex: 1;
}
</style>
