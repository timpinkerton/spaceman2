const mongoose = require('mongoose');

//creating a schema
const FileSchema = new mongoose.Schema({
    title: String, 
    body: String,
    author: String, 
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

//turning the schema into a mongoose model and storing it in 'Post'
const Post = mongoose.model('Post', FileSchema);

//exporting the model created above
module.exports = Post; 

//this gets the number of documents (posts) in the collection

Post.count({}, function (err, count){
    if (err) {
        throw err; 
    }

    if (count > 0) return ;

    const posts = require('./post.seed.json');
    Post.create(posts, function(err, newPosts) {
    if (err) {
        throw err;
    }
    console.log("DB seeded")
    });
});