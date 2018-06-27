const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const nodeSassMiddleware = require('node-sass-middleware');

app.use(express.static(__dirname + '/public/'));
app.set("view engine", "ejs");

app.use(nodeSassMiddleware({
    src: path.join(__dirname, './server/scss'),
    dest: path.join(__dirname, '../public/styles'),
    debug: true,
    outputStyle: 'compressed'
}));

/* Routes */

app.get("/", (req, res) => {
  res.render("index");
});


/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
