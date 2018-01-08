<template>
  <section>
    <form @submit.prevent="handleImport">

      <div class="custom-control custom-checkbox mb-3">
        <input type="checkbox" class="custom-control-input" id="timepickerShowPicker" v-model="showPicker">
        <label for="timepickerShowPicker" class="custom-control-label">Show Picker</label>
      </div>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showPicker: true,
    };
  },
  methods: {
    handleImport() {
      const { showPicker } = this;
      const payload = { showPicker };
      this.$emit('import', payload);
    },
  },
};
</script>
