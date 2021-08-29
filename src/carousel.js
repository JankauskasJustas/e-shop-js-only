const carousel = document.querySelector(".carousel");
const content_arr = [
  `/assets/jerseys/bryant-jersey.png`,
  `/assets/jerseys/durant-jersey.png`,
  `/assets/jerseys/jordan-jersey.png`,
  `/assets/jerseys/kyrie-jersey.png`,
];

function init() {
  content_arr.forEach((src, index) => {
    const div = createDivElement();
    const img = createImgElement(src);
    const h3 = createH3Element();
    const a = createAElement();

    if (index === 0) {
      div.classList.add("carousel__item--visible");
    }

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(a);
    carousel.appendChild(div);
  });
}

init();

let slidePosition = 0;
const slides = document.getElementsByClassName("carousel__item");
const totalSlides = slides.length;

document
  .getElementById("carousel__button--next")
  .addEventListener("click", () => {
    moveToNextSlide();
  });

document
  .getElementById("carousel__button--prev")
  .addEventListener("click", () => {
    moveToPrevSlide();
  });

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove("carousel__item--visible");
    slide.classList.add("carousel__item--hidden");
  }

  slides[slidePosition].classList.add("carousel__item--visible");
}

function moveToNextSlide() {
  if (slidePosition === totalSlides - 1) {
    slidePosition = 0;
  } else {
    slidePosition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePosition === 0) {
    slidePosition = totalSlides - 1;
  } else {
    slidePosition--;
  }
  updateSlidePosition();
}

function createDivElement() {
  const div = document.createElement("div");
  div.classList.add("carousel__item");
  return div;
}

function createImgElement(src) {
  const img = document.createElement("IMG");
  img.src = src;
  return img;
}

function createH3Element() {
  const h3 = document.createElement("h3");
  h3.innerHTML = `Some text about jersey`;
  return h3;
}

function createAElement() {
  const a = document.createElement("a");

  a.classList.add("stretched-link");
  a.href = "javascript:void(0)";

  return a;
}
