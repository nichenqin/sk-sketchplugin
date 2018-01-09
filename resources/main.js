/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import './directives';

import 'highlight.js/styles/atom-one-light.css';
require('@zhinan/tb-components/dist/main.css');

import * as tbc from '@zhinan/tb-components';
Vue.use(tbc);

import './assets/bread.sketch';
import './assets/button.sketch';
import './assets/bread.sketch';
import './assets/checkbox.sketch';
import './assets/datepicker.sketch';
import './assets/list.sketch';
import './assets/longInput.sketch';
import './assets/shortInput.sketch';
import './assets/radio.sketch';
import './assets/switch.sketch';
import './assets/switch.sketch';
import './assets/pagination.sketch';
import './assets/dropdown.sketch';
import './assets/picker.sketch';
import './assets/timepicker.sketch';
import './assets/checkbox.sketch';
import './assets/popover.sketch';

// import your style files inside main.js, not html link tag
import './styles/style.less';

new Vue({
  el: '#app',
  render: h => h(App),
});
