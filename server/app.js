require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');


//routes
let log = require('./controllers/log-controller');
let user = require('./controllers/user-controller');


sequelize.sync();
//sequelize.sync({force: true});

app.use(express.json());

app.use('/log', log);
app.use('/user', user);




app.listen(3000, function(){ 
    console.log('Apps listening on port 3000');
})