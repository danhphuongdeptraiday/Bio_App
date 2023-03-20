const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shopController");

router.get("/home", shopController.shopInformation);
// router.post("/home", shopController.handleUpload);
// router.get("/upload", shopController.showUploadForm);
router.post("/home", shopController.handleUpload);
// router.get("/upload", shopController.handleTest);
router.get("/my-form-handler", shopController.handleTest);
// router.post("/my-form-handler", shopController.handleUpload);
router.post("/adminAccount", shopController.handleAdminAccount);
module.exports = router;
