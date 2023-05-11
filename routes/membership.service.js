const express = require('express');
const passport = require('passport');
const router = express.Router();
const Membership = require('../angular-app/membership');

router.get('/', async (req, res) => {
    try {
        const user = await Membership.loadAllMemberships();
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await Membership.loadMembershipById(req.params.id);
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});

router.post('/',(req, res)=>{
    let newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        membership: req.body.membership,
        password:8
    })
    User.addUser(newUser)
        .then(() => {
            alert("User successfully was added")
            res.json({ success: true, msg: 'User was added' });
        })
        .catch((err) => {
            res.json({ success: false, msg: 'User did not added' });
        });
});
router.patch('/',(req, res)=>{
    let newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        membership: req.body.membership,
        password:8
    })
    User.addUser(newUser)
        .then(() => {
            alert("User successfully was added")
            res.json({ success: true, msg: 'User was added' });
        })
        .catch((err) => {
            res.json({ success: false, msg: 'User did not added' });
        });
});

router.delete('/:id', async (req, res) => {
    try {
        res.send(User.deleteUser(req.params.id));
    } catch (err) {
        res.send(err);
    }
});
module.exports = router;

