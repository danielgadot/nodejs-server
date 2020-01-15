const stats = require('./contorllers/stats.controller');
const controllers = require('./contorllers/controllers');

// include all controllers

module.exports = function(app) {
    app.get('/someRoute', stats.getStats);
    app.get('/books', controllers.booksCtrl.getBook);
    app.post('/books', controllers.booksCtrl.postBook);
};
