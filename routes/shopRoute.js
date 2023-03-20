const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/home", shopController.shopInformation);
router.post("/home", shopController.handleUpload);
router.get("/login", shopController.renderLoginPage);
router.get("/my-form-handler", shopController.handleTest);
router.post("/my-form-handler", shopController.handleAdminAccount);
module.exports = router;
