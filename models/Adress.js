const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Address', {

    street: {
        type: DataTypes.STRING,
        required: true
    },
    number: {
        type: DataTypes.STRING,
        required: true
    },
    complement: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING,
        required: true
    },

})

User.hasMany(Address) //um usuário tem mais de um endereço (relação)

Address.belongsTo(User) //relação de fato com o usuário 

module.exports = Address