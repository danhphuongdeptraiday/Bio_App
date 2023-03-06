const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./database/shop.db", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to database successful");
});

module.exports = {
  db,
};
