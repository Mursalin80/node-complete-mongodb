const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    // this.id = new ObjectId(id);
  }

  save() {
    const db = getDb();

    return db
      .collection("products")
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static updateDocu(id, title, price, description, imageUrl) {
    const db = getDb();
    const ObId = new ObjectId(id);
    return db.collection("products").updateOne(
      { _id: ObId },
      {
        $set: {
          title: title,
          price: price,
          description: description,
          imageUrl: imageUrl
        }
      }
    );
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(products => {
        // console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new ObjectId(id) })
      .next()
      .then(prod => {
        // console.log("Find Product", prod);
        return prod;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then(del => {
        // console.log("Producted deleted. ", del.result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
