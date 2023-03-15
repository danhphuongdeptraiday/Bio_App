const database = require("../database/database");

const getShopPageInfo = async (callback) => {
  let categories;
  await database.db.all("select * from categories", [], (err, row) => {
    if (err) {
      console.log(err);
    }
    categories = row;
  });

  let products;
  await database.db.all("select * from products", [], (err, row) => {
    if (err) {
      console.log(err);
    }
    products = row;
  });

  let sql = "select * from ShopPage";
  let profile;
  await database.db.all(sql, [], (err, row) => {
    if (err) {
      console.log(err);
    }
    profile = row;

    let allInformation = {
      categories: categories,
      profile: profile,
      allProducts: products,
    };
    console.log(allInformation);
    console.log();
    console.log();
    console.log();
    callback(allInformation);
  });
};

const addNewProduct = (
  productName,
  productPrice,
  productCategory,
  productImages,
  productDescription,
  productStatus,
  callback
) => {
  let sql = `insert into Products (name, price, categoryID, listImage, description, status)
  values (
    '${productName}', 
    '${productPrice}', 
    '${productCategory}', 
    '${productImages}', 
    '${productDescription}', 
    '${productStatus}')`;

  database.db.run(sql, [], (err, row) => {
    if (err) {
      console.log(err);
    }

    callback("ADD SUCCESSFULLY !!!!!!!!!");
  });
};

module.exports = {
  getShopPageInfo,
  addNewProduct,
};
