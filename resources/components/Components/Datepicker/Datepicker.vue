<template>
  <section>

    <button class="btn btn-primary btn-lg btn-block" @click="handleImport">Import To Sketch</button>

    <sk-preview>
      <tb-picker v-model="today">
        <tb-datepicker v-model="today"></tb-datepicker>
      </tb-picker>
    </sk-preview>

  </section>
</template>

<script>
import { Picker as TbPicker, Datepicker as TbDatepicker } from '@zhinan/tb-components';

import SkPreview from '../../Shared/Preview.vue';

const TOTAL_LENGTH = 42;

export default {
  data() {
    return {
      today: '',
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDate(),
    };
  },
  components: {
    SkPreview,
    TbPicker,
    TbDatepicker,
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
      }));
    },
    dateList() {
      return [
        ...this.previousMonthDateList,
        ...this.currentMonthDateList,
        ...this.nextMonthDateList,
      ];
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
      } = this;
      const payload = {
        previousMonthDateList,
        currentMonthDateList,
        nextMonthDateList,
        dateList,
        currentDay,
      };
      this.$emit('import', payload);
    },
  },
};
</script>
