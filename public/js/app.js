fetch("http://localhost:3000/home", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
// .catch((err) => {
//   console.log(err);
// });
