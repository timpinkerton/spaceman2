const router = require('express').Router();

router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

router.get('/blog', function(req, res, next){
    res.send('This is where we list all posts');
});

router.post('/blog', function(req, res, next){
    res.send('This is where we create a new blog post');
});

router.put('/file/:fileId', function(req, res, next) {
  res.end(`Updating file '${req.params.fileId}'`);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
  res.end(`Reading file '${req.params.fileId}'`);
});

module.exports = router; 