<template>
  <div>
    {{htmlCode}}
  </div>
</template>

<script>
export default {
  props: ['tag', 'props', 'children'],
  computed: {
    htmlCode() {
      return `<button>
       </button>
      `.trim();
    },
  },
};
</script>
