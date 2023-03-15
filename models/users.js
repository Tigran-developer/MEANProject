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

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.getUserByLogin = (login, callback)=>{
    const query = {login: login}
    User.findOne(query, callback);
};
module.exports.getUserById = (id, callback)=>{
    User.findById(id, callback);
};
module.exports.AddUser = (newUser, callback)=>{
    bcrypt.genSalt(10,(err, salt)=>{
        bcrypt.hash(newUser.password, salt,(err, hash)=>{
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        })
    })
};



