const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const router = express.Router();
const config = require('./config/db');
const session = require('express-session')

const customer = require('./routes/customer.service');
const membership = require('./routes/membership.service');

const account = require('./routes/account.service');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.listen(port,() => {
  // console.log(path.join(__dirname, '../../angular-app'));
});

mongoose.connect(config.db)
    .then(connection => {
      const dbName = mongoose.connection.db.databaseName;
      console.log('Successfully connected to DB:', dbName);
    })
    .catch(error => {
      console.error("Failed to connect to DB: ", error);
    });

app.get('/',(req, res)=>{
  res.send('The main page');
});

app.use('/customers', customer)

app.use('/membership', membership);

app.use('/account', account);




