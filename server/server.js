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

app.get("/404", (req, res) => {
  res.render("error")
});

app.get("/new", (req, res) => {
  res.render("new_map");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  let salt = bcrypt.genSaltSync(10);
  let username = req.body.username;
  let password = bcrypt.hashSync(req.body.password, salt);

  knex('users')
    .insert({
      username: username,
      password: password
    })
    .then((result) => {
      req.session.user_id = bcrypt.hashSync(username, salt)
      res.redirect("/new");
    })
    .catch((error) => {
      res.redirect("/register")
    })
});

app.get('/login', (req, res) => {
  res.render('login');
})

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.userpassword;

  knex('users')
  .where({ username: username })
  .then((data) => {
    console.log(data);
    if (data.length <= 0) {
      res.redirect("/register");
      return;
    } else {
      if (bcrypt.compareSync(password, data[0].password)) {
        let salt = bcrypt.genSaltSync(10);
        req.session.user_id = bcrypt.hashSync(username, salt);
        console.log('successful login ' + req.body.username);
        res.redirect("/")
      } else {
        res.redirect('login');
      }
    }
  });
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
})


/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
