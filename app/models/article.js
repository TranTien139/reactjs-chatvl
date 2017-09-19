/**
 * Created by Tien on 8/6/2017.
 */
var mongoose = require("mongoose");

var AricleSchema = mongoose.Schema({
    user: {id: String, name: String, image: String},
    userSlug: String,
    title: String,
    image: String,
    linkCrawler: String,
    linkVideo: String,
    status: String,
    views: String,
    date: {type: Date, default: Date.now},
    likes: [],
    shares: [],
    dislikes: [],
    comments: [{id: String,name:String,image: String, like: String,content: String, date: {type: Date, default: Date.now },reply: [{id: String,name:String,image: String, like: String,content: String, date: {type: Date, default: Date.now }}]}]
});

module.exports = mongoose.model('Article',AricleSchema);