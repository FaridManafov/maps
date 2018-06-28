const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const nodeSassMiddleware = require('node-sass-middleware');

/* Database Config */
const knexConfig = require('./knexfile.js')
const knex = require('knex')(knexConfig.development);

/* Use middleware */
app.set("view engine", "ejs");

app.use(nodeSassMiddleware({
  src: path.join(__dirname, './scss'),
  dest: path.join(__dirname, '../public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['']
}));
app.use(express.static(path.join(__dirname, '../public')));

/* Routes */

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/new", (req, res) => {
  res.render("new_map");
});

app.get("/register", (req, res) => {
  res.render("register");
  /* insert table username email password */
});

app.post("/register", (req, res) => {
  console.log('REQ.BODY.USERNAME:', req.body.username);
  console.log('REQ.BODY.USERPASSWORD:', req.body.userpassword);

  let validLogin = req.body.












  res.redirect("/");
});


/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
