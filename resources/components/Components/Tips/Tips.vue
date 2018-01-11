<template>
  <section>
    <form @submit.prevent="handleImport">

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>
  </section>
</template>

<script>
import SkPreview from '../../Shared/Preview.vue';
import SkRadioGroup from '../../Shared/Radio/RadioGroup.vue';
import SkRadioButton from '../../Shared/Radio/RadioButton.vue';

export default {
  data() {
    return {
      direction: 'up',
      directions: ['up', 'right', 'bottom', 'left'],
    };
  },
  components: {
    SkPreview,
    SkRadioGroup,
    SkRadioButton,
  },
  methods: {
    handleImport() {
      const { direction } = this;
      const payload = { direction };
      this.$emit('import', payload);
    },
  },
};
</script>
