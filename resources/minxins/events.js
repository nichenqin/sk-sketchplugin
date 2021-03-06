export default {
  data() {
    return {
      nativeEvents: ['click', 'dbclick', 'mousedown', 'mouseup', 'mousemove', 'mouseup'],
      componentEvents: [],
      usedEvents: [],
    };
  },
  computed: {
    domEvents() {
      const { nativeEvents, componentEvents } = this;
      return [...nativeEvents, ...componentEvents];
    },
  },
  methods: {
    handleAddEvent() {
      this.usedEvents.push({
        event: '',
        description: '',
      });
    },
  },
};
