<template>
  <section>

    <form @submit.prevent="handleImport">

      <button type="submit" class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

    </form>

  </section>
</template>

<script>
export default {
  methods: {
    handleImport() {
      this.$emit('import');
    },
  },
};
</script>
