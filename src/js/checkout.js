$(document).ready(function () {
  // Kode JavaScript sebelumnya di sini

  // Tombol Checkout
  $("#checkoutBtn").on("click", function () {
    $("#checkoutForm").addClass("active");

    // Tampilkan detail pesanan pada formulir checkout
    $("#orderDetails").empty();
    $(".product").each(function (index) {
      var productName = $(this).find(".cartPrice h6").text();
      var productQuantity = $(this).find(".price-value").val();
      var productPrice = $(this).find(".cartPrice p").text();

      var listItem = `<li>${productName} x ${productQuantity} (${productPrice})</li>`;
      $("#orderDetails").append(listItem);
    });
  });

  // Tombol Tutup Formulir Checkout
  $("#closeCheckout").on("click", function () {
    $("#checkoutForm").addClass("d-none");
    $("#order").removeClass("d-none");
  });

  // Fungsi lainnya di sini
});
