const Task_monitoring = require('../models/task_monitoring')

exports.get_task_list = async (req, res) =>{
    // get all task list 
    // return promise array of task list (use async~await function to get the data)
    try {
        const task_monitoring = await Task_monitoring.findAll();
        res.send(task_monitoring);
    } catch (error) {
        console.log(error.message);
    }
}

exports.get_task_by_id = async (req, res) =>{
    // get task use id as an argument
    // return promise of task (use async~await function to get the data)
    try {
        const task_monitoring = await Task_monitoring.findAll({
            where: {
                id : req.params.id
            }
        });
        res.send (task_monitoring[0]);
    } catch (error) {
        console.log(error.message);
    }
}

exports.add_task = async (req, res) =>{
    // post task, need all off the element from task 
    // add new task to the database
    try {
        await Task_monitoring.create(req.body);
        res.json({
            "message" : "Task Created"
        });
    } catch (error) {
        console.log(error)
    }
}

exports.update_task = async (req, res) =>{
    // update task, temp_post_task is object of task (need to parsed)
    // change value of task element in the database to the new one
    try {
        await Task_monitoring.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Task Updated"
        });
    } catch (error) {
        console.log(error)
    }
}

exports.delete_task = async (req,res) => {
    try {
        await Task_monitoring.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message" : "Task Deleted"
        });
    } catch (error) {
        console.log(error)
    }
}

exports.create_task =async (req, res) =>{
    try{
        console.log (req.body);
        const task = {
            id: req.body.id,
            stopwatch_time_hh: req.body.stopwatch_time_hh,
            stopwatch_time_mm: req.body.stopwatch_time_mm,
            stopwatch_time_ss: req.body.stopwatch_time_ss,
            title: req.body.title,
            is_task_not_completed: req.body.is_task_not_completed,
            is_time_paused: req.body.is_time_paused,
            deadline: req.body.deadline,
            timer_on: req.body.timer_on,
            is_end: req.body.is_end,
            time_end_hh: req.body.time_end_hh,
            time_end_mm: req.body.time_end_mm,
            time_end_ss: req.body.time_end_ss,
            time_cycle: req.body.time_cycle,
            text_id: req.body.text_id
        };
        Task_monitoring.create(task)
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Stopwatch."
            });
          });
    } 
    catch (error) {
        console.log(error)
    }
}