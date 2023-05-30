const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../angular/customers');

router.get('/', async (req, res) => {
    try {
        const user = await User.getUsers();
        res.send(user);
    } catch (err) {
        res.send(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        res.send(User.getUserById(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

router.post('/',async (req, response)=>{
    let newUser = new User({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        membership: req.body.membership,
        password:8
    })
    try {
        const result = await User.addUser(newUser)
        response.send(result);
    } catch (err) {
        response.json({ success: false, msg: 'User did not added' });
    }
});

router.patch('/', (req, response)=>{
    let newUser = new User({
        _id: req.body._id,
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        membership: req.body.membership,
        password:8
    })
    try {
        let isUpdated=false;
        User.updateUser(newUser).then(r => isUpdated=r.modifiedCount === 1);
        response.send(isUpdated? newUser:'There is not any matches for update');
    } catch (err) {
        response.json({ success: false, msg: 'User did not updated' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        res.send(User.deleteUser(req.params.id));
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;

