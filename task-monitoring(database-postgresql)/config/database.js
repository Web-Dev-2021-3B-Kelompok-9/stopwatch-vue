const { Sequelize } = require('sequelize');

const db = new Sequelize(
    `postgresql://postgres:Titissamp22@localhost:5432/task-monitoring`,
    { define: { freezeTableName: true},
      logging : false}
)

module.exports = db;