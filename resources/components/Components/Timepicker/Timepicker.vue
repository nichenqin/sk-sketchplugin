<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowPicker" v-model="showPicker">
        <label for="timepickerShowPicker" class="custom-control-label">Show Picker</label>
      </div>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-pikcer v-model="time">
        <tb-time-picker v-model="time"></tb-time-picker>
      </tb-pikcer>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPikcer, TimePicker as TbTimePicker } from '@zhinan/tb-components';
import SkPreview from '../../Shared/Preview.vue';

export default {
  data() {
    return {
      time: '',
      showSeconds: true,
      showPicker: true,
    };
  },
  components: {
    TbPikcer,
    TbTimePicker,
    SkPreview,
  },
  methods: {
    handleImport() {
      const { showPicker, showSeconds } = this;
      const payload = { showPicker, showSeconds };
      this.$emit('import', payload);
    },
  },
};
</script>
