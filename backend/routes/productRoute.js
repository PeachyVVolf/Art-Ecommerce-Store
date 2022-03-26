const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router.route("/product/new").post(authorizeRoles("admin"), isAuthenticatedUser, createProduct);
router.route("/product/:id").put(authorizeRoles("admin"), isAuthenticatedUser, updateProduct).delete(authorizeRoles("admin"), isAuthenticatedUser, deleteProduct).get(getProductDetails);

module.exports = router;