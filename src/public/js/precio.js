$("#org").change(function () {
  var rate;

  switch ($("#org").val()) {
    case "Soyapango":
      rate = 159;

      break;

    case "2":
      rate = 169;

      break;

    case "3":
      rate = 159;

      break;
    case "4":
      rate = 189;

      break;

    default:
      rate = 199;
  }

    $("#precio").text(rate); //val(rate);
});
