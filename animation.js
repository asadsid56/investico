

// Preloader Animation


// NavBar Animation


var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#myNavbar'
})


// Readmore / Read Less Animation

function readMore() {
    let dots = document.getElementById("dots");
    let moreText = document.getElementById("more");
    let btnText = document.querySelector(".btn-earn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
      
      
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less"; 
      moreText.style.display = "inline";
    }
  }

// Swiper Animation Testimonials

const swiper = new Swiper('.swiper', {
  effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2,
          slideShadows: true,
        },
        pagination: {
          el: ".swiper-pagination",
        },
});
// Silder 



// Counter Animation

const counters = document.querySelectorAll('.counter');

function runCounter() {

  counters.forEach(counter => {
    counter.innerText = 0;

    let target = +counter.dataset.count; 

    let countIt = function () {
      let displayedCount = +counter.innerText;   

      if (displayedCount < target) {
          counter.innerText = displayedCount + 1000; 

        setTimeout(countIt, 1);

      } else {
        counter.innerText = target;
      }
    }
  
  countIt()

  })    

}

runCounter();


// Project Animation

$(document).ready(function () {
  $('.list').click(function () {
    const value = $(this).attr('data-filter'); 
    if (value == 'all') {
      $('.itemBox').show('1000'); 
    } else {
      $('.itemBox').not('.'+value).hide('1000'); 
      $('.itemBox').filter('.'+value).show('1000'); 
    }
  })
  // Class active
  $('.list').click(function () {
    $(this).addClass('active').siblings().removeClass('active'); 
  })
})
