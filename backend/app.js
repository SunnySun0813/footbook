const express =  require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require("path");
const app = express();

const userRoutes = require("./routes/user");

// problem?: url must move out, using process.env
mongoose.connect('mongodb+srv://SASunny0813:Syc920813@cluster0.yi6keqe.mongodb.net/footbook?retryWrites=true&w=majority')
.then(()=> {
  console.log('Connected to database!');
})
.catch(()=>{
  console.log('Connection failed!');
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type, Accpet, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  next();
});

app.use("/user", userRoutes);

module.exports = app;

