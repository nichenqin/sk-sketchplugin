<script>
export default {
  render(createElement) {
    const { tag, fontSize } = this;
    return createElement(tag, { style: { fontSize: `${fontSize}px` } }, this.$slots.default);
  },
  props: {
    tag: {
      type: String,
      default: 'h1',
    },
    fontSize: {
      type: Number,
      default: 40,
    },
  },
};
</script>
