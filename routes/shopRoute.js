const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

// Home
router.get("/home", shopController.renderHomePage);
router.post("/home", shopController.handleUpload);

// Prodct
router.get("/product", shopController.renderProductPage);

router.get("/login", shopController.renderLoginPage);
router.get("/my-form-handler", shopController.handleTest);
router.post("/my-form-handler", shopController.handleAdminAccount);
module.exports = router;
