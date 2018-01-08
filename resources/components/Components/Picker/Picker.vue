<template>
  <section>
    <form @submit.prevent="handleImport">

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-picker v-model="content"></tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPicker } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      content: 'picker content',
    };
  },
  components: {
    TbPicker,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { content } = this;
      const payload = { content };
      this.$emit('import', payload);
    },
  },
};
</script>
