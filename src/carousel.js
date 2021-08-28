
document.querySelector('.button--hanging-left').addEventListener('click', (e) => {
    if (activeItemIndex === 0) {
        return;
    }
    activeItemIndex--;
    carousel_content_elem.children.item(activeItemIndex + 1).classList.remove('visible');
    carousel_content_elem.children.item(activeItemIndex).classList.add('visible');
})
    
document.querySelector('.button--hanging-right').addEventListener('click', (e) => {
    if (activeItemIndex === content_arr.length -1) {
        return;
    }
    activeItemIndex++;
    carousel_content_elem.children.item(activeItemIndex - 1).classList.remove('visible');
    carousel_content_elem.children.item(activeItemIndex).classList.add('visible');
});
        

let activeItemIndex = 0;
const carousel_content_elem = document.querySelector('.carousel__content');
const content_arr = [`/assets/jerseys/bryant-jersey.png`, `/assets/jerseys/durant-jersey.png`, `/assets/jerseys/jordan-jersey.png`, `/assets/jerseys/kyrie-jersey.png`];

function init() {
    content_arr.forEach((item, index) => {
        const img = document.createElement("IMG");
        img.src = item;
        img.classList.add('carousel__content__item')
        img.style.width = '500px'
        
        carousel_content_elem.appendChild(img);
    })

}

init();

// const carouselSlide = document.querySelector('.carousel__slide');
// const carouselImages = document.querySelectorAll('.carousel__slide img');

// // Buttons
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// // Counter
// let counter = 1;
// const size = carouselImages[0].clientWidth;

// carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// // Button listeners

// nextBtn.addEventListener('click', () => {
//     if(counter <= 0) return;
//     carouselSlide.style.transition = "transform 0.4s ease-in-out";
//     counter++;
//     carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });

// prevBtn.addEventListener('click', () => {
//     // debugger;
//     carouselSlide.style.transition = "transform 0.4s ease-in-out";
//     counter--;
//     carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });