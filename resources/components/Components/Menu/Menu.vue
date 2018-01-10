<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3" v-for="(option, index) of options" :key="index">
        <div class="input-group-prepend">
          <label class="input-group-text">option-{{index + 1}}</label>
        </div>
        <input type="text" class="form-control" v-model="option.name">
      </div>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-menu :menu-data="options" v-model="selectedMenu"></tb-menu>
    </sk-preview>

  </section>
</template>

<script>
import { NavMenu as TbMenu } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

let id = 1;

function generateOption(name, children = []) {
  id += 1;
  return {
    name,
    id,
    expand: true,
    children,
  };
}

export default {
  data() {
    return {
      options: [...new Array(3)].map((val, index) =>
        generateOption(`level-1-${index + 1}`, [
          generateOption(`level-2-${index + 1}`, [generateOption(`level-3-${index + 1}`)]),
        ]),
      ),
      selectedMenu: 1,
    };
  },
  components: {
    TbMenu,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { options } = this;
      const payload = { options };
      this.$emit('import', payload);
    },
  },
};
</script>
