<template>
  <section>
    <h1>
      Pagination
    </h1>

    <form @submit.prevent="handleImport">

      <button class="btn btn-primary btn-lg btn-block">Import To Sketch</button>

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
