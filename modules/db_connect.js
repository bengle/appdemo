var  mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = null;

exports.connect = function(host,db){
    try{
        db = mongoose.connect('mongodb://'+host+'/'+db);
    }catch(err){
        console.log("err:"+err);
    }
};
exports.initBlog = function(){
    var blogSchema = new Schema({
        title:  String,
        author: String,
        body:   String,
        comments: [{ body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        meta: {
            votes: Number,
            favs:  Number
        }
    });

    Blog = db.model('Blog',blogSchema);
};
exports.addOne = function(rst){
    //var ans = new Answer(rst);
    var post = new Blog(rst);
    post.save(function (err) {
        if (err){
            console.log('save error');
        }else{
            console.log('save success');
        }
    });
};
exports.findOneById = function(condition,callback){
    Blog.find(condition).exec(callback);
};
exports.removeOne = function(condition){
    Blog.remove(condition, function (err) {
        if (err) return handleError(err);
        // removed!
    });
};
exports.update = function(condition, upsert, opts, callback){
    Blog.update(condition, upsert, opts, callback);
};