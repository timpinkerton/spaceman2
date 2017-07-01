const router = require('express').Router();


const FILES = [
  {id: 'A', title: 'Arnie', description: 'lil baby arn'},
  {id: 'B', title: 'Dusty', description: 'Stinkman'},
  {id: 'C', title: 'Ham', description: 'Big Hammy'},
  {id: 'D', title: 'BM', description: 'mug mug mug'},
];


router.use('/doc', function(req, res, next) {
  res.end(`Documentation http://expressjs.com/`);
});

router.get('/blog', function(req, res, next){
    res.send('This is where we list all posts');
});

router.post('/file', function(req, res, next) {
  const newId = '' + FILES.length;
  const data = req.body;
  data.id = newId;

  FILES.push(data);
  res.status(201).json(data);
});

router.put('/file/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.description;
  res.json(file);
});

router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/file/:fileId', function(req, res, next) {
    //this will return...
    const {fileId} = req.params; 

    const file = FILES.find(entry => entry.id === fileId);
    //returns an error message if the fileId does not exist
    if (!file) {
        return res.status(404).end(`Sorry, '${fileId}' could not be found.`);
    }
    //returns all files
    res.json(FILES);
});

module.exports = router; 