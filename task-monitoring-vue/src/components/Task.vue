
<template>
<div class="task">
    <div class="task-desc">
        <h3 class="task-title">{{this.task.title}}</h3>
        <p>due to  : {{this.task.deadline.toDateString()}} </p>
    </div>
    <div id="task-control-buttons" class="task-control-buttons">
        <button :id="'delete-button'+this.task.id.toString()"
        @click="deleteTask">
                <font-awesome-icon icon="trash" size="3x"/>
        </button>
        <span :id="'result-stopwatch'+this.task.id.toString()">
            elapsed time is {{this.task.Stopwatch.timeEnd.getTimeText()}}
        </span>
    </div>
    <div class="stopwatch-box">
        <div class="stopwatch">
            <div class="time-container">
                <p :id="'time-text'+this.task.id.toString()" class="time">
                    {{this.task.Stopwatch.Time.getTimeText()}}
                </p>
            </div>
            <div class="stopwatch-control-buttons">
            <button
              :id="'start-button'+this.task.id.toString()"
              class="play"
              @click="EventTaskButtonPlay">
                <font-awesome-icon icon="play-circle" size="3x"/>
            </button>
            <button :id="'stop-button'+this.task.id.toString()">
                <font-awesome-icon icon="stop-circle" size="3x"/>
            </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Stopwatch from '../object/stopwatch.js';
import TaskMonitoringDataService from '../services/task-momitoring-data-service';

export default {
  props: ['taskData'],

  components: {
  },

  created() {
    this.task = this.taskData;
    this.deadlineText = this.task.deadline.toDateString();
    // eslint-disable-next-line no-console
    // console.log(this.task);
  },
  data() {
    return {
      task: null,
    };
  },
  methods: {
    getConfirmation(context) {
    // make confirmation alert before do delete function or function with the same behavior
      return confirm(`Are you sure you want to ${context} this ? \n Press a button!\nEither OK or Cancel.`);
    },
    findTaskIndex(taskID) {
    // find task index in the array use task ID
    // return index (number)
      let index = -1;
      for (let i = 0; i < this.taskListData.length; i = +1) {
        if (this.taskListData[i].id === taskID) {
          index = i;
        }
      }
      return index;
    },
    parseToDatabaseTaskObject(Task) {
    // parsed task object,
    // postgres cant save an object data type in one cell
    // so we need to extract stopwatch and time
      return {
        id: Task.id,
        stopwatch_time_hh: Task.Stopwatch.Time.hh,
        stopwatch_time_mm: Task.Stopwatch.Time.mm,
        stopwatch_time_ss: Task.Stopwatch.Time.ss,
        title: Task.title,
        is_task_not_completed: Task.isTaskNotCompleted,
        is_time_paused: Task.isTimePaused,
        deadline: Task.deadline,
        timer_on: Task.Stopwatch.timerOn,
        is_end: Task.Stopwatch.isEnd,
        time_end_hh: Task.Stopwatch.timeEnd.hh,
        time_end_mm: Task.Stopwatch.timeEnd.mm,
        time_end_ss: Task.Stopwatch.timeEnd.ss,
        time_cycle: Task.Stopwatch.timeCycle,
        text_id: Task.Stopwatch.textId,
      };
    },
    dataBaseGetTask(taskData) {
      // eslint-disable-next-line no-console
      // console.log(taskData);
      const element = taskData;

      const tempStopwatch = new Stopwatch(element.id);
      tempStopwatch.updateTime(
        element.stopwatch_time_hh,
        element.stopwatch_time_mm,
        element.stopwatch_time_ss);
      tempStopwatch.updateTimeEnd(
        element.time_end_hh,
        element.time_end_mm,
        element.time_end_ss);
      tempStopwatch.timerOn = element.timer_on;
      tempStopwatch.isEnd = element.is_end;
      tempStopwatch.timeCycle = element.time_cycle;

      const tempDate = new Date(element.deadline);

      return {
        id: element.id,
        title: element.tittle,
        isTaskNotCompleted: element.is_task_not_completed,
        isTimePaused: element.is_time_paused,
        deadline: tempDate,
        Stopwatch: tempStopwatch,
      };
    },
    createNewTaskObject(id, title, isTaskNotCompleted, isTimePaused, deadline) {
    // create a new task object , return object
    // task object description
    // id                   : id
    // (generated from timestamp current date convert to string , ex : 1633107549852)
    // title                : string,   (task title, ex : make wireframe for website design)
    // isTaskNotCompleted   : boolean,
    // isTimePaused         : boolean,
    // deadline             : Date,     (date object , ex : 2021-10-01)
    // Stopwatch            : Stopwatch,(this class declared in ./stopwatch.js)
      return {
        id,
        title,
        isTaskNotCompleted,
        isTimePaused,
        deadline: new Date(deadline),
        Stopwatch: new Stopwatch(id),
      };
    },
    deleteTask() {
    // ask for confirmation, it will be prevent user miss click
      if (this.getConfirmation('delete')) {
        TaskMonitoringDataService.delete(this.task.id);
        this.$emit('ondataupdated');
      }
    },
    EventTaskButtonPause() {

    },
    async GetTaskByID(id) {
      const response = await TaskMonitoringDataService.get(id);
      const task = response.data;
      return task;
    },
    async preventMutiStopwatch(BUTTON) {
    // thereis 3 possible way to return 2 variable
    // if the button play , it waill ask for confirmation
      // true , will make the another stopwatch stop and run new one
      // false, keep the stopwath running and do nothing
    // if the button pause , it will only return false and do nothing
      const button = BUTTON;
      const buttonStatus = button.getAttribute('class');
      // cek is there is stopwatch running
      const runningStopwatchID = localStorage.getItem('runningStopwatchID');
      if (runningStopwatchID === '0') {
        return true;
      }
      // when any stopwatch is running,
      // user need to choose start a new stopwatch then
      // automatically stop the other stopwatch    (return true)
      // or abort to start new stopwatch and keep the other running (return false)
      // let confirmation = false;
      const confirmation = false;
      if (buttonStatus === 'play') {
        alert('cant play multi stopwatch');
        // confirmation = confirm('Are you sure you want to start new stopwatch ?
        // \nit will make the running stopwatch stop !\nEither OK or Cancel.');
        // if (confirmation) {
        //   this.$emit('stopTime');
        //   // // stop running stopwatch , make itu pause
        //   // let task = await this.GetTaskByID(runningStopwatchID);
        //   // task = this.dataBaseGetTask(task[0]);
        //   // const uniqStartButton = document.getElementById(`start-button${task.id}`);
        //   // task.Stopwatch.playaButtonEvent('pause');
        //   // uniqStartButton.setAttribute('class', 'pause');
        //   // uniqStartButton.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg>';
        //   // this.dataBaseUpdateDataTask(task);
        // }
      }
      return confirmation;
    },
    dataBaseUpdateDataTask(task) {
    // update specified task to database
      // eslint-disable-next-line no-console
      const updatedTask = this.parseToDatabaseTaskObject(task);
      TaskMonitoringDataService.update(updatedTask);
      this.$emit('ondataupdated');
    },

    async playStopwatch() {
      // to play stopwatch and toggle the button icon
      const button = document.getElementById(`start-button${this.task.id.toString()}`);
      const confirmation = await this.preventMutiStopwatch(button);
      if (confirmation) {
        this.task.Stopwatch.start(document.getElementById(`time-text${this.task.id.toString()}`));
        // toggle button from "play" to "pause"
        this.task.Stopwatch.playaButtonEvent('play');
        localStorage.setItem('runningStopwatchID', this.task.id);
        button.setAttribute('class', 'pause');
        button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-pause-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm-16 328c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160zm112 0c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v160z" class=""></path></svg>';
      } else {
        // eslint-disable-next-line no-lonely-if
        if (localStorage.getItem('runningStopwatchID') === this.task.id) {
        // if clicked button is from running stopwatch do pause function,
        // toggle button from "pause" to "play"
          this.task.Stopwatch.playaButtonEvent('pause');
          localStorage.setItem('runningStopwatchID', 0);
          button.setAttribute('class', 'play');
          button.innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-play-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" class=""></path></svg>';
        } else {
          // eslint-disable-next-line no-console
          console.log('do nothing');
        }
      }
      this.dataBaseUpdateDataTask(this.task);
      // saveData();
    },
    EventTaskButtonPlay() {
      if (this.task.Stopwatch.isEnd) {
        alert('task already ended');
      } else {
        this.playStopwatch('play');
      }
    },
  },
};
</script>
