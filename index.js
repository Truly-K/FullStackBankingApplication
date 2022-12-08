var express = require('express');
var app = express();
var cors = require('cors');

require('dotenv').config();
console.log(process.env);

var dal = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.get('/test', (req, res) => res.send('test works'));

// create user account
app.post('/account/create/:name/:email/:password', function (req, res) {
  //  create user
  dal
    .create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// login user
app.get('/account/login/:email/:password', function (req, res) {
  dal.find(req.params.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.params.password) {
        res.send(user[0]);
      } else {
        res.send({ error: 'Login failed: wrong password' });
      }
    } else {
      res.send({ error: 'Login failed: user not found' });
    }
  });
});

// find user account
app.get('/account/find/:email', function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log(response);
    res.send(response);
  });
});

// all accounts
app.get('/account/all', function (req, res) {
  dal.all().then((docs) => {
    console.log(docs);
    res.send(docs);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Server is running on port: ' + port);
});
