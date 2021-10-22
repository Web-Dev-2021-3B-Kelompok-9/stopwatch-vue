//Modules
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
//Database Connection
const db = require('./config/database');


db.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors("*"));
// declare static variable directory
app.use('/scripts', express.static('scripts'))
app.use('/styles', express.static('styles'))
//Routes
const taskRoutes =  require('./routes/task_monitoring');
app.use('/task', taskRoutes);
//Use routes

const PORT = 3000;
db.sync().then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
}).catch(err => console.log("Error: " + err));
// open landing page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})
// -------------------------------------------- CRUD API event -------------------------------------------- //
app.get('/task_list', (req, res)=>{
    postgres.query(`Select * from task_list`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    postgres.end;
})

app.get('/task_list/:id', (req, res)=>{
    postgres.query(`Select * from task_list where id='${req.params.id}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    postgres.end;
})

app.post('/task_list', (req, res)=> {
    const task = req.body;
    console.log(req.body);
    const insertQuery = `insert into task_list values(
                            '${task.id}', ${task.stopwatch_time_hh}, ${task.stopwatch_time_mm},
                             ${task.stopwatch_time_ss}, '${task.title}', ${task.is_task_not_completed}, 
                             ${task.is_time_paused}, '${task.deadline}', ${task.timer_on}, ${task.is_end}, 
                             ${task.time_end_hh}, ${task.time_end_mm}, ${task.time_end_ss}, ${task.time_cycle}, '${task.text_id}')`

    postgres.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ 
            res.send(err)
            console.log(err) }
    })
    postgres.end;
})

app.put('/task_list/:id', (req, res)=> {
    const task = req.body;
    const updateQuery = `update task_list
                       set 
                       id = '${task.id}',
                       stopwatch_time_hh = ${task.stopwatch_time_hh},
                       stopwatch_time_mm = ${task.stopwatch_time_mm},
                       stopwatch_time_ss = ${task.stopwatch_time_ss},
                       title = '${task.title}',
                       is_task_not_completed = ${task.is_task_not_completed},
                       is_time_paused = ${task.is_time_paused},
                       deadline = '${task.deadline}',
                       timer_on = ${task.timer_on},
                       is_end = ${task.is_end},
                       time_end_hh = ${task.time_end_hh},
                       time_end_mm = ${task.time_end_mm},
                       time_end_ss = ${task.time_end_ss},
                       time_cycle = ${task.time_cycle}, 
                       text_id = '${task.text_id}'
                       where id = '${task.text_id}'`

    postgres.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Update was successful')
        }
        else{ console.log(err.message) }
    })
    postgres.end;
})

app.delete('/task_list/:id', (req, res)=> {
    const insertQuery = `delete from task_list where id='${req.params.id}'`

    postgres.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log(err.message) }
    })
    postgres.end;
})



// -------------------------------------------- tester CRUD API event -------------------------------------------- //
app.get('/tester', (req, res)=>{
    postgres.query(`Select * from tester`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    postgres.end;
})

app.post('/tester', (req, res)=> {
    const val = req.body;
    postgres.query(`insert into tester values('${val.a}','${val.b}')`, (err, result)=>{
        if(!err){
            res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
    })
    postgres.end;
})