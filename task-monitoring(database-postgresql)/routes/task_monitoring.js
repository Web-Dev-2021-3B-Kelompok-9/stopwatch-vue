const express = require("express");
const taskController = require("../controller/task_monitoring")

const router = express.Router();
//create
router.post('/create_task', taskController.create_task)

//read
router.get('/read_task', taskController.get_task_list)
router.get('/read_task/:id', taskController.get_task_by_id)
//update
router.put('/update_task/:id', taskController.update_task)
//delete
router.delete('/delete_task/:id', taskController.delete_task)

module.exports = router