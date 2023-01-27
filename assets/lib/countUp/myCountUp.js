function counterUp(container, delay) {
  const countDelay = delay || 250
  setTimeout(()=>{
    $(`${container} .counterUp`).each(function() {
    let $this = $(this),
    countTo = $this.attr('data-count');
      $({ countNum: $this.text()}).animate({
        countNum: countTo
      },
      {
        duration: 2000,
        easing:'easeOutExpo',
        step: function() {
          $this.text(Math.ceil(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum);
        }
      });
    });
  }, countDelay)
}

// $(window).on("scroll", function () {
//   let heightTop1 = $("#us").offset().top;
//   let heightTop2 = $("#projects").offset().top;
//   let heightTop3 = $("#us3").offset().top;
//   let scroll = $(window).scrollTop();
//   let heightWindow = $(window).height();
//   if (scroll > ((heightTop1 - heightWindow) + 200) && (scroll < (heightTop1 + heightWindow))) {
//     counterUp('#us')
//   } else if (scroll > ((heightTop2 - heightWindow) * 1.15 ) && (scroll < (heightTop2 + heightWindow))) {
//     counterUp('#projects', 1250)
//   }
// });
function counter() {
  let heightTop1 = $("#us").offset().top;
  let heightTop2 = $("#projects").offset().top;
  let heightTop3 = $("#us3").offset().top;

  let scroll = $(window).scrollTop();
  let heightWindow = $(window).height();
  if (scroll > ((heightTop1 - heightWindow) + 200) && (scroll < (heightTop1 + heightWindow))) {
    counterUp('#success')
  } else if (scroll > ((heightTop2 - heightWindow) * 1.15 ) && (scroll < (heightTop2 + heightWindow))) {
    counterUp('#projects', 1250)
  }

  if (scroll > ((heightTop3 - heightWindow) * 1.2) && (scroll < (heightTop3 + heightWindow))) {
    counterUp('#us3', 1500)
  }
}


$(window).on("scroll", function () {
  counter()
});

