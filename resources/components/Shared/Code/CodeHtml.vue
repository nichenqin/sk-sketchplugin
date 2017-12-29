<template>
  <div class="code">
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
    properties: Object,
    innerText: String,
  },
  computed: {
    propertiesCode() {
      return Object.keys(this.properties)
        .reduce((str, key) => `${str} :${key}="${this.properties[key]}"`, '')
        .substr(1);
    },
    htmlCode() {
      const { tag, propertiesCode, innerText } = this;
      return `<${tag} ${propertiesCode}>
  ${innerText}
</${tag}>`;
    },
  },
};
</script>

<style scoped>
.code {
  font-size: 1.3rem;
}
</style>
