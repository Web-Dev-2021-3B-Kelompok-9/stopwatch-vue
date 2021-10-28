<template>
    <main class="home">
        <div>
            <add-task
            @openAddTaskModul="openAddTaskModul()"/>
            <add-task-modal
            @closeAddTaskModul="closeAddTaskModul()"
            @addTask="addTask"/>
            <task-list></task-list>
        </div>
    </main>
</template>
<script>
import AddTask from '../components/AddTask.vue';
import AddTaskModal from '../components/AddTaskModal.vue';
import taskList from '../components/taskList.vue';
import task from '../components/Task.vue';
export default ({
  components: {
    AddTask,
    AddTaskModal,
    taskList,
    task
  },
  data() {
    return {
      isModulOpen: false,
    };
  },
  methods: {
    openAddTaskModul() {
      document.querySelector('#add-task-modal').style.display = 'block';
    },
    closeAddTaskModul() {
      document.querySelector('#add-task-modal').style.display = 'none';
    },
    addTask(value) {
      document.querySelector('#add-task-modal').style.display = 'none';
      // eslint-disable-next-line no-console
      console.log(value);
    },
  },
  setup() {

  },
});
</script>

