import { ID , BUTTON_ID , FONTAWESOME_ICON , MODAL } from './key.js';
import { addTask , GenerateTaskList} from './view.js';
import { 
        cekRunningStopwatchID , cekIsTimePaused , GetTaskByID , 
        dataBaseLoadListData , isDatabaseExist , 
    } from './data.js';

// Get button element from web page
const formModal = document.getElementById(MODAL.ADD_TASK_FORM);
const addButton = document.getElementById(BUTTON_ID.ADD);
const closeButtonList = document.querySelectorAll(`#${BUTTON_ID.CLOSE_MODAL}`);
document.getElementById("test-button2").addEventListener("click",()=>{
    dataBaseLoadListData();
});

document.addEventListener("DOMContentLoaded", function () {
    // when page opened, active add task in form module and check local storage for task database
    const submitForm = document.getElementById(ID.INPUT_TASK);
    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        formModal.style.display='none';
        addTask();
    });
    (async () => {
        if (isDatabaseExist()){
            await dataBaseLoadListData();
        }
        
        if (!cekRunningStopwatchID()){
            // check is there any local storage called runningStopwatchID or not,
            // if it doesn't exist , create by default to 0
            localStorage.setItem("runningStopwatchID",0);
        }
        if(cekIsTimePaused()){
            // check is there any stopwatch running or not
            const isPaused = localStorage.getItem("isTimePaused");
            const runningStopwatchID = localStorage.getItem("runningStopwatchID");
            if(isPaused){
                // get the task that have running stopwatch data 
                const task = GetTaskByID(runningStopwatchID);
                const uniqStartButton = document.getElementById(BUTTON_ID.START+task.id);
                const taskTimeTextElement = document.getElementById(ID.TIME+task.id);
                // make it run here
                console.log("make it run here");
                task.Stopwatch.autorecovery(taskTimeTextElement);
                uniqStartButton.innerHTML =  FONTAWESOME_ICON.PAUSE;
            }           
        }
    }
    )();
});

document.addEventListener("ondatasaved", () => {
    // information if data saved in console
   console.log("Data saved");
});
document.addEventListener("ondataupdated", () => {
    // information if data saved in console
   console.log("Data updated");
});

document.addEventListener("ondataloaded", () => {
    // if there is a local storage, page will load all task data in local storage and generate it 
    GenerateTaskList();
});


// active close and open button for modal add task 
addButton.addEventListener("click",()=>{
    // for show module
    formModal.style.display='block';
});

for (var i = 0; i < closeButtonList.length; i++) {
    // to close module
    const button = closeButtonList[i];
    button.addEventListener("click",()=>{
        button.parentElement.style.display='none';
    });
}

window.onclick = function(event) {
    // to close module
    if (event.target == formModal) {
        formModal.style.display = 'none';
    }
}
