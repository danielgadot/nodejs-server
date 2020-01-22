const MongoClient = require('mongodb').MongoClient;


MongoClient.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, client) {

  if(err) throw err;
  const db = client.db('daniel');
  const collection = db.collection('main');
  collection.find({username: 'daniel'}).toArray((err, items) => {
    console.log(items)
  })


});

module.exports = MongoClient;
