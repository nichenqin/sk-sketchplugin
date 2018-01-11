<template>
  <sk-radio-group v-model="internalDirection">
    <sk-radio-button v-for="direction of directions" :key="direction" :value="direction"
      :name="direction" :checked="internalDirection === direction">
      {{ direction }}
    </sk-radio-button>
  </sk-radio-group>
</template>

<script>
import SkRadioGroup from './RadioGroup.vue';
import SkRadioButton from './RadioButton.vue';

export default {
  data() {
    return {
      internalDirection: this.direction,
      directions: ['up', 'down', 'left', 'right'],
    };
  },
  props: {
    direction: {
      type: String,
      required: true,
      default: 'up',
    },
  },
  components: {
    SkRadioGroup,
    SkRadioButton,
  },
  watch: {
    internalDirection(direction) {
      this.$emit('update:direction', direction);
    },
  },
};
</script>
