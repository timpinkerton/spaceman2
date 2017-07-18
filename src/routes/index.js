const router = require('express').Router();
const mongoose = require('mongoose');


//{$ne: true} included any Posts where the 'deleted' field does not equal true
router.get('/blog', function(req, res, next){
    mongoose.model('Post').find({deleted: {$ne: true}}, function(err, posts) {
    if (err) {
        console.log(err);
        res.status(500).json(err);
    }

    //responds with all files where the deleted field is false
    res.json(posts);

    });
});

router.post('/blog', function(req, res, next) {
    //creating a new mongoose model 
    const Post = mongoose.model('Post');
    const postData = {
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    };

    Post.create(postData, function(err, newPost) {
        if (err) {
        console.log(err);
        return res.status(500).json(err);
        }

        res.json(newPost);
    });
});

//updates the post based on the postId
router.put('/blog/:postId', function(req, res, next) {
    const Post = mongoose.model('Post');
    const postId = req.params.postId; 

    Post.findById(postId, function(err, post) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!post) {
            return res.status(404).json({message: "Post was not found"});
        }

        //this puts in the new edited data
        post.title = req.body.title;
        post.body = req.body.body;
        post.author = req.body.author; 

        post.save(function(err, savedPost) {
            res.json(savedPost);
        })

        })
    });

//to delete a post
router.delete('/blog/:postId', function(req, res, next) {
    const Post = mongoose.model('Post');
    const postId = req.params.postId; 

    Post.findById(postId, function(err, post) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        }
        if (!post) {
            return res.status(404).json({message: "not found"});
        }
        //this changes the deleted field to true and will not show in the get request above
        post.deleted = true; 

        post.save(function(err, savedPost) {
            res.json(savedPost);
        })

    })
});

//**************************************************************************************
// router.get('/blog/:postId', function(req, res, next) {
//     to return a sinlge post
//     const {postId} = req.params; 

//     const file = FILES.find(entry => entry.id === postId);
//     returns an error message if the postId does not exist
//     if (!file) {
//         return res.status(404).end(`Sorry, '${postId}' could not be found.`);
//     }
//     returns all files
//     res.json(FILES);
// });

module.exports = router; 