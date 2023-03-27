let formLogin = document.querySelector(".adminForm form");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  const form = new FormData(formLogin);

  fetch("/my-form-handler", {
    method: "POST",
    body: form,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status) {
        localStorage.setItem("status", data.status);
        console.log(data.home);
        window.location.href = `/home`;
      } else {
        alert(`${data.notification}`);
      }
    })
    .then((err) => console.log(err));
});
