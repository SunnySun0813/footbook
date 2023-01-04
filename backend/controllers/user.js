const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const app = express();
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
app.use(bodyParser.urlencoded({ extended: false }));

exports.editUserInfo = async function (req,res,next) {
  await User.findOneAndUpdate({_id:req.body._id},{
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    avatar: req.body.avatar,
    friendList: req.body.friendList,
    postList: req.body.postList,
    request: req.body.request,
    response: req.body.response
  });

  if (req.body.password) {
    const hashed = await bcrypt.hash(req.body.password, Number(process.env.SALT));
    await User.findOneAndUpdate({_id:req.body._id},{password: hashed});
  }
  res.status(200).json({message: true});
}

exports.editUser = async function (req,res,next) {
  await User.findOneAndUpdate({_id:req.body._id},{
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    avatar: req.body.avatar,
    friendList: req.body.friendList,
    postList: req.body.postList,
    request: req.body.request,
    response: req.body.response
  });

  res.status(200).json({message: true});
}

exports.addUser = async function (req,res,next) {
  const hashed = await bcrypt.hash(req.body.password, Number(process.env.SALT));

  const user = new User({
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    avatar: req.body.avatar,
    password: hashed,
    friendList: [],
    postList: [],
    request:[],
    response:[]
  });

  const copy = await User.findOne({email:req.body.email},{});
  if (copy === null) {
    user.save().then(result => {
      res.status(200).json({
        message: true
      });
    });
  }
  else {
    res.status(500).json({ message: false });
  }
}

exports.getUser = async function (req,res,next) {
  const copy = await User.findOne({email:req.params.email},{});
  if (copy && await bcrypt.compare(req.params.password, copy.password)) {
    const token = jwt.sign(
      {email:copy.email,userId:copy._id},
      'secret',
      {expiresIn:'10h'}
    );
    res.status(200).json({
      message: true,
      user: copy,
      token: token,
      expiresIn: 36000
    });
  }
  else {
    res.status(500).json({
      message: false
    });
  }
}

exports.getAllOther = async function (req,res,next) {
  let copy = await User.find({},{});
  let items = [];
  for (let i = 0; i < copy.length; i++) {
    let item = {
      _id: copy[i]._id,
      first: copy[i].first,
      last: copy[i].last,
      email: copy[i].email,
      avatar: copy[i].avatar,
      friendList: copy[i].friendList,
      postList: copy[i].postList,
      request: copy[i].request,
      response: copy[i].response
    }
    items.push(item);
  }
  res.status(200).json({message:true,users:items});
}

exports.getOther = async function (req,res,next) {
  const copy = await User.findOne({email:req.params.email},{});
  let item = {
    _id: copy._id,
    first: copy.first,
    last: copy.last,
    email: copy.email,
    avatar: copy.avatar,
    friendList: copy.friendList,
    postList: copy.postList,
    request: copy.request,
    response: copy.response
  }
  res.status(200).json({message:true, user:item});
}



