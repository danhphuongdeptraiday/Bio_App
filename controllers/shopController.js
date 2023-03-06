const multer = require("multer");
const path = require("path");
const shopModel = require("../models/shopModel");

const shopInformation = (req, res) => {
  let t = shopModel.getShopPageInfo((information) => {
    res.render("pages/home", { data: information });
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${file.originalname}`);
    },
  }),
});
const handlePostImage = (res, req) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("File upload error");
    }
    console.log(req.file);
    res.send("File uploaded successfully");
  });
};

module.exports = {
  shopInformation,
  handleUpload: (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("File upload error");
      }
      console.log(req.file);
      res.redirect("/home");
    });
  },
};
