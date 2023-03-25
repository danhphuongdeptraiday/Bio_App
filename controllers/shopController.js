const { render } = require("ejs");
const e = require("express");
const multer = require("multer");
const path = require("path");
const shopModel = require("../models/shopModel");
const util = require("util");

// render home
const renderHomePage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/home", { data: information });
};

// render product
const renderProductPage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/product", { data: information });
};

const renderLoginPage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/login", { data: information });
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

// Handle Admin
const handleAdminAccount = async (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/assets/Products/");
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  }).any();
  const a = util.promisify(upload);
  await a(req, res);
  let username = req.body.username;
  let password = req.body.password;
  console.log(req.body);
  console.log("username = " + username);
  console.log("password = " + password);
  let accountFromDatabase = await shopModel.getAdminAccount();
  if (
    username == accountFromDatabase[0].username &&
    password == accountFromDatabase[0].password
  ) {
    // console.log("Dung r");
    res.send({ home: "home", status: true });
  } else {
    // console.log("Sai r");
    res.send({ notification: "wrong", status: false });
  }
};

const handleUpload = async (req, res) => {
  const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/assets/Products/");
      },
      filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
      },
    }),
  }).array("image");
  const a = util.promisify(upload);
  await a(req, res);
  let url = req.files.map((items) => {
    return `/assets/Products/${items.filename}`;
  });
  let pathImage = url;
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
    console.log(ObjProduct);
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
    console.log(ObjProduct);
    res.redirect("/home");
  }
};

const handleTest = async (req, res) => {
  res.render("pages/uploadsPage");
};

const handlePostTest = async (req, res) => {
  let categoryName = req.body.categoryName;
  console.log(req.body);
  await shopModel.setCategory(categoryName);
  let text = `You have created new ${categoryName}`;
  console.log(text);
  res.send(text);
};

module.exports = {
  renderHomePage,
  renderLoginPage,
  renderProductPage,
  handleUpload,
  handleTest,
  handlePostTest,
  handleAdminAccount,
};
