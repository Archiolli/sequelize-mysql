const { DataTypes } = require('sequelize')
const db = require('../db/conn')



const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false//not null do sql (sí nao aceita valor null{diferente do required})

    },
    ocupation: {
        type: DataTypes.STRING,
        required: true//não aceita o campo fazio de qualquer forma(seja ums string, undefined ou qualquer coisa assim) forma mais correta

    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },


})

module.exports = User