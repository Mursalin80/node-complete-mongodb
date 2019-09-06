const Product = require("../models/Product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    req.user._id
  );
  product
    .save()
    .then(() => {
      // console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getEditProduct = (req, res, next) => {
  let editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  let prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        path: "admin/edit-product",
        pageTitle: "Add Product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postEditProduct = (req, res, next) => {
  const { title, price, description, imageUrl, productId } = req.body;
  Product.updateDocu(productId, title, price, description, imageUrl)
    .then(prod => {
      res.redirect("/admin/products");
      // console.log("Product updated.", prod);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(prod => {
      res.render("admin/products", {
        products: prod,
        path: "admin/products",
        pageTitle: "All Products"
      });
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.postDeleteProduct = (req, res, next) => {
  const prodID = req.body.productId;
  Product.deleteById(prodID)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};
