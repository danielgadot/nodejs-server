const booksCtrl = require('./books.controller');
const loginCtrl = require('./login.controller');
const statsCtrl = require('./stats.controller');
const errCtrl = require('./err404.controller');
const usersCtrl = require('./users.controller');
const tasksCtrl = require('./tasks.controller');
const usersSettingsCtrl = require('./user-settings.controller');

module.exports = {
    booksCtrl,
    loginCtrl,
    statsCtrl,
    errCtrl,
    usersCtrl,
    usersSettingsCtrl,
    tasksCtrl
};
