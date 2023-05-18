const { render } = require("ejs");
const e = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const shopModel = require("../models/shopModel");
const util = require("util");

// render home
const renderHomePage = async (req, res) => {
  let information = await shopModel.getShopPageInfo();
  res.render("pages/home", { data: information });
};
const renderShipInfoPage = async (req, res) => {
  let profile = await shopModel.getShopPageInfo();
  res.render("pages/shipInfo", { data: profile });
};
// render product
const renderProductPage = async (req, res) => {
  let id = req.params.id;
  let category = req.params.category;
  let information = await shopModel.getShopProfile();
  let product = await shopModel.getProductWithId(id, category);
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
  let profile = await shopModel.getShopPageInfo();
  res.render("pages/about", { data: profile });
};

// Render login page
const renderLoginPage = async (req, res) => {
  let profile = await shopModel.getShopPageInfo();
  res.render("pages/login", { data: profile });
};

// Render Shopping Cart Page
const renderShoppingCartPage = async (req, res) => {
  let profile = await shopModel.getShopPageInfo();
  res.render("pages/shopcart", { data: profile });
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
  console.log(req.body);
  let ObjProduct = req.body;
  ObjProduct.pathImage = pathImage;

  let productName = ObjProduct.productName;
  let productPrice = ObjProduct.productPrice;
  let productCategory = ObjProduct.productCategory;
  let productImages = ObjProduct.pathImage;
  let productDescription = ObjProduct.productDescription;
  let productStatus = ObjProduct.productStatus;
  let productSize = ObjProduct.productSize;
  let productColor = ObjProduct.productColor;

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
      productStatus,
      productSize,
      productColor
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
      productStatus,
      productSize,
      productColor
    );
    console.log(ObjProduct);
    res.redirect("/home");
  }
};

// Send Email in ShipPage
const handleSendMailShipPage = async (req, res) => {
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

  let userName = req.body.userName;
  let userEmail = req.body.userEmail;

  let userNumber = req.body.userNumber;
  let userAddress = req.body.userAddress;

  console.log(req.body);
  let t = JSON.stringify(req.body);
  if (
    userName != null &&
    userEmail != null &&
    userNumber != null &&
    userAddress != null
  ) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pinkocdev@gmail.com", // replace with your email address
        pass: "ezljqflvqsrjvfhy", // replace with your password
      },
    });

    // html form
    let renderProductHtml = "";

    for (let i = 0; i < req.body.data_product.length; i++) {
      renderProductHtml =
        renderProductHtml +
        `<tr>
      <td>${req.body.data_product[i].item.productName}</td>
      <td>${req.body.data_product[i].productQuantity}</td>
      <td>${req.body.data_product[i].item.productPrice}</td>
    </tr>`;
    }

    let formatTotal = req.body.formatTotal;

    // setup email data
    let mailOptions = {
      from: "pinkocdev@gmail.com", // replace with your email address
      to: `${userEmail}`,
      subject: "PINKOC!! BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG",
      html: `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Xác nhận đặt hàng thành công</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
            }
      
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 5px;
              box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            }
      
            h1 {
              color: #333333;
              font-size: 24px;
              margin-top: 0;
            }
      
            p {
              color: #666666;
              font-size: 16px;
              margin-bottom: 20px;
            }
      
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
      
            .product {
              border-collapse: collapse;
              width: 100%;
            }
      
            .product th,
            .product td {
              padding: 10px;
              text-align: left;
            }
      
            .product th {
              background-color: #f2f2f2;
              color: #333333;
            }
      
            .total {
              font-weight: bold;
            }
      
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #999999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="/assets/icon/pinkoc.png" alt="Logo" />
            </div>
            <h1>Xác nhận đặt hàng thành công</h1>
            <p>Xin chào ${userName},</p>
            <p>Cảm ơn bạn đã đặt hàng. Dưới đây là chi tiết đơn hàng của bạn:</p>
      
            <table class="product">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                </tr>
              </thead>
              <tbody>
                ${renderProductHtml}
                <!-- Thay đổi đoạn mã này cho từng sản phẩm trong đơn hàng của bạn -->
              </tbody>
              <tfoot>
                <tr>
                  <td class="total">Tổng tiền: ${formatTotal}</td>
                </tr>
              </tfoot>
            </table>
      
            <p>
              Cảm ơn bạn đã mua hàng từ chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, xin
              vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây:
              ${0911734814}
            </p>
          </div>
        </body>
      </html>
      `,
    };

    // send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send({ status: false, data: "Something went wrong" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send({ status: true, data: "Email sent successfully" });
      }
    });
  } else {
    res.send({
      status: false,
      data: "Kiểm tra lại phần nhập, không được để rỗng ",
    });
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
  renderShipInfoPage,
  renderHomePage,
  renderProductPage,
  renderAboutPage,
  renderLoginPage,
  renderShoppingCartPage,
  handleUpload,
  handleTest,
  handlePostTest,
  handleAdminAccount,
  handleSendMailShipPage,
};
