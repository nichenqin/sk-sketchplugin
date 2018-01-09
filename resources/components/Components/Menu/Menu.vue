<template>
  <section>

    <form @submit.prevent="handleImport">

      <div class="input-group mb-3" v-for="(option, index) of options" :key="index">
        <div class="input-group-prepend">
          <label class="input-group-text">option-{{index + 1}}</label>
        </div>
        <input type="text" class="form-control" v-model="option.name">
      </div>

      <button type="submit" class="btn btn-lg btn-primary btn-block">Import To Sketch</button>

    </form>

  </section>
</template>

<script>
function generateOption(name, children = []) {
  return {
    name,
    children,
  };
}

export default {
  data() {
    return {
      options: [...new Array(3)].map((val, index) =>
        generateOption(`level-1-${index + 1}`, [
          generateOption(`level-2-${index + 1}`, [generateOption(`level-3-${index + 1}`)]),
        ]),
      ),
    };
  },
  methods: {
    handleImport() {
      const { options } = this;
      const payload = { options };
      this.$emit('import', payload);
    },
  },
};
</script>
