const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database('./database/mydb.db');

module.exports = {
  getToken (req, res) {
    let users = [];
    // gety users from db
    db.get(`SELECT * FROM users`, (err, dbUsers) => {
      if (err) {
        console.error(err.message);
      }
      db.serialize(() => {
        db.each(`SELECT * FROM users`, (err, user) => {
          if (err) {
            console.error(err.message);
          }
          users.push(user);
        });
      let user;
      user = users.filter((row) => {
        if (row.username === req.query.username && row.password === req.query.password ) {
          user = row;
        }
      })
      if (user) {
        // send token
        jwt.sign({ user }, 'secretkey', (err, token) => {
          res.send({
            token
          })
        })
      } else {
        res.status(403)
        res.send('fail login')
      }
      });
    })
  }
};
