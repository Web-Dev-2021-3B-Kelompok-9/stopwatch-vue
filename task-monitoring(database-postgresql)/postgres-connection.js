const {Client} = require('pg')

const DATA_BASE = {
    test:"postgres",
    task_monitoring:"task-monitoring"
}

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Titissamp22",
    database: DATA_BASE.task_monitoring
})

module.exports = client