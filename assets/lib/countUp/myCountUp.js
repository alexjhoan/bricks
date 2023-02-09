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

function counter() {
  const container = '#success'
  const heightTop = $(container).offset().top;
  const scroll = $(window).scrollTop();
  const heightWindow = $(window).height() / 2 + 100 ;

  if (scroll > heightTop - heightWindow) {
    counterUp(container, 50)
  }
}


$(window).on("scroll", function () {
  counter()
});

