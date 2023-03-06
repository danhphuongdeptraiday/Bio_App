const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/home", shopController.shopInformation);
// router.post("/home", shopController.handleUpload);
// router.get("/upload", shopController.showUploadForm);
router.post("/home", shopController.handleUpload);
module.exports = router;
