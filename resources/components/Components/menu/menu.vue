<template>
  <section>

    <button class="btn btn-lg btn-block btn-primary mb-3" @click="addOption">
      Add Option
    </button>

    <form @submit.prevent="handleImport">

      <sk-menu-item class="mb-3" v-for="(option, index) in options" :generateOption="generateOption"
        :key="index" :option="option" :index="index" @remove="removeOption" :icons="icons"></sk-menu-item>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-menu :menu-data="options" v-model="selectedMenu" type="double"></tb-menu>
    </sk-preview>

  </section>
</template>

<script>
import { NavMenu as TbMenu } from '@zhinan/tb-components';
import SkPreview from '../../shared/preview.vue';
import SkMenuItem from './menu-item.vue';

let id = 1;

function generateOption(name, children = []) {
  id += 1;
  return {
    name,
    subtitle: '',
    // TODO: convert to number
    id: String(id),
    expand: true,
    children,
  };
}

export default {
  data() {
    return {
      options: [...new Array(2)].map((val, index) =>
        generateOption(`level-1-${index + 1}`, [
          generateOption(`level-2-${index + 1}`, [generateOption(`level-3-${index + 1}`)]),
        ]),
      ),
      selectedMenu: '1',
      icons: ['user', 'icon'],
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
    generateOption,
    addOption() {
      this.options.push(this.generateOption(`level-1-${this.options.length + 1}`, []));
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
  },
};
</script>
