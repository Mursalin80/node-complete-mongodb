let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

// Admin controllers
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct
} = require("../controllers/admin");

let router = express.Router();

// use get add product controller
router.get("/add-product", getAddProduct);
router.post("/add-product", postAddProduct);

router.get("/products", getProducts);
router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

// // use post add product controller

module.exports.adminRouter = router;
