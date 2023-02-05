$(window).on("load", function () {
  $("body").css("opacity", "1");

  let offset = screen.width > 768 ? 200 : 0;
  new WOW({ offset: offset, scrollContainer: null }).init();

  $("header").load("components/header.html");
  $("footer").load("components/footer.html");
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

  $("#btnGoToUp").click(function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /*------------------------------Bussines----------------------------------*/

  if (screen.width > 767.98) {
    const items = $("#customers .item").length;
    const imgInit = screen.width > 768 ? 12 : 4;
    const ImgMore = screen.width > 768 ? 12 : 4;
    $("#customers .item:lt(" + imgInit + ")").show();
    if (imgInit >= items) {
      $(".btnMore").hide();
    }
    $("#seeMore").click(function () {
      let visibleItems = $("#customers .item:visible").length + ImgMore;
      $("#customers .item:lt(" + visibleItems + ")").fadeIn(800);
      if (visibleItems >= items) {
        $(".btnMore").hide();
      }
    });
  }
});

/*---------------------------------Header------------------------------------*/

function headerAlt() {
  const scroll = $(window).scrollTop();
  const header = $("header");
  if (scroll > header.height()) {
    header.addClass("nav-down");
  } else {
    header.removeClass("nav-down");
  }
}

/*---------------------------------Market-Section-----------------------------------*/

function MarketAnimation(
  item,
  heightElem,
  offsetTop,
  parentHeight,
  parentOffsetTop
) {
  const scroll = $(window).scrollTop();
  const container = $(item);
  const heightWindow = $(window).height() / 2;
  parentHeight = parentHeight / 4;

  console.log(parentOffsetTop);
  console.log(parentHeight);
  if (
    scroll > offsetTop - heightWindow &&
    scroll < heightElem + offsetTop - heightWindow
  ) {
    container.addClass("show slideInUp");
    $(`${item} .animated`).addClass("slideInUp");
  } else {
    container.removeClass("show slideInUp");
    $(`${item} .animated`).removeClass("slideInUp");
    if (scroll > parentOffsetTop + parentHeight) {
      $("#scrollItem3").css({
        visibility: "visible",
        position: "relative",
      });
      $("#scrollItem1").removeAttr("style");
      console.log("abajo");
    } else {
      $("#scrollItem1").css({
        visibility: "visible",
        position: "relative",
      });
      $("#scrollItem3").removeAttr("style");
      console.log("arriba");
    }
  }
}

/*-------------------------------sections-by-scroll----------------------------------*/

const containers = {
  parent: {
    id: "#market",
    height: $("#market").height(),
    offsetTop: $("#market").offset().top,
  },
  item1: {
    id: "#scrollItem1",
    height: $("#scrollItem1").height(),
    offsetTop: $("#scrollItem1").offset().top,
  },
  item2: {
    id: "#scrollItem2",
    height: $("#scrollItem2").height(),
    offsetTop: $("#scrollItem2").offset().top,
  },
  item3: {
    id: "#scrollItem3",
    height: $("#scrollItem3").height(),
    offsetTop: $("#scrollItem3").offset().top,
  },
};

$(window).on("scroll", function () {
  headerAlt();
  MarketAnimation(
    containers.item1.id,
    containers.item1.height,
    containers.item1.offsetTop,
    containers.parent.height,
    containers.parent.offsetTop
  );
  MarketAnimation(
    containers.item2.id,
    containers.item2.height,
    containers.item2.offsetTop,
    containers.parent.height,
    containers.parent.offsetTop
  );
  MarketAnimation(
    containers.item3.id,
    containers.item3.height,
    containers.item3.offsetTop,
    containers.parent.height,
    containers.parent.offsetTop
  );
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
