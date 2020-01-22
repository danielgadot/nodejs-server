const booksCtrl = require('./books.controller');
const loginCtrl = require('./login.controller');
const statsCtrl = require('./stats.controller');
const errCtrl = require('./err404.controller');

module.exports = {
    booksCtrl,
    loginCtrl,
    statsCtrl,
    errCtrl
};
