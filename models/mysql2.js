// Use Product.js , where sequelize module use for mysql, to make thiks easy
// This module for illustration how to use mysql2

const db = require("../util/database");
const Cart = require("./Cart");

module.exports = class Product {
  constructor(id, title, img, desc, price) {
    this.id = id;
    this.title = title;
    this.image = img;
    this.description = desc;
    this.price = price;
  }

  save() {
    return db.execute(
      "INSERT INTO products (title,image,description,price) VALUES (?,?,?,?)",
      [this.title, this.image, this.description, this.price]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }

  static deleteById(id) {}
};
