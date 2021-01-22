const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function(){
        console.log('Connect to workout-log postgre database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;