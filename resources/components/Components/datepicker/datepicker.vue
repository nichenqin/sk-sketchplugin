<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="datepickerShowToday" v-model="showToday">
        <label for="datepickerShowToday" class="custom-control-label">Show Today</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="datepickerShowTomorrow" v-model="showTomorrow">
        <label for="datepickerShowTomorrow" class="custom-control-label">Show Tomorrow</label>
      </div>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="datepickerShowClear" v-model="showClear">
        <label for="datepickerShowClear" class="custom-control-label">Show Clear</label>
      </div>

      <label>start time</label>
      <tb-picker class="mb-3" v-model="startTime">
        <tb-datepicker v-model="startTime"></tb-datepicker>
      </tb-picker>

      <label>stop time</label>
      <tb-picker class="mb-3" v-model="stopTime">
        <tb-datepicker v-model="stopTime"></tb-datepicker>
      </tb-picker>

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="datepickerShowPicker" v-model="picker.show">
        <label for="datepickerShowPicker" class="custom-control-label">Show Picker</label>
      </div>

      <template v-if="picker.show">

        <label>Datepicker Alignment</label>
        <sk-alignment :alignment.sync="datepickerAlign"></sk-alignment>

      </template>

      <button class="btn btn-primary btn-lg btn-block" type="submit">Import To Sketch</button>

    </form>

    <sk-preview>
      <tb-picker v-model="picker.date">
        <tb-datepicker v-model="picker.date" :show-today="showToday" :show-tomorrow="showTomorrow"
          :show-clear="showClear" :start-time="startTime" :stop-time="stopTime"></tb-datepicker>
      </tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPicker, Datepicker as TbDatepicker } from '@zhinan/tb-components';

import SkAlignment from '../../shared/radio/alignment.vue';
import SkPreview from '../../shared/preview.vue';

function convertToTime(str) {
  const [year, month, day] = str.split('-');
  return new Date(year, month - 1, day).getTime();
}
const TOTAL_LENGTH = 42;

export default {
  data() {
    return {
      datepickerAlign: 'center',

      showToday: true,
      showTomorrow: true,
      showClear: true,

      picker: {
        show: true,
        placeholder: '不限',
        date: '',
      },

      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),

      startTime: '',
      stopTime: '',
    };
  },
  components: {
    SkPreview,
    TbPicker,
    TbDatepicker,
    SkAlignment,
  },
  computed: {
    currentMonthLength() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    currentMonthDateList() {
      return [...new Array(this.currentMonthLength)].map((value, index) => ({
        year: this.currentYear,
        month: this.currentMonth + 1,
        day: index + 1,
        time: new Date(this.currentYear, this.currentMonth, index + 1).getTime(),
      }));
    },
    currentMonthStartDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    previousMonthDateList() {
      const previousMonthLength = new Date(this.currentYear, this.currentMonth, 0).getDate();
      const year = this.currentMonth <= 0 ? this.currentYear - 1 : this.currentYear;
      const month = this.currentMonth <= 0 ? 12 : this.currentMonth;
      return [...new Array(previousMonthLength)]
        .map((value, index) => ({
          year,
          month,
          day: index + 1,
          time: new Date(year, month - 1, index + 1).getTime(),
        }))
        .reverse()
        .slice(0, this.currentMonthStartDay)
        .reverse();
    },
    nextMonthDateList() {
      const length = TOTAL_LENGTH - this.currentMonthLength - this.currentMonthStartDay;
      const year = this.currentMonth + 2 >= 12 ? this.currentYear + 1 : this.currentYear;
      const month = this.currentMonth + 2 >= 12 ? 1 : this.currentMonth + 2;
      return [...new Array(length)].map((value, index) => ({
        year,
        month,
        day: index + 1,
        time: new Date(year, month - 1, index + 1).getTime(),
      }));
    },
    dateList() {
      return [
        ...this.previousMonthDateList,
        ...this.currentMonthDateList,
        ...this.nextMonthDateList,
      ];
    },
    selectedDateList() {
      const { startTime, stopTime, dateList } = this;
      if (!startTime || !stopTime) return [];
      return dateList
        .filter(({ time }) => time >= convertToTime(startTime) && time <= convertToTime(stopTime))
        .map(({ time }) => time);
    },
  },
  methods: {
    handleImport() {
      const {
        previousMonthDateList,
        currentMonthDateList,
        nextMonthDateList,
        dateList,
        currentDay,
        picker,
        showToday,
        showTomorrow,
        showClear,
        selectedDateList,
        datepickerAlign,
      } = this;
      const payload = {
        previousMonthDateList,
        currentMonthDateList,
        nextMonthDateList,
        dateList,
        currentDay,
        showToday,
        showTomorrow,
        showClear,
        selectedDateList,
        datepickerAlign,
        picker,
      };
      this.$emit('import', payload);
    },
  },
};
</script>
