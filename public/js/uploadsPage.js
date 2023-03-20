$(document).ready(function () {
  $("#formData").submit(function (e) {
    e.preventDefault(); // prevent default form submit behavior
    const formData = $(this).serialize(); // serialize form data
    $.ajax({
      url: "/my-form-handler",
      type: "POST",
      data: formData,
      success: function (response) {
        $("#response").html(JSON.stringify(response));
      },
    });
  });
});
