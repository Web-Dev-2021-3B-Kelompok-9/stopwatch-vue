<template>
    <div id="add-task-modal" class="modal">
        <span id="close-modal-button" class="close" title="Close Modal"
        @click="closeAddTaskModul">×</span>
        <form id="inputTask" class="modal-content animate" style="border:1px solid #ccc">
            <div class="modal-container">
            <label><b>Add new task</b></label>
            <input type="text" placeholder="Task title" name="email" v-model="title" required>

            <label for="date"><b>Deadline</b></label>
            <input type="date" name="date" v-model="deadline" required>

            <div class="clearfix">
                <button
                id="modal-modal-button"
                class="modal-add-button"
                type="submit"
                title="commit add task"
                @click="addTask">
                <font-awesome-icon icon="plus-circle" size="3x"/>
                </button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import TaskMonitoringDataService from '../services/task-momitoring-data-service';
import Stopwatch from '../object/stopwatch.js';

export default {
  props: ['dataTheme'],
  data() {
    return {
      title: '',
      deadline: '',
    };
  },
  methods: {
    closeAddTaskModul() {
      this.$emit('closeAddTaskModul');
    },
    addTask(event) {
      event.preventDefault();
      const timestamp = new Date();
      // eslint-disable-next-line no-console
      console.log(this.title);
      const taskData = this.createNewTaskObject(
        timestamp.getTime(),
        this.title,
        true,
        true,
        this.deadline,
      );
      TaskMonitoringDataService.create(taskData);
      this.$emit('addTask', taskData);
    },
    createNewTaskObject(ids, titles, isTaskNotCompleteds, isTimePauseds, deadline) {
    // create a new task object , return object
    // task object description
    // id                   : id,       (generated timestamp convert to string , ex : 1633107549852)
    // title                : string,   (task title, ex : make wireframe for website design)
    // isTaskNotCompleted   : boolean,
    // isTimePaused         : boolean,
    // deadline             : Date,     (date object , ex : 2021-10-01)
    // Stopwatch            : Stopwatch,(this class declared in ./stopwatch.js)
      return {
        id: ids,
        tittle: titles,
        isTaskNotCompleted: isTaskNotCompleteds,
        isTimePaused: isTimePauseds,
        deadline: new Date(deadline),
        Stopwatch: new Stopwatch(ids),
      };
    },
  },
};
</script>
