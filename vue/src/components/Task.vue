<template>
    <div class="task">
        <div class="task-desc"> 
            //nyobain dulu masukin teks judul, kalau ga diperluin hapus aja
            <h3 class="task-tittle">{{taskData.tittle}} judul</h3>
            <p>due to  : {{deadlineText}} deadline</p>
        </div>
        <div id="task-control-buttons" class="task-control-buttons">
            <button v-bind:id="`delete-button{{taskData.id.toString()}}`" @click="deleteTask">
                <font-awesome-icon icon="trash" size="3x"/>
            </button>
            //nyobain dulu masukin teks result, kalau ga diperluin hapus aja
            <span v-bind:id="`result-stopwatch{{taskData.id.toString()}}`">{{resultText}} result</span>
        </div>
        <div class="stopwatch-box" :style="stopwatchBG">
            <div class="stopwatch">
                <div class="time-container">
                    //nyobain dulu masukin teks 00.00.00, kalau ga diperluin hapus aja
                    <p v-bind:id="`time-text{{taskData.id.toString()}}`" class="time">{{timeText}} 00.00.00</p>
                </div>
                <div class="stopwatch-control-buttons">
                    <button v-bind:id="`start-button{{taskData.id.toString()}}`" @click="playStopwatch">
                        <font-awesome-icon icon="play-circle" size="3x"/>
                    </button>
                    <button v-bind:id="`stop-button{{taskData.id.toString()}}`" @click="stopStopwatch">
                        <font-awesome-icon icon="stop-circle" size="3x"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import taskMonitoringDataService from '../services/task-monitoring-data-service';

export default {
    name: "task-container",
  
    data() {
        return {
            taskData:[],
            deadlineText:'',
            stopwatchBG:'',
            timeText:''
        };
    },
    mounted() {
        console.log("masuk1");
        taskMonitoringDataService.get().then((response) => {
          console.log("masuk2" + response.data);
          this.taskData.tittle = response.data.tittle;
      });
        
    
    },
    methods: {
        deleteTask(event) {
            event.preventDefault();
            taskMonitoringDataService.delete(taskData.id);
            this.$emit('deleteTask')
        },
        playStopwatch() {
            alert("play");
            this.$emit('playTask')
            console.log(taskData);
        },
        stopStopwatch() {
            this.$emit('stopask')
            alert("stop");
        }
    }
}
</script>
