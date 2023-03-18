const e = require("express");
const multer = require("multer");
const path = require("path");
const shopModel = require("../models/shopModel");

//
const shopInformation = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  console.log(information);
  res.render("pages/home", { data: information });
};

//
const checkExistedCategory = async (category) => {
  let instanceCategories = await shopModel.getCategories();
  let check = false;
  for (let i = 0; i < instanceCategories.length; i++) {
    if (category == instanceCategories[i].type) {
      check = true;
    }
  }
  return check;
};

//
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/assets/Products/");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
});

//
const handleUpload = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("File upload error");
    }
    let pathImage = `/assets/Products/${req.file.filename}`;
    let ObjProduct = req.body;
    ObjProduct.pathImage = pathImage;

    let productName = ObjProduct.productName;
    let productPrice = ObjProduct.productPrice;
    let productCategory = ObjProduct.productCategory;
    let productImages = ObjProduct.pathImage;
    let productDescription = ObjProduct.productDescription;
    let productStatus = ObjProduct.productStatus;

    let checkCategory = await checkExistedCategory(productCategory);
    console.log(checkCategory);
    if (checkCategory == true) {
      let categoryID = await shopModel.getCategoryID(productCategory);
      console.log(categoryID);
      await shopModel.addNewProduct(
        productName,
        productPrice,
        categoryID,
        productImages,
        productDescription,
        productStatus
      );
      res.redirect("/home");
    } else {
      await shopModel.setNewCategories(productCategory);
      let categoryID = await shopModel.getCategoryID(productCategory);
      console.log(categoryID);
      await shopModel.addNewProduct(
        productName,
        productPrice,
        categoryID,
        productImages,
        productDescription,
        productStatus
      );
      res.redirect("/home");
    }
  });
};

const handleTest = async (req, res) => {
  let test = await shopModel.test();
  console.log(test);
  res.render("pages/uploadsPage", { testValue: test });
};

module.exports = {
  shopInformation,
  handleUpload,
  handleTest,
};
