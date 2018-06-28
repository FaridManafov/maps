const express = require('express');
const PORT = 3000;
const path = require('path');
const bcrypt = require('bcrypt-nodejs')
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const nodeSassMiddleware = require('node-sass-middleware');
const app = express();

/* Database Config */
const knexConfig = require('./knexfile.js')
const knex = require('knex')(knexConfig.development);

app.set("view engine", "ejs");

app.use(nodeSassMiddleware({
  src: path.join(__dirname, './scss'),
  dest: path.join(__dirname, '../public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieSession({
  name: 'session',
  keys: ['user_id']
}));

/* Routes */

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new", (req, res) => {
  res.render("new_map");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  console.log('REQ.BODY.USERNAME:', req.body.username);
  console.log('REQ.BODY.USERPASSWORD:', req.body.userpassword);
  let salt = bcrypt.genSaltSync(10);
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.userpassword, salt);
  console.log(username, password)

  knex('users')
    .where({ username: username, password: password })
    .then((data) => {
      console.log(data);
      res.redirect("/");
    });
});

/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
