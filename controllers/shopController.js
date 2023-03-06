const multer = require("multer");
const path = require("path");
const shopModel = require("../models/shopModel");

const shopInformation = (req, res) => {
  shopModel.getShopPageInfo((information) => {
    res.render("pages/home", { data: information });
  });
};

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

const handleUpload = (req, res) => {
  upload.single("image")(req, res, (err) => {
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

    shopModel.addNewProduct(
      productName,
      productPrice,
      productCategory,
      productImages,
      productDescription,
      productStatus,
      (text) => {
        console.log(text);
      }
    );

    console.log(ObjProduct);
    res.redirect("/home");
  });
};

module.exports = {
  shopInformation,
  handleUpload,
};
