#! /usr/bin/env node

console.log('This script populates some users, questions to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var users = require('./models/users')
var questions = require('./models/questions')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MongoDB");
});



mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var questions = []

function userCreate(user_id, password, user_name, user_email, address_f, adress_i, img) {
    userdetail = {user_id:user_id, password:password, user_name:user_name, user_email:user_email,
        address_f:address_f, adress_i:adress_i, img:img  }
    
    var user = new users(userdetail);
         
    user.save(function (err) {
      if (err) {
        //cb(err, null)
        console.log(err)
        return
      }
      console.log('New User: ' + user);
      users.push(user)
      //cb(null, user)
    }  );
  }

  function createUsers(cb) {
    async.series([
        function(callback) {
          authorCreate('eunewoo', 'undefined6b115c393d2c543157778a1f74eb2b446632c44fd0a54542cd000b105d7165', 'King_eunwoo', 'ewchoi98@naver.com', '서울시 송파구 문정로83', '122동 602호', undefined);
        },
        ],
        // optional callback
        cb);
}

