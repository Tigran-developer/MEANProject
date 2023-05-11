const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const UserSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        required:true
    },
    login: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

 // const User = module.exports = mongoose.model('Name',UserSchema);

// module.exports.getUserByLogin = (login)=>{
//     const query = {login: login}
//     return User.findOne(query);
// };

// module.exports.getUserById = (id, callback)=>{
//     User.findById(id, callback);
// };
// module.exports.AddUser = (newUser) => {
//   return bcrypt.genSalt(10)
//     .then((salt) => {
//       return bcrypt.hash(newUser.password, salt);
//     })
//     .then((hash) => {
//       newUser.password = hash;
//       return newUser.save();
//     });
// };
//
// module.exports.comparePass = (passFromLogin, passFromDB)=> {
//   return bcrypt.compare(passFromLogin, passFromDB);
// };



