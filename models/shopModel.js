const Database = require("../database/database");
// const datastorage = require(localStorage.getItem('ProductHasBeenAddedToCart'));
// Get shop information
const getShopPageInfo = async () => {
  let allInformation = {
    categories: await getCategories(),
    profile: await getShopProfile(),
    allProducts: await getProducts(),
  };

  return allInformation;
};

// Get profile
let getShopProfile = async () => {
  const db = await Database();
  let shopPage = await db.all("select * from ShopPage");
  db.close();
  return shopPage;
};

// Get products
let getProducts = async () => {
  const db = await Database();
  let products = await db.all("select * from products");
  db.close();
  return products;
};

// Get each product
let getProductWithId = async (id, category) => {
  const db = await Database();
  let idCategory = await getCategoryID(category);
  console.log(idCategory);
  let product = await db.all(
    `Select * from products where id = ${id} and categoryID = ${idCategory}`
  );
  db.close();
  return product;
};

// Get categories
let getCategories = async () => {
  const db = await Database();
  let categories = await db.all("select * from categories");
  db.close();
  return categories;
};

// Get category ID
let getCategoryID = async (categoryName) => {
  const db = await Database();
  let cateID = await db.all(
    `Select id from categories where type = '${categoryName}'`
  );
  db.close();
  return cateID[0].id;
};

// Set new category

let setNewCategories = async (newCategory) => {
  const db = await Database();
  let instanceTypesCategories = await getCategories();
  let check = false;
  if (newCategory != null || newCategory != "") {
    for (let i = 0; i < instanceTypesCategories.length; i++) {
      if (instanceTypesCategories[i].type != newCategory) {
        check = true;
      } else {
        check = false;
      }
    }
  } else {
    return { text: "Invalid category. Please check again !" };
  }

  if (check) {
    await db.run(`insert into categories (type) values ('${newCategory}')`);
    db.close();
    return { text: "Successfully create new category !" };
  } else {
    return { text: "This category has been existed !" };
  }
};

let setCategory = async (newCategory) => {
  const db = await Database();
  await db.run(`insert into categories (type) values ('${newCategory}')`);
  db.close();
};

// add new product
const addNewProduct = async (
  productName,
  productPrice,
  productCategory,
  productImages,
  productDescription,
  productStatus,
  productSize,
  productColor
) => {
  let sql = `insert into Products (name, price, categoryID, listImage, description, status, size, color)
  values (
    '${productName}',
    '${productPrice}',
    '${productCategory}',
    '${productImages}',
    '${productDescription}',
    '${productStatus}',
    '${productSize}',
    '${productColor}')`;

  let db = await Database();
  await db.all(sql);
  db.close();
};

let getAdminAccount = async () => {
  let db = await Database();
  let account = db.all("select * from AdminAccount");
  db.close();
  return account;
};

module.exports = {
  getShopPageInfo,
  setNewCategories,
  setCategory,
  getCategories,
  getCategoryID,
  getShopProfile,
  getAdminAccount,
  getProductWithId,
  addNewProduct,
};
