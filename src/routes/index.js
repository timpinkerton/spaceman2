const router = require('express').Router();
const mongoose = require('mongoose');


const FILES = [
  {id: 'A', title: 'Arnie', description: 'lil baby arn'},
  {id: 'B', title: 'Dusty', description: 'Stinkman'},
  {id: 'C', title: 'Ham', description: 'Big Hammy'},
  {id: 'D', title: 'BM', description: 'mug mug mug'},
];


// router.use('/doc', function(req, res, next) {
//   res.end(`Documentation http://expressjs.com/`);
// });

router.get('/blog', function(req, res, next){
    mongoose.model('File').find({}, function(err, files) {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }

    res.json(files);
    });
});

router.post('/blog', function(req, res, next) {
    //creating a new monggoose model 
    const File = mongoose.model('File');
    const fileData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    };

    File.create(fileData, function(err, newFile) {
        if (err) {
        console.log(err);
        return res.status(500).json(err);
        }

        res.json(newFile);
    });
});

router.put('/blog/:fileId', function(req, res, next) {
  const {fileId} = req.params;
  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  file.title = req.body.title;
  file.description = req.body.description;
  res.json(file);
});

router.delete('/blog/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});

router.get('/blog/:fileId', function(req, res, next) {
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