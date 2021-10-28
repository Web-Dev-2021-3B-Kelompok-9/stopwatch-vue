<template>
    <div class="task-list">
        <template>
            <task></task>
        </template>
    </div>
</template>
<script>
import taskMonitoringDataService from '../services/task-monitoring-data-service'
import taskListData from './AddTaskModal.vue'
import Stopwatch from '../object/stopwatch'
import task from '../components/Task.vue';
export default {
    name: "task-list",
    components: {
        taskListData,
        task
    },
 
    mounted() {
        const serializedData = taskMonitoringDataService.get();
        let data = serializedData;
        let tempTask;
        if(data !== null){
        data.forEach(element => {
            // because local storage can only store string ,  we need to redeclared the object that stored

            // parse Stopwatch as an object of stopwatch 
            let tempStopwatch = new Stopwatch(element.id);
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

            tempTask = {
                id: element.id,
                title: element.title,
                isTaskNotCompleted: element.is_task_not_completed,
                isTimePaused: element.is_time_paused,
                deadline: tempDate,
                Stopwatch: tempStopwatch
            }
            this.taskListData.unshift(tempTask);
            console.log(this.taskListData);
        }); 
    }
    }
}
</script>
