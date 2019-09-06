const Products = require("../models/product");
//const Cart = require("../models/Cart");

module.exports.getProduct = (req, res, next) => {
  Products.fetchAll()
    .then(prod => {
      res.render("shop/product-list", {
        products: prod,
        path: "products",
        pageTitle: "Shop"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getIndex = (req, res, next) => {
  Products.fetchAll()
    .then(prod => {
      res.render("shop/index", {
        products: prod,
        path: "products",
        pageTitle: "Shop"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getProductDetail = (req, res, next) => {
  let id = req.params.id;
  Products.findById(id)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "product"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cartProducts => {
      console.log("Cart Products : ", cartProducts);
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "cart",
        cart: cartProducts
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postCart = (req, res, next) => {
  proId = req.body.productId;
  Products.findById(proId).then(product => {
    return req.user.addToCart(product).then(result => {
      res.redirect("/cart");
    });
  });
};

module.exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log("Id: ", prodId);
  req.user
    .deleteItemFromCart(prodId)
    .then(result => {
      res.redirect("/cart");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postOrder = (req, res, next) => {
  req.user.addOrder().then(result => {
    res.redirect("/orders");
  });
};

module.exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "orders",
        orders: orders
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", { pageTitle: "Checkout", path: "checkout" });
};
