<template>
  <section>
    <form @submit.prevent="handleImport">

      <input type="text" class="form-control mb-3" v-model="content">

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>
  </section>
</template>

<script>
import SkPreview from '../../shared/preview.vue';
import SkRadioGroup from '../../shared/radio/radio-group.vue';
import SkRadioButton from '../../shared/radio/radio-button.vue.vue';

export default {
  data() {
    return {
      content: '提示',

      direction: 'up',
      directions: ['up', 'right', 'down', 'left'],
    };
  },
  components: {
    SkPreview,
    SkRadioGroup,
    SkRadioButton,
  },
  methods: {
    handleImport() {
      const { direction, content } = this;
      const payload = { direction, content };
      this.$emit('import', payload);
    },
  },
};
</script>
