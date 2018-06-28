knex('users')
  .where({ username: username })
  .then((data) => {
    if (data.length <= 0) {
      res.redirect("/register");
      return;
    } else {
      if (bcrypt.compareSync(req.body.userpassword, data[0].password)) {
        knex('user')
      }
    }
  });
