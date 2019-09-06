let express = require("express");
let path = require("path");
let rootPath = require("../util/rootPath");

let router = express.Router();

// get product controller
const {
  getProduct,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductDetail,
  postCart,
  postCartDeleteItem,
  postOrder
} = require("../controllers/shop");

router.get("/", getIndex); // use controller in router

router.get("/products", getProduct);
router.get("/products/:id", getProductDetail);

router.get("/cart", getCart);
router.post("/cart", postCart);
router.post("/cart-delete-item", postCartDeleteItem);

router.get("/orders", getOrders);
router.post("/create-order", postOrder);
// router.get("/checkout", getCheckout);

module.exports = router;
