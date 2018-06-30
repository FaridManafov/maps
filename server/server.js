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
  keys: ['random']
}));

/* Routes */
app.get("/", (req, res) => {
  let templateVars = { user:
     { userName: req.session.username,
       loggedIn: req.session.logged_in }
  };
  res.render("index", templateVars);
});

app.get("/404", (req, res) => {
  let templateVars = { user:
     { userName: req.session.username,
       loggedIn: req.session.logged_in }
  };
  res.render("error", templateVars)
});

app.get("/new", (req, res) => {
  let templateVars = { user:
     { userName: req.session.username,
       loggedIn: req.session.logged_in }
  };
  res.render("new_map", templateVars);
});

app.get("/register", (req, res) => {
  let templateVars = { user:
     { userName: req.session.username,
       loggedIn: req.session.logged_in }
  };
  res.render("register", templateVars);
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
    .returning('id')
    .then((id) => {
      req.session.user_id = id;
      req.session.username = username;
      req.session.logged_in = true;
      res.redirect("/new");
    })
    .catch((error) => {
      res.redirect("/register")
    })
});

app.get('/login', (req, res) => {
  let templateVars = { user:
     { userName: req.session.username,
       loggedIn: req.session.logged_in }
  };
  res.render('login', templateVars);
})

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.userpassword;

  knex('users')
  .where({ username: username })
  .then((data) => {
    console.log(data[0]);
    if (data.length <= 0) {
      res.redirect("/register");
      return;
    } else {
      if (bcrypt.compareSync(password, data[0].password)) {
        let salt = bcrypt.genSaltSync(10);
        req.session.user_id = data[0].id;
        req.session.username = data[0].username;
        req.session.logged_in = true;
        console.log('successful login ' + req.body);
        res.redirect("/")
      } else {
        res.redirect('login');
      }
    }
  });
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
})

app.get('/users/id', (req, res) => {
  let templateVars =
      { user:
           { userName: req.session.username,
             loggedIn: req.session.logged_in }
      }
  res.render('profile', templateVars);
})

app.get('/maps/id', (req, res) => {
  res.render('display_map');
})

app.post('/maps', (req, res) => {
  let mapName = req.body.name;
  let user = req.session.user_id;

  knex('maps')
  .insert({ mapname: mapName, created_by: user  })
  .returning('id')
  .then((id) => {
    res.json({
      id: id[0]
    })
  })
})

app.get('/maps/:id', (req, res) => {
  let map = req.params.id;
  knex('maps')
  .where({ id: map })
  .then((rows) => {
    let map = rows[0];
    console.log(rows, map);
    knex('markers')
    .where({ map_id: map.id })
    .then((markers) => {
      let templateVars =
      { user:
           { userName: req.session.username,
             loggedIn: req.session.logged_in },

        map: {
          name: map.mapname,
          id: map.id,
          createdBy: map.created_by,
          markers: markers
        }
      }
      res.render('display_map', templateVars);
    })
  })
})

app.post('/markers', (req, res) => {
  console.log(req.body);
  let map = req.body.mapId;
  let lat = req.body.markerLat;
  let long = req.body.markerLng;

  knex('markers')
  .insert({ map_id: map, latitude: lat, longitude: long })
  .then((marker) => {
    console.log(marker)
    res.sendStatus(200)
  })
})

app.post('/favorites', (req, res) => {
  knex('favorites')
  .insert( { map_id: req.body.mapId, user_id: req.session.user_id })
  .then((favorite) => {
    res.sendStatus(200);
  })
})

app.get('/users/:id', (req, res) => {
  let user = req.params.id;
  knex('users')
  .where({ id: user })
  .then((row) => {
    let info = {
      name: '',
      maps: [],
      favorites: []
    };
    info.name = row[0].username;
    knex('favorites')
    .where({ user_id: user })
    .then((row) => {
      let favoriteMap = row[0].map_id;
      knex('maps')
      .where({ id: favoriteMap})
      .then((row) => {
        info.favorites.push([favoriteMap, row[0].mapname])
        knex('maps')
        .where({ created_by: user })
        .then((row) => {
          info.maps.push([row[0].id, row[0].mapname])
          let templateVars = {
            data: {
              profile: info.name,
              profileMaps: info.maps,
              profileFavorites: info.favorites
            },
            user: {
              userName: req.session.username,
              loggedIn: req.session.logged_in
            }
          }
          res.render('profile', templateVars);
        })
      })
    })
  })
})

/* Start */
app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
