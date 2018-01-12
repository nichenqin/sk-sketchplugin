<script>
export default {
  render(createElement) {
    const { width, height, borderColor, borderWidth, backgroundColor } = this;
    return createElement(
      'div',
      {
        style: {
          width: `${width}px`,
          height: `${height}px`,
          borderWidth: `${borderWidth}px`,
          borderStyle: 'solid',
          borderColor,
          backgroundColor,
        },
      },
      this.$slots.default,
    );
  },
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    borderWidth: {
      type: Number,
      default: 1,
    },
    borderColor: {
      type: String,
      default: '#979797',
    },
    backgroundColor: {
      type: String,
      default: '#D8D8D8',
    },
  },
};
</script>
