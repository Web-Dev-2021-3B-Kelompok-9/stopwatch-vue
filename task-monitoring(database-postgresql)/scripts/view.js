import { ID , INPUT_ID , BUTTON_ID , FONTAWESOME_ICON , ICON} from './key.js';
import {  
    taskListData , findTaskIndex , 
    createNewTaskObject , GetTaskByID , dataBaseUpdateDataTask ,
    dataBaseAddDataTask , dataBaseDeleteData
} from './data.js';

// ---------------- ARGUMENT description ---------------- //
// ---- 1 ----
// taskData is Task  JSON variable 
// descrirbed in ./data.js, createNewTaskObject function

// ---- 2 ----
// Button should be an unique button element from task element
//  for example :
// uniqStartButton = document.getElementById(BUTTON_ID.START+taskData.id);
// BUTTON_ID.START = string , value of tag id in every start button
// tasData.id      = id from task
//  for example :
// in the html BUTTON_ID.START+taskData.id will be value of tag id somewhere in html likes this : start-button1633107549852 

// ---- 3 ----
// context is string that have mean to do action 
//  for example :
// stop , pause , delete , copy etc

// ---- 4 ----
// id is taskData.id 


// ---- ---- Stopwatch control function ---- ---- //
function isOutOfDeadline(today, expDate){
    // check is the task is over from deadline , if it is return true otherwise return false
    if (today <= expDate){
        return false;
    }else{
        return true;
    }
}

const getConfirmation = (context) => {
    // make confirmation alert before do delete function or function with the same behavior
    return confirm(`Are you sure you want to ${context} this ? \n Press a button!\nEither OK or Cancel.`);
}

const preventMutiStopwatch = (button) => {
    // thereis 3 possible way to return 2 variable
    // if the button play , it waill ask for confirmation
        // true , will make the another stopwatch stop and run new one
        // false, keep the stopwath running and do nothing
    // if the button pause , it will only return false and do nothing

    // cek is there is stopwatch running
    const runningStopwatchID = localStorage.getItem("runningStopwatchID");
    if (runningStopwatchID == 0 ){
        return true;
    }else{
        // when any stopwatch is running, 
        // user need to choose start a new stopwatch then automatically stop the other stopwatch    (return true)
        // or abort to start new stopwatch and keep the other running                               (return false)
        let confirmation = false;
        if(button == 'play'){
            confirmation =  confirm(`Are you sure you want to start new stopwatch ? \nit will make the running stopwatch stop !\nEither OK or Cancel.`);
            if(confirmation){
                // stop running stopwatch , make itu pause
                const task = GetTaskByID(runningStopwatchID);
                const uniqStartButton = document.getElementById(BUTTON_ID.START+task.id);
                task.Stopwatch.playaButtonEvent('pause')
                uniqStartButton.innerHTML = FONTAWESOME_ICON.PLAY;
                dataBaseUpdateDataTask(runningStopwatchID);
            }
        }
        return confirmation;
    }
}

const stopStopwatch = (taskData,Button) => {
    // to stop stopwatch and toggle the button icon
    taskData.Stopwatch.stop(document.getElementById(ID.RESULT+taskData.id.toString()));
    // toggle button from "pause" to "start" when stopwatch stopped
    localStorage.setItem("runningStopwatchID",0);
    Button.innerHTML = FONTAWESOME_ICON.PLAY;
    // taskData.Stopwatch.playaButtonEvent(ICON(Button.innerHTML));
    dataBaseUpdateDataTask(taskData.id);
    // saveData();
}

const playStopwatch = (taskData,Button) => {
    // to play stopwatch and toggle the button icon
    const confirmation = preventMutiStopwatch(ICON(Button.innerHTML));
    if(confirmation){
        taskData.Stopwatch.start(document.getElementById(ID.TIME+taskData.id.toString()));
        // toggle button from "play" to "pause" 
        taskData.Stopwatch.playaButtonEvent('play');
        localStorage.setItem("runningStopwatchID",taskData.id);
        Button.innerHTML = FONTAWESOME_ICON.PAUSE;
    }else{
        if (Number(localStorage.getItem("runningStopwatchID")) == taskData.id){
            // if clicked button is from running stopwatch do pause function, toggle button from "pause" to "play"  
            taskData.Stopwatch.playaButtonEvent('pause');            
            localStorage.setItem("runningStopwatchID",0);
            Button.innerHTML = FONTAWESOME_ICON.PLAY; 
        }else{
            // else do nothing
        }
    }
    dataBaseUpdateDataTask(taskData.id);
    // saveData();
}

const addEventTaskButton = (taskData) =>{
    // add all button function from one task
    // Get button element from web page 
    // this uniq because every button have an stopwatch id the id tag
    const uniqDeleteButton = document.getElementById(BUTTON_ID.DELETE+taskData.id);
    const uniqStartButton = document.getElementById(BUTTON_ID.START+taskData.id);
    const uniqStopButton = document.getElementById(BUTTON_ID.STOP+taskData.id);
    
    // the event listener
    // cant do start or stop event if the stopwatch already ended
    uniqDeleteButton.addEventListener("click",()=>{
        deleteTask(taskData.id);
    });
    uniqStartButton.addEventListener("click",()=>{
        if(taskData.Stopwatch.isEnd){
            alert("task already ended");
        }else{
        playStopwatch(taskData,uniqStartButton);
        }
    });    
    uniqStopButton.addEventListener("click",()=>{
        if(taskData.Stopwatch.isEnd){
            alert("task already ended");
        }else{
            if (getConfirmation('stop')){
                stopStopwatch(taskData,uniqStartButton);
            }
        }
    });
}

// ---- ---- Task control function ---- ---- //
const addTask = () => {
    // add a new task and it will save in temporary variable "taskListData" and in local storage "TASK_LIST_STORAGE_KEY"
    // collecting data procecss from add task form 
    const addTask = document.getElementById(ID.ADD_TASK);
    const timestamp = new Date();
    const datetemp = document.getElementById(INPUT_ID.TASK_DATE).value;
    const taskData = createNewTaskObject(
            timestamp.getTime(),
            document.getElementById(INPUT_ID.TASK_TITLE).value,
            true,
            true,
            datetemp,
        );
    // generating new task
    const Task = makeTask(taskData);
    addTask.insertAdjacentElement('beforebegin',Task);
    addEventTaskButton(taskData);
    //  save task to ...
        // temporary variable 
    taskListData.unshift(taskData);
        // local storage  
    // updateDataToStorage();
        // data base
    dataBaseAddDataTask(taskData.id);
}

const makeTask = (taskData) => {
    // make a new div element as "task". 
    // return task container as <div></div>
    
    // create new element as task
    const taskContainer = document.createElement('div')
    taskContainer.setAttribute("id",`task${taskData.id.toString()}`);
    taskContainer.setAttribute("class","task");
    
    // check is out of deadline or not
    const IOODL = isOutOfDeadline(new Date(),taskData.deadline);
    let stopwatchBG = '';
    if(IOODL){
        stopwatchBG = "background-color: rgba(255, 0, 0, 0.3);"
    }

    // handle error, when current date is over deadline
    let deadlineText = taskData.deadline.toDateString();

    // show result time if stopwatch already ended
    const timeEnd = taskData.Stopwatch.timeEnd.getTimeText();
    let resultText;
    if(!taskData.Stopwatch.isEnd){
        resultText = '';
    }else{
        resultText = `elapsed time is ${timeEnd}`;
    }

    // convert stopwatch time to string
    const timeText = taskData.Stopwatch.Time.getTimeText();

    // generate task content
    taskContainer.innerHTML = `
    <div class="task-desc">
        <h3 class="task-title">${taskData.title}</h3>
        <p>due to  : ${deadlineText} </p>
    </div>
    <div id="task-control-buttons" class="task-control-buttons">
        <button id="delete-button${taskData.id.toString()}">
            <i class="fas fa-trash fa-2x"></i>
        </button>
        <span id="result-stopwatch${taskData.id.toString()}">${resultText}</span>
    </div>
    <div class="stopwatch-box" style="${stopwatchBG}">
        <div class="stopwatch">
            <div class="time-container">
                <p id="time-text${taskData.id.toString()}" class="time">${timeText}</p>
            </div>
            <div class="stopwatch-control-buttons">
            <button id="start-button${taskData.id.toString()}"><i class="far fa-play-circle fa-3x"></i></button>
            <button id="stop-button${taskData.id.toString()}"><i class="far fa-stop-circle fa-3x"></i></button>
            </div>
        </div>
    </div>
    `;
    return taskContainer;
}

const deleteTask = (id) => {
    // delete task, it will deleted from temporary variable, local storage, and User interface (page)
    // ask for confirmation, it will be prevent user miss click
    if (getConfirmation("delete")){
        // delete task from ...
            // UI
        const taskElement = document.getElementById(`task${id}`);
        const taskPosition = findTaskIndex(id);
        taskElement.remove();
            // temporary variable 
        taskListData.splice(taskPosition, 1);
            // local storage  
        // updateDataToStorage();
            // database
        dataBaseDeleteData(id);
    }
} 

const GenerateTaskList = () => {
    // generate all task from temporary variable (taskListData) to UI (page)
    let taskList = document.getElementById(ID.TASK_LIST);
    // generate iteration 
    taskListData.forEach((item)=>{
        const Task = makeTask(item); 
        // add before add task button
        taskList.insertAdjacentElement("afterbegin",Task);
        addEventTaskButton(item);
    })
}

export { addTask , makeTask , deleteTask , getConfirmation , addEventTaskButton , GenerateTaskList , preventMutiStopwatch , stopStopwatch}