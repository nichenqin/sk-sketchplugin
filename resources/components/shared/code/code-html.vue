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
    directives: {
      type: Object,
      default: () => ({}),
    },
    innerText: {
      type: String,
      default: '',
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    propertiesCode() {
      return Object.keys(this.properties).reduce((str, key) => `${str} :${key}="${key}"`, '');
    },
    eventsCode() {
      return this.events.reduce(
        (str, { event, description }) => `${str} @${event}="${description}"`,
        '',
      );
    },
    htmlCode() {
      const { tag, propertiesCode, innerText, eventsCode } = this;
      return `<${tag}${propertiesCode}${eventsCode}>
  ${innerText}
</${tag}>`;
    },
  },
};
</script>

<style scoped>

</style>
