export const Carousel = (() => {
  const carousel = document.querySelector(".carousel");
  let slidePosition = 0;
  let slides;
  let totalSlides;

  activePlayerIdChange.listenForChanges((activePlayerId) => {
    const player = players.find((player) => player.id === activePlayerId);

    renderCarousel(player.jerseys);
  });

  const renderCarousel = (jerseys) => {
    cleanupCarousel();

    jerseys.forEach((jersey, index) => {
      const item = createCarouselItem(jersey, index);

      carousel.appendChild(item);
    });

    slides = document.getElementsByClassName("carousel__item");
    totalSlides = slides.length;
  };

  const cleanupCarousel = () => {
    const nodesToRemove = [];
    slidePosition = 0;
    carousel.childNodes.forEach((node) => {
      if (node.classList?.contains("carousel__item")) {
        nodesToRemove.push(node);
      }
    });

    nodesToRemove.forEach((node) => {
      carousel.removeChild(node);
    });
  };

  const updateSlidePosition = () => {
    for (let slide of slides) {
      slide.classList.remove("carousel__item--visible");
      slide.classList.add("carousel__item--hidden");
    }
    slides[slidePosition].classList.add("carousel__item--visible");
  };

  const moveToNextSlide = () => {
    if (slidePosition === totalSlides - 1) {
      slidePosition = 0;
    } else {
      slidePosition++;
    }
    updateSlidePosition();
  };

  const moveToPrevSlide = () => {
    if (slidePosition === 0) {
      slidePosition = totalSlides - 1;
    } else {
      slidePosition--;
    }
    updateSlidePosition();
  };

  const createCarouselItem = (jersey, index) => {
    const div = document.createElement("div");
    div.classList.add("carousel__item");

    const img = createImgElement(jersey);
    const h3 = createH3Element(jersey);
    const a = createAElement();

    if (index === 0) {
      div.classList.add("carousel__item--visible");
    }

    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(a);

    return div;
  };

  const createImgElement = (jersey) => {
    const img = document.createElement("IMG");
    img.src = `data:;base64,${jersey.img}`;
    img.alt = jersey.title;
    return img;
  };

  const createH3Element = (jersey) => {
    const h3 = document.createElement("h3");
    h3.innerHTML = jersey.title;
    return h3;
  };

  const createAElement = () => {
    const a = document.createElement("a");

    a.classList.add("stretched-link");
    a.href = "javascript:void(0)";

    return a;
  };

  return {
    moveToNextSlide,
    moveToPrevSlide,
  };
})();
