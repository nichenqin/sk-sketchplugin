<template>
  <div>
    <pre><code class="javascript" v-highlight v-text="javascriptCode"></code></pre>
  </div>
</template>

<script>
export default {
  props: ['properties'],
  computed: {
    javascriptCode() {
      const data = JSON.stringify(this.properties, null, 2);
      return `export default {
  data() {
    return ${data}
  },
}
      `;
    },
  },
};
</script>
