let express = require('express');
let app = express();
let sequelize = require('./db');


//routes
let log = require('./controllers/log-controller');


sequelize.sync();
//sequelize.sync({force: true});

app.use('/log', log);





app.listen(3000, function(){ 
    console.log('Apps listening on port 3000');
})