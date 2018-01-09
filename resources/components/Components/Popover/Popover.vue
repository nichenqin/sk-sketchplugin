<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Size</label>
        </div>
        <select class="custom-select" v-model="size">
          <option v-for="(value, size) of sizeConfigs" :value="size" :key="size">{{ size }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

  </section>
</template>

<script>
const sizeConfigs = {
  large: {
    width: 500,
    height: 400,
  },
  medium: {
    width: 400,
    height: 300,
  },
  small: {
    width: 250,
    height: 200,
  },
};

export default {
  data() {
    return {
      size: 'large',
      sizeConfigs,
    };
  },
  computed: {
    rect() {
      return this.sizeConfigs[this.size];
    },
  },
  methods: {
    handleImport() {
      const { rect } = this;
      const payload = { rect };
      this.$emit('import', payload);
    },
  },
};
</script>
