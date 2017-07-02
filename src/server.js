//importing required modules
const express = require('express');
const config = require('./config');
const path = require('path');
const router = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connecting to mongodb using the host & dbname from config/index.js
mongoose.connect(`mongodb://${config.db.host}/${config.db.dbName}`);

//requiring file.model.js
require('./models/file.model.js');


const app = express(); 

//path.resolve: a method that resolves to an absolute path
const publicPath = path.resolve(__dirname, './public');
//static is the middleware function that serves static files
app.use(express.static(publicPath));

app.use(bodyParser.json());

app.use('/api', router);


app.listen(config.port, function(){
    console.log(`${config.appName} is listening on port ${config.port}`);
});