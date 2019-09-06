// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "node-complete"
// });

// module.exports = pool.promise();

// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "", {
//   dialect: "mysql",
//   host: "localhost"
// });

// module.exports = sequelize;

const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    // "mongodb://mursalin:m401009@ds239157.mlab.com:39157/node-complete"    ( mlab )
    // "mongodb+srv://root:401009@cluster1-qji8t.mongodb.net/test?retryWrites=true&w=majority",  (mongodb)

    "mongodb://localhost:27017", //(localhost)
    { useNewUrlParser: true }
  )
    .then(client => {
      console.log("Connected to MongoDB!");
      _db = client.db("shop");
      callback();
    })
    .catch(err => {
      console.log(err);
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
