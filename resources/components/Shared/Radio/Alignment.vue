<template>
  <sk-radio-group v-model="internalAlignment">
    <sk-radio-button v-for="align of alignments" :key="align" :value="align" :name="align"
      :checked="internalAlignment === align">
      {{ align }}
    </sk-radio-button>
  </sk-radio-group>
</template>

<script>
import SkRadioGroup from './radio-group.vue';
import SkRadioButton from './radio-button.vue';

export default {
  data() {
    return {
      internalAlignment: this.alignment,
      alignments: ['left', 'center', 'right'],
    };
  },
  props: {
    alignment: {
      type: String,
      required: true,
      default: 'left',
    },
  },
  components: {
    SkRadioGroup,
    SkRadioButton,
  },
  watch: {
    internalAlignment(alignment) {
      this.$emit('update:alignment', alignment);
    },
  },
};
</script>
