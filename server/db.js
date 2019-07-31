const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect('mongodb://localhost/Walsh');

const dataSchema = mongoose.Schema({
  'First Name': String,
  'Last Name': String,
  instrument: String,
  StudentID: Number,
  grade: Number,
  Order: Number,
  primaryGroup: String,
  secondaryGroup: String,
  Locker: Number,
  gender: String,
  'Email 1': String,
  'Email 2': String,
  'Email 3': String,
  'Email 4': String,
  Phone1Name: String,
  Phone1Person: String,
  Phone1: String,
  Phone2Name: String,
  Phone2Person:String,
  Phone2: String,
  Gattiland: String,
  MainEvent: String,
  TShirt: String,
  HighSchool: String,
  PermissionSlip: String,
  DressSize: String,
  AdjustmentsNeeded: String,
  District: String,
  Region: String,
  MadeRegion: String,
  Orchestra: String
}) 
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  cookie: String
})

const dataList = mongoose.model('data', dataSchema, 'data');
const userList = mongoose.model('user', userSchema);

const getEmails = (items, cb) => {
  for (let key in items){
    if (items[key] === 'All'){
      delete items[key];
    }
  }
  
  dataList.find(items)
  .then((results) => {
    let emailList = '';
    for (let i = 0; i < results.length; i++){
      if (results[i]['Email 1'] !== ''){
        emailList += results[i]['Email 1'] + ',';
      }
      if (results[i]['Email 2'] !== ''){
        emailList += results[i]['Email 2']+ ',';
      }
      if (results[i]['Email 3'] !== ''){
        emailList += results[i]['Email 3']+ ',';
      }
      if (results[i]['Email 4'] !== ''){
        emailList += results[i]['Email 4']+ ',';
      }
    }
    cb(emailList.substring(0, emailList.length-1))
  })
}

const getCategories = (cb) => {
  let data = {};
  dataList.distinct('instrument')
  .then((instrumentRes) => {
    data.instrument = instrumentRes;
    dataList.distinct('grade')
  .then((gradeRes) => {
    data.grade = gradeRes;
    dataList.distinct('gender')
  .then((genderRes) => {
    data.gender = genderRes;
    dataList.distinct('highSchool')
  .then((highRes) => {
    data.highSchool = highRes;
    dataList.distinct('secondaryGroup')
  .then((secRes) => {
    data.secondaryGroup = secRes;
    dataList.distinct('primaryGroup')
  .then((primRes) => {
    data.primaryGroup = primRes;
    cb(data);
  })
  })
  })
  })
  })
  })
}

const login = (creds, cookie, cb) => {
  userList.find({username: creds.user})
  .then((data) => {
    if (data.length === 0){
      cb('username or password incorrect');
      return;
    } else {
      bcrypt.compare(creds.pass, data[0].password, function(err, res) {
        if (res) {
          userList.update({username: creds.user}, {cookie})
          .then(() => cb('Logged In'))
        } else {
          cb('username or password incorrect')
        }
      });
    }

  })
}

const checkCookie = (cookie, cb) => {
  userList.find({cookie})
  .then((data) => {
    if (data.length === 0) {
      cb('');
      return;
    } else {
      cb('Logged In')
    }
  })
}

module.exports = { getCategories, getEmails, login, checkCookie }