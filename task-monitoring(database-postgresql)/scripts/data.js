import { STORAGE_KEY } from './key.js';
import Stopwatch from './stopwatch.js';
import { add_task , get_task_by_id , get_task_list , update_task , delete_task } from './data-base-event-handler.js';

// temporary variable to store list of task object
let taskListData = [];

// ---------------- Task Object function ---------------- //
const createNewTaskObject = (id,title,isTaskNotCompleted,isTimePaused,deadline) => {
    // create a new task object , return object
    // task object description
    // id                   : id,       (generated from timestamp current date convert to string , ex : 1633107549852)
    // title                : string,   (task title, ex : make wireframe for website design)
    // isTaskNotCompleted   : boolean,
    // isTimePaused         : boolean,
    // deadline             : Date,     (date object , ex : 2021-10-01)
    // Stopwatch            : Stopwatch,(this class declared in ./stopwatch.js)
    return {
        id: id,
        title: title,
        isTaskNotCompleted: isTaskNotCompleted,
        isTimePaused: isTimePaused,
        deadline: new Date(deadline),
        Stopwatch: new Stopwatch(id)
    }
}

const findTaskIndex = (taskID) => {
    // find task index in the array use task ID 
    // return index (number)
    let index = -1;
    for (let i = 0; i < taskListData.length; i++) { 
        if(taskListData[i].id == taskID){
            index = i;
        }
      }
    return index;
}

const GetTaskByID = (taskID) => {
    // find task in the array use task ID
    // return object of task
    const index = findTaskIndex(taskID);
    const task = taskListData[index];
    return task;
}

// ---------------- CRUD Local storage ---------------- //
const isStorageExist = () => {
    // check browser support local storage
    if(typeof(Storage) === undefined){
        alert("your browser doesnt support local storage");
        return false
    }
    return true;
}

const saveData = () => {
    // save taskListData to local storage
    const parsed = JSON.stringify(taskListData);
    localStorage.setItem(STORAGE_KEY.TASK_LIST, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

const updateDataToStorage = () => {
    // use to save temp variable to local storage
    // check local storage before save data
    if(isStorageExist())
        saveData();
}

const loadDataFromStorage = () => {
    // load taskListData from local storage

    const serializedData = localStorage.getItem(STORAGE_KEY.TASK_LIST);
    let data = JSON.parse(serializedData);
    if(data !== null){
        taskListData = data;
        taskListData.forEach(element => {
            // because local storage can only store string ,  we need to redeclared the object that stored

            // parse Stopwatch as an object of stopwatch 
            const tempStopwatch = new Stopwatch(element.id);
            tempStopwatch.updateTime(
                element.Stopwatch.Time.hh,
                element.Stopwatch.Time.mm,
                element.Stopwatch.Time.ss);
            tempStopwatch.updateTimeEnd(
                element.Stopwatch.timeEnd.hh,
                element.Stopwatch.timeEnd.mm,
                element.Stopwatch.timeEnd.ss);
            tempStopwatch.isEnd = element.Stopwatch.isEnd;
            element.Stopwatch = tempStopwatch;

            const tempDate = new Date(element.deadline);
            element.deadline = tempDate;
        }); 
    }

    // add new event , it will use to trigger update every data loaded
    document.dispatchEvent(new Event("ondataloaded"));
}

const cekRunningStopwatchID = () => {
    // check, is there runningStopwatchID in the local storage or not
    // If there are  return true, otherwise return false
    for (var key in localStorage){
        if(key == "runningStopwatchID"){
            return true;
        }
     }
     return false;
}

const cekIsTimePaused = () => {
    // check, is there isTimePaused in the local storage or not
    // If there are  return true, otherwise return false
    for (var key in localStorage){
        if(key == "isTimePaused"){
            return true;
        }
     }
     return false;
}


// ------------------ CRUD database ------------------ //

const isDatabaseExist = () => {
    // check is database available or not
    const taskList = get_task_list();
    if(typeof(taskList) === undefined){
        alert("server is down, check your database connection");
        return false
    }
    return true;
}

const parseToDatabaseTaskObject = (Task) => {
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
        text_id: Task.Stopwatch.textId
      };
}

// this only sample funcitn for testing 
// const dataBaseSaveDataTask = (id) => {   
//     // get all data from database and save it in temporary variable for task list 
//     let updatedTask
//     taskListData.forEach(item => {
//         updatedTask = parseToDatabaseTaskObject(GetTaskByID(item.id));
//     });
//     document.dispatchEvent(new Event("ondatasaved"));
// }

const dataBaseUpdateDataTask = (id) => {
    // update specified task to database
    const updatedTask = parseToDatabaseTaskObject(GetTaskByID(id));
    update_task(updatedTask);
    document.dispatchEvent(new Event("ondataupdated"));
}

const dataBaseAddDataTask = (id) => {
    // add new task to database
    // use id to get specified task and parse it
    const addedTask = parseToDatabaseTaskObject(GetTaskByID(id));
    add_task(addedTask);
    document.dispatchEvent(new Event("ondataupdated"));
}

const dataBaseDeleteData = (id) => {
    delete_task(id);
    document.dispatchEvent(new Event("ondataupdated"));
}

const dataBaseGetTaskList = async () => {
        // load taskListData from database 
        let serializedData 
        serializedData = await get_task_list();
        let data = parseToDatabaseTaskObject(serializedData);
        let taskList;
        let tempTask;
        if(data !== null){
            data.forEach(element => {
                // because database can't store object , the object data will be converted
                // we need to redeclared the object to get the data back
    
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
                taskList.unshift(tempTask);
            }); 
        }
        return taskList;
}

const dataBaseGetTaskById = async (id) => {
        // load one specified task from local storage
        const serializedData = await get_task_by_id(id);
        let element = parseToDatabaseTaskObject(serializedData);
        let tempTask;
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
        return tempTask;
}

const dataBaseLoadListData = async () => {
    // load taskListData from database

    const serializedData = await get_task_list();
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
            taskListData.unshift(tempTask);
        }); 
    }
    // add new event , it will use to trigger update every data loaded
    document.dispatchEvent(new Event("ondataloaded"));
}

export { 
        isStorageExist , saveData , loadDataFromStorage , 
        updateDataToStorage , findTaskIndex ,
        createNewTaskObject , cekRunningStopwatchID , 
        cekIsTimePaused , GetTaskByID , dataBaseUpdateDataTask , 
        taskListData , dataBaseAddDataTask , dataBaseDeleteData , 
        dataBaseLoadListData , isDatabaseExist , 
        dataBaseGetTaskList , dataBaseGetTaskById
    }