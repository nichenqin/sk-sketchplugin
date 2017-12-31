<template>
  <div>
    <pre><code class="html" v-text="htmlCode" v-highlight></code></pre>
  </div>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    properties: {
      type: Object,
      default: () => ({}),
    },
    innerText: {
      type: String,
      default: '',
    },
  },
  computed: {
    propertiesCode() {
      return Object.keys(this.properties).reduce((str, key) => `${str} :${key}="${key}"`, '');
    },
    htmlCode() {
      const { tag, propertiesCode, innerText } = this;
      return `<${tag}${propertiesCode}>
  ${innerText}
</${tag}>`;
    },
  },
};
</script>

<style scoped>

</style>
