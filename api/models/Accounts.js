const mongoose = require('mongoose');

// Create a Account Model Schema
const accountSchema = mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
email:{
  type:String, 
  required:true, 
  unique:true, 
  match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
password: {type:String, required:true},
lastname: {type:String, required:true},
firstname: {type:String, required:true},
createdAt: {type:Date},
updatedAt: {type:Date},
role: {type:mongoose.Schema.Types.ObjectId, ref:'Role'},
isVerified:{type:Boolean, default:false},
status:{type:Boolean, default:true}
});

module.exports = mongoose.model('Accounts', accountSchema);