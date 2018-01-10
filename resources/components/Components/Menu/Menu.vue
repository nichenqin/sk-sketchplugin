<template>
  <section>

    <form @submit.prevent="handleImport">

      <template v-for="(option, index) in options">
        <label :key="option.name">{{option.name}}</label>
        <sk-menu-item class="mb-3" :key="index" :option="option"></sk-menu-item>
      </template>

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
import SkMenuItem from './MenuItem.vue';

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
    SkMenuItem,
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
