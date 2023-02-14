$("header").load("components/header.html");
$("footer").load("components/footer.html");
$(window).on("load", function () {
  $("body").css("opacity", "1");

  let offset = screen.width > 768 ? 200 : 0;
  new WOW({ offset: offset, scrollContainer: null }).init();

  if (window.location.href.includes("about")) {
    $('a[href="about.html"]').addClass("active");
  } else {
    $(".linkTo").click(function (e) {
      e.preventDefault();
      // $("header .collapse.show").removeClass("show");
      triggerBtnNMobile();
      const url = $(this).attr("href");
      const header = $("header").height();
      if (!url.includes("html") && !window.location.href.includes("contact")) {
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

function triggerBtnNMobile() {
  $(".header_mobile").trigger("click");
}

function headerAltMobile(btn) {
  const scroll = $(window).scrollTop();
  const header = $("header");

  $(btn).toggleClass("header_mobile_show");
  if ($(btn).hasClass("header_mobile_show")) {
    $("html").css({ overflow: "hidden" });
    $("header").addClass("nav-down");
    $("#collapse_backdrop").addClass("show");
  } else {
    $("html").removeAttr("style");
    $("#collapse_backdrop").removeClass("show");
    if (scroll < header.height()) {
      $("header").removeClass("nav-down");
    }
  }
}

/*---------------------------------Market-Section-----------------------------------*/

function MarketAnimation(containers) {
  const scroll = $(window).scrollTop() + $(window).height() / 2;
  const paddingParent = 270; // 100 paddingTop + 170 height half sections

  if (
    scroll > containers.parent.offsetTop + paddingParent &&
    scroll <
      containers.parent.height + containers.parent.offsetTop - paddingParent
  ) {
    if (
      scroll > containers.item1.offsetTop &&
      scroll < containers.item2.offsetTop
    ) {
      $("#scrollItem1")
        .removeAttr("style")
        .addClass("show")
        .siblings()
        .removeClass("show");
      $(`#scrollItem1 .animated`).addClass("slideInUp");
      $("#scrollItem1").siblings().find(".animated").removeClass("slideInUp");
    } else if (
      scroll > containers.item2.offsetTop &&
      scroll < containers.item3.offsetTop
    ) {
      $(`#scrollItem2 .animated`).addClass("slideInUp");
      $("#scrollItem2").addClass("show").siblings().removeClass("show");
      $("#scrollItem2").siblings().find(".animated").removeClass("slideInUp");
    } else if (
      scroll > containers.item3.offsetTop &&
      scroll < containers.parent.height + containers.parent.offsetTop
    ) {
      $("#scrollItem3")
        .removeAttr("style")
        .addClass("show")
        .siblings()
        .removeClass("show");
      $(`#scrollItem3 .animated`).addClass("slideInUp");
      $("#scrollItem3").siblings().find(".animated").removeClass("slideInUp");
    }
  } else {
    $(`${containers.parent.id} .show`).removeClass("show");
    if (scroll > containers.parent.offsetTop + containers.parent.height / 2) {
      $("#scrollItem3")
        .css({
          position: "relative",
          visibility: "visible",
        })
        .addClass("slideInUp")
        .siblings()
        .removeAttr("style");
    } else {
      $("#scrollItem1")
        .css({
          position: "relative",
          visibility: "visible",
        })
        .addClass("slideInUp")
        .siblings()
        .removeAttr("style");
    }
  }
}

/*-------------------------------sections-by-scroll----------------------------------*/

const containers = {
  parent: {
    id: "#market",
    height: $("#market").height() + 200, //paddings
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
  if (screen.width > 991.98) {
    MarketAnimation(containers);
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
    "https://prod.infocasas.com.uy/?mid=proyectos&func=contactobricks",
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
    nombre: form.firstname.value,
    empresa: form.empresa.value,
    email: form.email.value,
    extra: form.consult.value,
    // telefono: form.phone.value,
    // tel: form.phone.value,
    source: 2,
    utm_source: "web",
    utm_medium: "bricks",
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
