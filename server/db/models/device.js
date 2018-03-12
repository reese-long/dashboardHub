const Sequelize = require('sequelize')
const db = require('../db')

const Device = db.define('device', {
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    required:true
  },
  position: {
    type: Sequelize.STRING,
    defaultValue:'off'
  }
})

module.exports = Device
