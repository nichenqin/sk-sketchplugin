<template>
  <div>

    <div class="custom-control custom-checkbox mb-3">
      <input type="checkbox" class="custom-control-input" :id="id" v-model="internalShow">
      <label class="custom-control-label" :for="id">Show Tips</label>
    </div>

    <template v-if="showTips">

      <input type="text" class="form-control mb-3" v-model="internalContent">

      <sk-radio-group v-model="internalDirection">
        <sk-radio-button v-for="direction of directions" :key="direction" :value="direction"
          :name="direction" :checked="internalDirection === direction">
          {{ direction }}
        </sk-radio-button>
      </sk-radio-group>

    </template>

  </div>
</template>

<script>
import SkRadioGroup from './Radio/RadioGroup.vue';
import SkRadioButton from './Radio/RadioButton.vue';

export default {
  data() {
    return {
      internalDirection: this.direction,
      internalShow: this.showTips,
      internalContent: this.content,
      directions: ['up', 'down', 'left', 'right'],
    };
  },
  props: {
    direction: {
      type: String,
      required: true,
      default: 'up',
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    id: {
      type: String,
      required: false,
      default: `tips-${this._uid}`,
    },
    showTips: {
      type: Boolean,
      required: true,
      default: false,
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
    internalShow(show) {
      this.$emit('update:showTips', show);
    },
    internalContent(content) {
      this.$emit('update:content', content);
    },
  },
};
</script>
