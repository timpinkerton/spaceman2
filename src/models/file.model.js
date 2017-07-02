const mongoose = require('mongoose');

//creating a schema
const FileSchema = new mongoose.Schema({
    title: String, 
    body: String,
    author: String, 
    date: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false }
});

//turning the schema into a mongoose model and storing it in 'File'
const File = mongoose.model('File', FileSchema);

//exporting the model created above
module.exports = File; 

//this gets the number of documents in the collection
File.count({}, function (err, count){
    if (err) {
        throw err; 
    }

    if (count > 0) return ;

    const files = require('./file.seed.json');
    File.create(files, function(err, newFiles) {
    if (err) {
        throw err;
    }
    console.log("DB seeded")
    });
});