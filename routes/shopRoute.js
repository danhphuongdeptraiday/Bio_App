const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

// Home
router.get("/home", shopController.renderHomePage);
router.post("/home", shopController.handleUpload);

// Product
router.get("/product/:category/:id", shopController.renderProductPage);

// About
router.get("/about", shopController.renderAboutPage);

// Ship Infor
router.get("/shipInfo", shopController.renderShipInfoPage);
router.post("/sendMail", shopController.handleSendMailShipPage);

// Login
router.get("/login", shopController.renderLoginPage);
router.post("/my-form-handler", shopController.handleAdminAccount);

// Shopping Cart
router.get("/shopCart", shopController.renderShoppingCartPage);
// router.get("/my-form-handler", shopController.handleTest);
module.exports = router;
