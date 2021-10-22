const express = require("express");
const taskController = require("../controller/task_monitoring")

const router = express.Router();
//create
router.post('/create_Task', taskController.create_task)

//read

//update

//delete


module.exports = router