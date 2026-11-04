const slides = document.querySelectorAll(".thesis-slide");

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const dotsContainer = document.getElementById("dots");
const popularThesis = document.querySelector(".popular-thesis");

let currentIndex = 0;
let autoSlide;

/* Create dots */
slides.forEach((_, index) => {
    const dot = document.createElement("button");

    dot.classList.add("dot");

    dot.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

/* Update slider */
function updateSlider() {
    slides.forEach((slide, index) => {
        slide.classList.remove(
            "center",
            "left-1",
            "left-2",
            "right-1",
            "right-2",
            "hidden"
        );

        let position = index - currentIndex;

        if (position > slides.length / 2) {
            position -= slides.length;
        }

        if (position < -slides.length / 2) {
            position += slides.length;
        }

        if (position === 0) {
            slide.classList.add("center");
        } else if (position === -1) {
            slide.classList.add("left-1");
        } else if (position === -2) {
            slide.classList.add("left-2");
        } else if (position === 1) {
            slide.classList.add("right-1");
        } else if (position === 2) {
            slide.classList.add("right-2");
        } else {
            slide.classList.add("hidden");
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function nextThesisSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
    resetAutoSlide();
}

function previousThesisSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
    resetAutoSlide();
}

nextButton.addEventListener("click", nextThesisSlide);
prevButton.addEventListener("click", previousThesisSlide);

/* Auto slide */
function startAutoSlide() {
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }, 3500);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

/* Touch / swipe */
let touchStartX = 0;
let touchEndX = 0;

popularThesis.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});  

popularThesis.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;

    const difference = touchStartX - touchEndX;

    if (Math.abs(difference) < 50) return;

    if (difference > 0) {
        nextThesisSlide();
    } else {
        previousThesisSlide();
    }
});

updateSlider();
startAutoSlide();


// ===============menu button

  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // link par click karne se menu band ho jaye
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    })
  );



//=============== main header

window.addEventListener("scroll", function () {
    const header = document.querySelector(".main-header");

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ===============gallery design 

document.querySelectorAll('.gallery-track').forEach(track => {
  const set = [...track.children];
  const setH = track.scrollHeight;
  const copies = Math.ceil(1500 / setH) + 1;
  for (let i = 0; i < copies; i++)
    set.forEach(n => track.appendChild(n.cloneNode(true)));
  track.style.setProperty('--shift', setH + 'px');
});



document.getElementById('enquiry-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var f = e.target;
  var text =
    'Hello DST Arena, I want to enquire.' +
    '\nName: '   + f.elements['name'].value.trim() +
    '\nPhone: '  + f.elements['phone'].value.trim() +
    '\nCourse: ' + f.elements['course'].value +
    (f.elements['msg'].value.trim() ? '\nMessage: ' + f.elements['msg'].value.trim() : '');

  window.open('https://wa.me/919993897203?text=' + encodeURIComponent(text), '_blank');
  f.reset();
});



