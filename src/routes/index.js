const router = require('express').Router();
const mongoose = require('mongoose');


//{$ne: true} included any Files where the 'deleted' field does not equal true
router.get('/blog', function(req, res, next){
    mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }

    res.json(files);


    });
});

router.post('/blog', function(req, res, next) {
    //creating a new mongoose model 
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

//updates the post based on the fileId
router.put('/blog/:fileId', function(req, res, next) {
    const File = mongoose.model('File');
    const fileId = req.params.fileId; 

    File.findById(fileId, function(err, file) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!file) {
            return res.status(404).json({message: "File not found"});
        }

        //this puts in the new edited data
        file.title = req.body.title;
        file.body = req.body.body;
        file.author = req.body.author; 

        file.save(function(err, savedFile) {
            res.json(savedFile);
        })

        })
    });


router.delete('/blog/:fileId', function(req, res, next) {
    const File = mongoose.model('File');
    const fileId = req.params.fileId; 

    File.findById(fileId, function(err, file) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!file) {
            return res.status(404).json({message: "not found"});
        }
        //this changes the deleted field to true and will not show in the get request above
        file.deleted = true; 

        file.save(function(err, savedFile) {
            res.json(savedFile);
        })

    })
});

//**************************************************************************************
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