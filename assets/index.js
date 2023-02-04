$(window).on("load", function () {
  $("body").css("opacity", "1");
  if (window.location.href.includes("about")) {
    $('a[href="about.html"]').addClass("active");
  } else {
    $(".linkTo").click(function (e) {
      e.preventDefault();
      $("header .collapse.show").removeClass("show");
      const url = $(this).attr("href");
      const header = $("header").height();
      if (!url.includes("html")) {
        const section = $(url.slice(1)).offset().top;
        window.scrollTo({ top: section - header, behavior: "smooth" });
      } else {
        window.location = url;
      }
    });
  }
});

let offset;

if (screen.width > 768) {
  offset = 200;
} else {
  offset = 0;
}

new WOW({ offset: offset, scrollContainer: null }).init();

$("header").load("components/header.html");
$("footer").load("components/footer.html");

/*---------------------------------Header------------------------------------*/

$(window).on("scroll", function () {
  const scroll = $(window).scrollTop();
  const header = $("header");
  if (scroll > header.height()) {
    header.addClass("nav-down");
  } else {
    header.removeClass("nav-down");
  }
});

/*-------------------------------Market Grid----------------------------------*/
if (screen.width < 992) {
  $(".marketing_grid").addClass("swiper");
  $(".sgrid").addClass("swiper-wrapper");
  $(".marketing_grid .sgrid .item").addClass("swiper-slide");
  const mymarket = new Swiper(".marketing_grid", {
    spaceBetween: 5,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
        centeredSlides: true,
      },
      475: {
        slidesPerView: 2,
        spaceBetween: 5,
        centeredSlides: true,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 5,
        centeredSlides: true,
      },
    },
  });
}
/*------------------------------Bussines----------------------------------*/

function seeMore() {
  let visibleItems = $("#customers .item:visible").length + ImgMore;
  $("#customers .item:lt(" + visibleItems + ")").fadeIn(800);
  if (visibleItems >= items) {
    $(".btnMore").hide();
  }
}
/*------------------------------Form-----------------------------*/

function dataSubmited(data) {
  const requestOptions = {
    method: "POST",
    body: data,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };
  fetch(
    "https://www.infocasas.com.uy?mid=formulario&func=ajax_save&json=1",
    requestOptions
  )
    .then((json) => {
      setTimeout(() => {
        if (json.status === 200) {
          $("#formSuccess").fadeIn();
        } else {
          $("#formError").fadeIn();
        }
        $("#formSending").hide();
      }, 2000);
    })
    .catch((error) => {
      console.log("error", error);
      setTimeout(() => {
        $("#formSending").hide();
        $("#formError").fadeIn();
      }, 100);
    });
}

function submited() {
  const form = document.querySelector("#contactForm");
  const data = JSON.stringify({
    nombre: form.name.value,
    apellido: "",
    email: form.email.value,
    telefono: form.phone.value,
    tel: form.phone.value,
    source: 2,
    utm_source: "web_cliente",
    utm_medium: "continents",
    extra: form.consult.value,
    IDpais: 1,
    IDform: 447,
  });
  event.preventDefault();
  if (!form.checkValidity()) {
    event.stopPropagation();
  } else {
    dataSubmited(data);
    setTimeout(() => {
      $(form).fadeOut();
      $("#formSending").fadeIn();
    }, 300);
  }
  form.classList.add("was-validated");
}

let maxHeight = function (elems) {
  return Math.max.apply(
    null,
    elems
      .map(function () {
        return $(this).height();
      })
      .get()
  );
};
if (screen.width > 992) {
  let maxHeightTitle = maxHeight($("#marketing .item .item_content"));
  $("#marketing .item .item_content").css("height", +maxHeightTitle + "px");
}
