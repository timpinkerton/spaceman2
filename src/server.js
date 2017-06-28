//importing required modules
const express = require('express');
const config = require('./config');
const path = require('path');

const app = express(); 

//path.resolve: a method that resolves to an absolute path
const publicPath = path.resolve(__dirname, './public');
//static is the middleware function that serves static files
app.use(express.static(publicPath));


app.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

app.use(function(req, res, next){
    res.send('Hello Whirled!');
});


app.listen(config.port, function(){
    console.log(`${config.appName} is listening on port ${config.port}`);
});
