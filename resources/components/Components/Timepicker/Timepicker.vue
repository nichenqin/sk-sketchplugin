<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowPicker" v-model="showPicker">
        <label for="timepickerShowPicker" class="custom-control-label">Show Picker</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowSeconds" v-model="showSeconds">
        <label for="timepickerShowSeconds" class="custom-control-label">Show Seconds</label>
      </div>

      <sk-radio-group v-model="timeType">
        <sk-radio-button name="timepicker" :value="12" :checked="timeType === 12">12</sk-radio-button>
        <sk-radio-button name="timepicker" :value="24" :checked="timeType === 24">24</sk-radio-button>
      </sk-radio-group>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-pikcer v-model="time">
        <tb-time-picker v-model="time" :time-type="timeType" :isSecond="showSeconds"></tb-time-picker>
      </tb-pikcer>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPikcer, TimePicker as TbTimePicker } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';
import SkRadioGroup from '../../Shared/Radio/RadioGroup.vue';
import SkRadioButton from '../../Shared/Radio/RadioButton.vue';

export default {
  data() {
    return {
      time: '',
      timeType: 12,
      showSeconds: true,
      showPicker: true,
    };
  },
  components: {
    TbPikcer,
    TbTimePicker,
    SkPreview,
    SkRadioGroup,
    SkRadioButton,
  },
  methods: {
    handleImport() {
      const { showPicker, showSeconds, timeType } = this;
      const payload = { showPicker, showSeconds, timeType };
      this.$emit('import', payload);
    },
  },
};
</script>
