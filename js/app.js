
const swiper = new Swiper(".swiper", {
    slidesPerView: 1.2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        clickable : true,
    },
    breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 30,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable : true,
        },
        },
        900: {
          slidesPerView: 3,
          spaceBetween: 70,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable : true,
        },
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable : true,
        },
        }
    }
  });