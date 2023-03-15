const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const router = express.Router();
const config = require('./config/db');
const account = require('./routes/account');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../angular-app')));

mongoose.connect(config.db)
    .then(r =>  console.log("Successfully connected to DB"));

app.get('/',(req, res)=>{
  res.send('The main page');
});

app.use('/account', account);

app.listen(port,() => {
  console.log(path.join(__dirname, '../../angular-app'));
});



