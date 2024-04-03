$(document).ready(function () {
  // Ganti background Navbar dan Border Bottom
  const navbarToggler = $(".navbar-toggler");
  const navbar = $("header");
  const nav = $("nav");
  const imgBrand = $(".navbar-brand img");

  navbarToggler.click(function () {
    navbar.toggleClass("bg-dark");
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
      nav.attr("data-bs-theme", "white");
      navbar.addClass(
        "bg-smooth-light-blur border-bottom border-dark shadow-sm"
      );
      imgBrand.removeClass("img-thumbnail");
    } else {
      nav.attr("data-bs-theme", "dark");
      navbar.removeClass("bg-smooth-light-blur border-bottom shadow-sm");
      imgBrand.addClass("img-thumbnail");
    }
  });

  // Underline Active
  let sections = $("section");
  let navLinks = $("header .navbar .nav-item a");

  $(window).scroll(function () {
    let scrollPosition = $(window).scrollTop();
    sections.each(function () {
      let offset = $(this).offset().top;
      let height = $(this).outerHeight();
      let id = $(this).attr("id");

      if (scrollPosition >= offset && scrollPosition < offset + height) {
        navLinks.removeClass("text-decoration-underline");
        let correspondingLink = $(
          "header .navbar .nav-item a[href='#" + id + "']"
        );
        if (correspondingLink.length) {
          correspondingLink.addClass("text-decoration-underline");
        }
      }
    });

    if (scrollPosition === 0) {
      navLinks.removeClass("text-decoration-underline");
    }
  });

  // Tombol kembali ke atas
  const scrollBtn = $("#btnTop");

  $(document).scroll(function () {
    if ($(document).scrollTop() <= 120) {
      scrollBtn.css("opacity", "0");
    } else {
      scrollBtn.css("opacity", "1");
    }
  });

  // Slide Pesanan button Function

  $(document).on("click", ".btnPesan", function () {
    $("#order").slideDown();
  });

  $("#closeOrder").click(function () {
    $("#order").slideUp();
  });

  $(".btnOrder").click(function () {
    $("#order").slideToggle();
  });

  // Menampilkan detail berdasarkan data nama menu dan data detail menu
  $(document).on("click", "#btn-detail", function () {
    let productName = $(this).closest(".card").find(".card-title h6").text();
    let komposisi = $(this).data("detail");
    $("#modal-ingredient #modal-title").text(productName);
    $("#modal-ingredient #komposisi").text(komposisi);
  });

  let totalHarga = 0;
  $("#total").text("Rp. " + totalHarga + ",00");

  $(document).on("click", ".btnPesan", function () {
    let productName = $(this).closest(".card").find(".card-title h6").text();
    let productPrice = $(this).closest(".card").find("p .price").text();

    let productImage = $(this)
      .closest(".card")
      .find(".card-images img")
      .attr("src");
    let productQuantity = $(this).closest(".card").find(".price-value").val();

    let productHTML = `
    <div class="product">
      <div class="d-flex align-items-center border-bottom border-black py-2">
        <img src="${productImage}" alt="" class="img-fluid d-block rounded">
        <div class="cartPrice mx-2">
          <h6 class="mb-1 fs-8">${productName}</h6>
          <p class="m-0 fs-8">Rp. <span class="price">${productPrice}</span>,00</p>
        </div>
        <div class="d-flex align-items-center gap-2 ms-auto">
          <input type="number" class="form-control form-control-sm bg-transparent border border-black price-value" min="1" value="${productQuantity}">
          <button type="button" class="btn btn-sm btn-danger px-1 py-0 btn-remove">
            <i class="bi bi-x"></i>
          </button>
        </div>
      </div>
    </div>`;

    $(".list-order").append(productHTML);
    updateTotalHarga();
  });

  $(document).on("click", ".btn-remove", function () {
    $(this).closest(".product").remove();
    updateTotalHarga();
  });

  $(document).on("input", ".price-value", function () {
    updateTotalHarga();
  });

  function updateTotalHarga() {
    let newTotalHarga = 0;
    $(".product").each(function () {
      let productPrice = parseInt(
        $(this).find(".price").text().replace(/\D/g, "")
      );
      let productQuantity = parseInt($(this).find(".price-value").val());
      newTotalHarga += productPrice * productQuantity;
    });

    $("#total").text("Rp. " + newTotalHarga.toLocaleString("id-ID") + ",00");
  }
});

// Card Merge Slide
const swiperCard = new Swiper(".swiper-content", {
  effect: "cards",
  grabCursor: false,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});

// Testimoni Card Slide
const swiperSlide = new Swiper(".testimoni-content", {
  grabCursor: false,
  spaceBetween: 25,
  loop: true,
  pagination: {
    el: ".testimoni-page",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    762: {
      slidesPerView: 2,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});
