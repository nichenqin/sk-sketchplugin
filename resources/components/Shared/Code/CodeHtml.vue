<template>
  <div class="html">
    <pre><code class="html" ref="code" v-text="htmlCode" v-highlight></code></pre>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
  computed: {
    htmlCode() {
      const { tag } = this;
      return `<${tag}>
  text
</${tag}>`;
    },
  },
};
</script>
