import Vue from 'vue';
import hljs from 'highlight.js';

Vue.directive('highlight', {
  bind(el) {
    hljs.highlightBlock(el);
  },
});
