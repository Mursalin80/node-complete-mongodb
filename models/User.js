const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
class User {
  constructor(name, email, cart, id) {
    this.name = name;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProdIndex = this.cart.items.findIndex(prod => {
      return prod.productId.toString() === product._id.toString();
    });
    let newQua = 1;
    let updateCartItems = [...this.cart.items];
    if (cartProdIndex >= 0) {
      newQua = this.cart.items[cartProdIndex].quantity + 1;
      updateCartItems[cartProdIndex].quantity = newQua;
    } else {
      updateCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQua
      });
    }
    const updateCart = {
      items: updateCartItems
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
  }

  deleteItemFromCart(prodId) {
    const updateCartItems = this.cart.items.filter(item => {
      return item.productId.toString() !== prodId.toString();
    });
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updateCartItems } } }
      );
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: { _id: new ObjectId(this._id), name: this.name }
        };
        return db.collection("orders").insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        return db.collection("users").updateOne(
          {
            _id: new ObjectId(this._id)
          },
          { $set: { cart: { items: [] } } }
        );
      });
  }

  getOrders() {
    const db = getDb();
    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  getCart() {
    const db = getDb();
    const prodId = this.cart.items.map(i => i.productId);
    return db
      .collection("products")
      .find({ _id: { $in: prodId } })
      .toArray()
      .then(produsts => {
        return produsts.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then(user => {
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
