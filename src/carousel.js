const carousel = document.querySelector(".carousel");

// function init() {
//   content_arr.forEach((src, index) => {
//     const div = createDivElement();
//     const img = createImgElement(src);
//     const h3 = createH3Element();
//     const a = createAElement();

//     if (index === 0) {
//       div.classList.add("carousel__item--visible");
//     }

//     div.appendChild(img);
//     div.appendChild(h3);
//     div.appendChild(a);
//     carousel.appendChild(div);
//   });
// }

// init();
function renderCarousel(jerseys) {
  jerseys.forEach((jersey, index) => {
    const div = createDivElement();
    const img = createImgElement(jersey);
    const h3 = createH3Element(jersey);
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

let slidePosition = 0;
const slides = document.getElementsByClassName("carousel__item");
const totalSlides = slides.length;

x.registerListener((activePlayerId) => {
  const player = players.find((player) => player.id === activePlayerId);
  console.log(player);

  renderCarousel(player.jerseys);
});

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

function createImgElement(jersey) {
  const img = document.createElement("IMG");
  img.src = `data:;base64,${jersey.img}`;
  img.alt = jersey.title;
  return img;
}

function createH3Element(jersey) {
  const h3 = document.createElement("h3");
  h3.innerHTML = jersey.title;
  return h3;
}

function createAElement() {
  const a = document.createElement("a");

  a.classList.add("stretched-link");
  a.href = "javascript:void(0)";

  return a;
}
