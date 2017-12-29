import Vue from 'vue';
import hljs from 'highlight.js';

Vue.directive('highlight', el => {
  hljs.highlightBlock(el);
});
