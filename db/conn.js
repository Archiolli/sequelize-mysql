const { Sequelize } = require('sequelize')


const sequelize = new Sequelize('nodesequelize2', 'root', 'password',{
    host: 'localhost',
    dialect: 'mysql'
})
// try {
    
//     sequelize.authenticate()
//     console.log('Conectado com o Sequelize');

// } catch (error) {
//     console.log(error);
// }

module.exports  = sequelize