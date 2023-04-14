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

app.use(shopRoute);

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.listen(port, () => {
  console.log(`Listening at ${port}`);
});
