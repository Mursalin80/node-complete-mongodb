const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

mongoClient = mongodb.MongoClient;

const client = new mongoClient("mongodb://localhost:27017");
client.connect(err => {
  console.log(err);
  let db = client.db("shop");
  db.collection("users")
    .findOne({ _id: new ObjectId("5d6fe79269e41a3df4f6f2ec") })
    .then(user => {
      console.log("User : ", user);
    })
    .catch(err => console.log(err));
});
