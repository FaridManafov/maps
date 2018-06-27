const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/public/'));
app.set("view engine", "ejs");


/* Routes */

app.get("/", (req, res) => {
  res.render("index");
});


/* Start */

app.listen(PORT, () => {
  console.log(` => * Maps server listening on port ${PORT} *`);
});
