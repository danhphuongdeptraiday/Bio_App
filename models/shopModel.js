const database = require("../database/database");

const getShopPageInfo = (callback) => {
  let categories;
  database.db.all("select * from categories", [], (err, row) => {
    if (err) {
      console.log(err);
    }
    categories = row;
  });

  let products;
  database.db.all("select * from products", [], (err, row) => {
    if (err) {
      console.log(err);
    }
    products = row;
  });

  let sql = "select * from ShopPage";
  let profile;
  database.db.all(sql, [], (err, row) => {
    if (err) {
      console.log(err);
    }
    profile = row;

    let allInformation = {
      profile: profile,
      allProducts: products,
      categories: categories,
    };
    console.log(allInformation);
    console.log();
    console.log();
    console.log();
    callback(allInformation);
  });
};

module.exports = {
  getShopPageInfo,
  // getProducts,
};
