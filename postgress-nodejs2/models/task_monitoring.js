const Sequelize = require('sequelize');
const db = require('../config/database');

const Task_monitoring = db.define("task-monitoring", {
    id: {
        type: Sequelize.TEXT,
        primaryKey: true,
    },
    stopwatch_time_hh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stopwatch_time_mm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stopwatch_time_ss: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    tittle: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "No Task"
    },
    is_task_not_completed: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    is_time_paused: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    deadline: {
        type: Sequelize.TEXT,
        allowNull : false,
        defaultValue : "No Task"
    },
    timer_on: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    is_end: {
        type: Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    },
    time_end_hh: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    time_end_mm: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    time_end_ss: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    time_cycle: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    text_id: {
        type: Sequelize.TEXT,
        allowNull : false,
        defaultValue : "No Task"
    }
}, { 
    tableName : 'task-monitoring',
    schema: 'public',
    freezeTableName: true
});

module.exports = Task_monitoring;