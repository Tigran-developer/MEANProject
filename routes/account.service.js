const express = require('express');
const  router = express.Router();
const User = require('../front-end-app/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');


// router.post('/reg',(req, res)=>{
//     let newUser = new User({
//         name: req.body.name,
//         email: req.body.email,
//         login: req.body.login,
//         password: req.body.password,
//     })
//     User.AddUser(newUser)
//         .then(() => {
//             res.json({ success: true, msg: 'User was added' });
//         })
//         .catch((err) => {
//             res.json({ success: false, msg: 'User did not added' });
//         });
// });
//
// router.post('/auth', (req, res) => {
//     const login = req.body.login;
//     const password = req.body.password;
//     User.getUserByLogin(login)
//         .then((user) => {
//             if (!user) return res.json({ success: false, msg: "No such user" })
//            User.comparePass(password, user.password)
//                 .then((isMatch) => {
//                     if (isMatch) {
//                         const token = jwt.sign(user.toJSON(), config.secret, {
//                             expiresIn: 3600 * 24
//                         })
//                         res.json({
//                             success: true,
//                             token: 'JWT ' + token,
//                             user: {
//                                 id: user._id,
//                                 name: user.name,
//                                 login: user.login,
//                                 email: user.email
//                             }
//                         })
//                     } else {
//                         return res.json({ success: false, msg: "Password mismatch" })
//                     }
//                 }).catch((err) => {
//                     console.error(err);
//                     return res.json({ success: false, msg: "An error occurred" });
//                 });
//         })
//         .catch((err) => {
//             console.error(err);
//             return res.json({ success: false, msg: "An error occurred." });
//         });
// });
//
//
//
// router.get('/dashboard',
//     passport.authenticate('jwt',{session: false}),
//     (req, res)=> {
//     res.send('User account');
// });

router.get('/',
    (req, res)=> {
        res.send(User.getUserByLogin('aaa')
            .then((user) => {
                console.log(user.password)
                return user})
            .catch((err) => err)
        );
    });

module.exports = router;
