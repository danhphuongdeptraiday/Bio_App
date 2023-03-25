const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const shopRoute = require("./routes/shopRoute");
const multer = require("multer");
const port = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "public/assets/Products/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${file.originalname}`);
//     },
//   }),
//   limits: { fileSize: 1000000 },
// });
// app.use(
//   multer().fields([
//     { name: "image" },
//     { name: "productName" },
//     { name: "productPrice" },
//     { name: "productStatus" },
//     { name: "productDescription" },
//     { name: "productCategory" },
//   ])
// );

// app.use(multer().any());

app.use(shopRoute);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
