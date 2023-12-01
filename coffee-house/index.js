const body = document.querySelector('body');
const header = document.querySelector('header');
const burgerMenuContent = document.querySelector('.burger-menu-content');
const burgerButton = document.querySelector('.burger-button');

burgerButton.addEventListener('click', toggleBurger);

function toggleBurger() {
    window.scrollTo(0, 0);
    body.classList.toggle('lock');
    burgerMenuContent.classList.toggle('burger-menu-active');
    burgerButton.classList.toggle('burger-button-active');
}

document.addEventListener('click', closeInterface);

function closeInterface(event) {
    if (burgerButton.classList.contains('burger-button-active')) {
        if (event.target.classList.contains('link') && !event.target.classList.contains('active-menu-link-header')) {
            body.classList.remove('lock');
            burgerMenuContent.classList.remove('burger-menu-active');
            burgerButton.classList.remove('burger-button-active');
        }
    }
}

// Slider \/

const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const slides = document.querySelectorAll('.slide');
const pags = document.querySelectorAll('.pag');

leftArrow.addEventListener('click', moveSlides)
rightArrow.addEventListener('click', moveSlides)

function moveSlides(event) {
    const currentTranslate = Number(checkSlideTranslate());
    if (leftArrow.contains(event.target)) {
        if (currentTranslate === 0) {
            for (let slide of slides) {
                slide.style.transform = `translateX(-200%)`;
            }
        } else {
            for (let slide of slides) {
                slide.style.transform = `translateX(${currentTranslate + 100}%)`;
            }
        }
    } else if (rightArrow.contains(event.target)) {
        if (currentTranslate === -200) {
            for (let slide of slides) {
                slide.style.transform = `translateX(0%)`;
            }
        } else {
            for (let slide of slides) {
                slide.style.transform = `translateX(${currentTranslate - 100}%)`;
            }
        }
    } else {
        return;
    }
}

function checkSlideTranslate() {
    const fullProperty = slides[0].style.transform;
    let result = '';
    for (let i = 0; i < fullProperty.length; i++) {
        if (!isNaN(Number(fullProperty[i]))|| fullProperty[i] === '-') {
            result += fullProperty[i];
        }
    }
    return result;
}