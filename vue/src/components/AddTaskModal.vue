<template>
    <div id="add-task-modal" class="modal">
        <span id="close-modal-button" class="close" tittle="Close Modal"
        @click="closeAddTaskModul">×</span>
        <form id="inputTask" class="modal-content animate" style="border:1px solid #ccc">
            <div class="modal-container">
            <label><b>Add new task</b></label>
            <input type="text" placeholder="Task tittle" name="email" v-model="tittle" required>

            <label for="date"><b>Deadline</b></label>
            <input type="date" name="date" v-model="deadline" required>

            <div class="clearfix">
                <button
                id="modal-modal-button"
                class="modal-add-button"
                type="submit"
                tittle="commit add task"
                @click="addTask">
                <font-awesome-icon icon="plus-circle" size="3x"/>
                </button>
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import TaskMonitoringDataService from '../services/task-monitoring-data-service';
import Stopwatch from '../object/stopwatch.js';

export default {
  props: ['dataTheme'],
  data() {
    return {
      tittle: '',
      deadline: '',
      taskListData:[]
    };
  },
  methods: {
    closeAddTaskModul() {
      this.$emit('closeAddTaskModul');
    },
    addTask(event) {
      event.preventDefault();
      const timestamp = new Date();
      const taskData = this.createNewTaskObject(
        timestamp.getTime(),
        this.tittle,
        true,
        true,
        this.deadline,
      );
      TaskMonitoringDataService.create(taskData);
      this.$emit('addTask', taskData);
      this.taskListData.unshift(taskData);
      console.log("tasklistdata" + this.taskListData);
    },
    createNewTaskObject(id, tittle, isTaskNotCompleted, isTimePaused, deadline) {
    // create a new task object , return object
    // task object description
    // id                   : id,       (generated timestamp convert to string , ex : 1633107549852)
    // tittle                : string,   (task tittle, ex : make wireframe for website design)
    // isTaskNotCompleted   : boolean,
    // isTimePaused         : boolean,
    // deadline             : Date,     (date object , ex : 2021-10-01)
    // Stopwatch            : Stopwatch,(this class declared in ./stopwatch.js)
      return {
        id,
        tittle,
        isTaskNotCompleted,
        isTimePaused,
        deadline: new Date(deadline),
        Stopwatch: new Stopwatch(id),
      };
    },
  },
};
</script>
