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
  let id = req.params.id;
  let category = req.params.category;
  let information = await shopModel.getShopProfile();
  let product = await shopModel.getProductWithId(id);
  let productOject = {
    productInformation: product[0],
    categoryName: category,
    profile: information,
  };
  console.log(productOject);
  res.render("pages/product", { data: productOject });
};

// Render about page
const renderAboutPage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/about", { data: information });
};

// Render login page
const renderLoginPage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/login", { data: information });
};

// Check category
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
    res.send({ data: "home", status: "true" });
    // res.send()
  } else {
    res.send({ notification: "wrong", status: false });
  }
};

// Hand upload product
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
  renderProductPage,
  renderAboutPage,
  renderLoginPage,
  handleUpload,
  handleTest,
  handlePostTest,
  handleAdminAccount,
};
