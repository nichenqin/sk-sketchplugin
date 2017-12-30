<template>
  <div>
    <pre><code class="javascript" v-highlight v-text="javascriptCode"></code></pre>
  </div>
</template>

<script>
// function prettify(k, v) {
//   if (Array.isArray(v)) {
//     return '[]';
//   }
//   return v;
// }

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
