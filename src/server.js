//importing required modules
const express = require('express');
const config = require('./config');

const app = express(); 

app.use(function(req, res, next){
    res.send('Hello Whirled!');
});


app.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});


app.listen(config.port, function(){
    console.log(`${config.appName} is listening on port ${config.port}`);
});
