const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  membership: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Membership',
    required: true
  },
  password:{
    type:String,
    required: true
  }
});

const User =  module.exports = mongoose.model('Customer',CustomerSchema);

module.exports.getUsers = ()=>{
  return User.find();
};

module.exports.getUserById = (id)=>{
  const query = {_id: id}
  return User.findOne(query);
};

module.exports.addUser = async (newUser) => {
  return newUser.save();
};
module.exports.updateUser = async (newUser) => {
  const query = {_id: newUser.id}
  return User.updateOne(query, newUser);
};

module.exports.deleteUser = async (userId) => {
  return  User.deleteOne({_id:userId})
};
