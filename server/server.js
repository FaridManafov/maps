const express = require('express');
const PORT = 3000;
const path = require('path');
const bodyParser = require("body-parser");
const nodeSassMiddleware = require('node-sass-middleware');
const app = express();

// const settings = require('./knexfile.js')
// const knex = require('knex')(settings.development);

app.set("view engine", "ejs");

app.use(nodeSassMiddleware({
  src: path.join(__dirname, './scss'),
  dest: path.join(__dirname, '../public'),
  debug: true,
  outputStyle: 'compressed'
}));

app.use(bodyParser.urlencoded({extended: true}));

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
});

app.post("/register", (req, res) => {
  console.log('REQ.BODY.USEREMAIL:', req.body.useremail);
  console.log('REQ.BODY.USERPASSWORD:', req.body.userpassword);
  res.redirect("/");
});

/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
