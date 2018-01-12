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

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowNow" v-model="showNow">
        <label for="timepickerShowNow" class="custom-control-label">Show Now</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowClear" v-model="showClear">
        <label for="timepickerShowClear" class="custom-control-label">Show Clear</label>
      </div>

      <sk-radio-group v-model="timeType">
        <sk-radio-button name="timepicker" :value="12" :checked="timeType === 12">12</sk-radio-button>
        <sk-radio-button name="timepicker" :value="24" :checked="timeType === 24">24</sk-radio-button>
      </sk-radio-group>

      <sk-alignment :alignment.sync="timepickerAlign"></sk-alignment>

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
import SkPreview from '../../shared/preview.vue';
import SkRadioGroup from '../../shared/radio/radio-group.vue';
import SkRadioButton from '../../shared/radio/radio-button.vue';
import SkAlignment from '../../shared/radio/alignment.vue';

export default {
  data() {
    return {
      time: '',
      timeType: 12,

      showSeconds: true,
      showPicker: true,
      showNow: true,
      showClear: true,

      timepickerAlign: 'center',
    };
  },
  components: {
    TbPikcer,
    TbTimePicker,
    SkPreview,
    SkRadioGroup,
    SkRadioButton,
    SkAlignment,
  },
  methods: {
    handleImport() {
      const { showPicker, showSeconds, timeType, showNow, showClear, timepickerAlign } = this;
      const payload = { showPicker, showSeconds, timeType, showNow, showClear, timepickerAlign };
      this.$emit('import', payload);
    },
  },
};
</script>
