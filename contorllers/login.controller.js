const jwt = require('jsonwebtoken');
const users = require('./../database/users');

module.exports = {
  getToken (req, res) {    
    let user;
    users.filter((row) => {
      if (row.username === req.query.username && row.password === req.query.password ) {
        user = row;
      }
    })
    if (user) {

      jwt.sign({ user }, 'secretkey', (err, token) => {
        res.send({
          token
        })
      })
    } else {
      res.status(403)
      res.send('fail login')
    }
  }
};
