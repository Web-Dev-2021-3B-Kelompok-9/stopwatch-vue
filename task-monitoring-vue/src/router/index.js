import Vue from 'vue';
import Router from 'vue-router';
import TaskMonitoring from '@/views/TaskMonitoring';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskMonitoring',
      component: TaskMonitoring,
    },
  ],
});
