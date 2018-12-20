const db = require ('../db');
const bcrypt = require ('bcrypt');
const saltRounds = 10;

exports.signUp = function signUp (req, res, next) {
  console.log (req.body.email);

  const text = 'SELECT email FROM users WHERE email= $1';
  const values = [req.body.email];
  // callback
  db
    .query (text, values)
    .then (
      function (result) {
        console.log ('Prom-1');
        if (result.rowCount > 0) {
          console.log ('Account already exists');
          res.send ('Account already exists');
        } else {
          console.log ('Account does not exist');
          return bcrypt.hash (req.body.password, saltRounds);
        }
      },
      function (err) {
        console.log (err);
        res.send ('error happend');
      }
    )
    .then (
      function (hash) {
        // Store hash in your password DB.
        console.log ('Hash calculated');
        const text =
          'INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *';
        const values = [req.body.name, req.body.email, hash];
        return db.query (text, values);
      },
      function (err) {}
    )
    .then (
      function (result) {
        console.log (result);
        res.send ('Account created');
      },
      function (err) {
        res.send ('Error occured in Account creation');
      }
    );
};
exports.signIn = function (req, res) {
  // when user login set the key to redis.
  req.session.key = req.body.email;
  res.end ('done');
};
