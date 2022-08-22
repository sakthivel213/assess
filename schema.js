var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var userSchema = new Schema({
  Firstname: {
    type: String,
    required:[true,'required']
    
  },
  Lastname: {
    type: String,
    required:[true,'required']
  },
  Email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email field is not provided. Cannot create user without email "],
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  Mob: {
    type: Number,
  },
  Sal: {
    type: Number,
    trim: true,
  },
  ID:{
    type:Number
  }
});

module.exports = userSchema;