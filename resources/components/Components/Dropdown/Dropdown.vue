<template>
  <section>
    <form @submit.prevent="handleImport">

      <button class="btn btn-lg btn-block btn-primary">Import To Sketch</button>

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
