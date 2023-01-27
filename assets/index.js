$(window).on('load', function () {
  $('body').css('opacity', '1');
});

let offset

if (screen.width > 768){
  offset = 200
} else {
  offset = 0
}

new WOW({offset:offset, scrollContainer: null}).init()

$('header').load('components/header.html')
$('footer').load('components/footer.html')

/*-------------------------------Market Grid----------------------------------*/
if (screen.width < 768) {
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
    },
  });
}
/*------------------------------Bussines----------------------------------*/
// $("#lightgallery").lightGallery();
// const items =  $('#lightgallery a').length;
const imgInit = 8
const ImgMore = 4
$('#lightgallery a:lt('+imgInit+')').show();
if(imgInit >= items) {
  $('.btnMore').hide()
}
function seeMore() {
  let visibleItems = $('#lightgallery a:visible').length + ImgMore
  $('#lightgallery a:lt('+visibleItems+')').fadeIn(800);
  if(visibleItems >= items) {
    $('.btnMore').hide();
  }
}
