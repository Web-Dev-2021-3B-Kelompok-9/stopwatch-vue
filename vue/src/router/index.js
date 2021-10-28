import Vue from 'vue';
import Router from 'vue-router';
import TaskMonitoring from '@/views/TaskMonitoring';
import task from '@/components/Task.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TaskMonitoring',
      component: TaskMonitoring,
    },
    {
      path:'/cek',
      name: 'cek',
      component: task,
    }
  ],
});
