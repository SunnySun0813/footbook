const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  first: String,
  last: String,
  email: String,
  avatar: String,
  password: String,
  friendList: [String],
  postList: [{poster:String,first:String,last:String,avatar:String,content:String,image:String,date:Number,
    commentList:[{commenter:String,first:String,last:String,avatar:String,content:String}]}],
  request:[String],
  response:[String]
});

module.exports = mongoose.model('User', userSchema);



