<script>
export default {
  render(createElement) {
    const { tag } = this;
    return createElement(tag, this.$slots.default);
  },
  props: {
    tag: {
      type: String,
      default: 'h1',
    },
  },
};
</script>
