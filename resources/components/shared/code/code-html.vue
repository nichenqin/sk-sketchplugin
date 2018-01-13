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
    binds: {
      type: Array,
      default: () => [],
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
    bindsCode() {
      return this.binds.reduce((code, bind) => `${code} :${bind}="${bind}"`, '');
    },
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
      const { tag, bindsCode, innerText, eventsCode } = this;
      return `<${tag}${bindsCode}${eventsCode}>
  ${innerText}
</${tag}>`;
    },
  },
};
</script>

<style scoped>

</style>
