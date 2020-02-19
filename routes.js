const controllers = require('./contorllers/controllers');
const verifyToken = require('./verify-token');
const addHeaders = require('./add-headers');
const path = require('path');

// include all controllers
// add verifyToken
module.exports = function(app) {
    app.get('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')))
    app.post('/login', controllers.loginCtrl.getToken);
    app.get('/stats', verifyToken, controllers.statsCtrl.getStats);
    app.get('/userSettings/:id', controllers.usersSettingsCtrl.getSettings);
    app.get('/books', verifyToken, controllers.booksCtrl.getBook);
    app.post('/books', verifyToken, controllers.booksCtrl.postBook);
    app.post('/signup', verifyToken, controllers.usersCtrl.addUser);
    app.use(controllers.errCtrl.errOne)
    app.use(controllers.errCtrl.errTwo)
};


