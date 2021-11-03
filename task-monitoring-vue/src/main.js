// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faEdit, faTrash, faStopCircle, faPlayCircle, faPauseCircle, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App';
import router from './router';
import '../src/assets/css/global.css';

library.add(faPlusCircle, faEdit, faTrash, faStopCircle, faPlayCircle,
  faPauseCircle, faStepForward);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
