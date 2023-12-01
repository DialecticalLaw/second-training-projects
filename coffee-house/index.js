const body = document.querySelector('body');
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
const sliderWrapper = document.querySelector('.slider-wrapper');

leftArrow.addEventListener('click', moveSlides);
rightArrow.addEventListener('click', moveSlides);

function moveSlides(event) {
    leftArrow.removeEventListener('click', moveSlides);
    rightArrow.removeEventListener('click', moveSlides);
    
    const currentTranslate = checkSlideTranslate();

    if (event.clientX === 0) {
        if (leftArrow.contains(event.target)) {
            if (currentTranslate === 0) {
                for (let slide of slides) {
                    slide.style.transform = `translateX(-200%)`;
                    updatePagActive();
                }
            } else {
                for (let slide of slides) {
                    slide.style.transform = `translateX(${currentTranslate + 100}%)`;
                    updatePagActive();
                }
            }
        } else if (rightArrow.contains(event.target)) {
            if (currentTranslate === -200) {
                for (let slide of slides) {
                    slide.style.transform = `translateX(0%)`;
                    updatePagActive();
                }
            } else {
                for (let slide of slides) {
                    slide.style.transform = `translateX(${currentTranslate - 100}%)`;
                    updatePagActive();
                }
            }
        }
        leftArrow.addEventListener('click', moveSlides);
        rightArrow.addEventListener('click', moveSlides);
        return;
    }

    clearInterval(progressInterval);
    sliderProgressPercent = 0;
    document.querySelector('.pag-progress').style.width = '0%';
    const pagProgress = document.querySelector('.pag-progress');
    setTimeout(() => {
        pagProgress.remove();
        progressInterval = setInterval(updateProgress, 500);
        leftArrow.addEventListener('click', moveSlides);
        rightArrow.addEventListener('click', moveSlides);
    }, 500);

    if (leftArrow.contains(event.target)) {
        if (currentTranslate === 0) {
            for (let slide of slides) {
                slide.style.transform = `translateX(-200%)`;
                updatePagActive();
            }
        } else {
            for (let slide of slides) {
                slide.style.transform = `translateX(${currentTranslate + 100}%)`;
                updatePagActive();
            }
        }
    } else if (rightArrow.contains(event.target)) {
        if (currentTranslate === -200) {
            for (let slide of slides) {
                slide.style.transform = `translateX(0%)`;
                updatePagActive();
            }
        } else {
            for (let slide of slides) {
                slide.style.transform = `translateX(${currentTranslate - 100}%)`;
                updatePagActive();
            }
        }
    }
    document.querySelector('.pag-active').insertAdjacentHTML('afterbegin', '<div class="pag-progress style="width: 0%;""></div>');
}

function checkSlideTranslate() {
    const fullProperty = slides[0].style.transform;
    let result = '';
    for (let i = 0; i < fullProperty.length; i++) {
        if (!isNaN(Number(fullProperty[i]))|| fullProperty[i] === '-') {
            result += fullProperty[i];
        }
    }
    return Number(result);
}

function updatePagActive() {
    const slidesTranslate = checkSlideTranslate();
    switch (slidesTranslate) {
        case 0:
            pags[0].classList.add('pag-active');
            pags[1].classList.remove('pag-active');
            pags[2].classList.remove('pag-active');
            break;
        case -100:
            pags[1].classList.add('pag-active');
            pags[0].classList.remove('pag-active');
            pags[2].classList.remove('pag-active');
            break;
        case -200:
            pags[2].classList.add('pag-active');
            pags[0].classList.remove('pag-active');
            pags[1].classList.remove('pag-active');
            break;
        default:
            return;
    }
}

// switching timer \/

let sliderProgressPercent = 0;

let progressInterval = setInterval(updateProgress, 500);

function updateProgress() {
    sliderProgressPercent += 10;
    if (sliderProgressPercent < 100) {
        document.querySelector('.pag-progress').style.width = `${sliderProgressPercent}%`;
    } else {
        document.querySelector('.pag-progress').style.width = `${sliderProgressPercent}%`;
        sliderProgressPercent = 0;
        setTimeout(() => {
            nextSlideAuto();
        }, 480);
    }
}

function nextSlideAuto() {
    document.querySelector('.pag-progress').style.width = '0%';
    let clickEvent = new MouseEvent('click');
    rightArrow.dispatchEvent(clickEvent);
    setTimeout(() => {
        document.querySelector('.pag-progress').remove();
        document.querySelector('.pag-active').insertAdjacentHTML('afterbegin', '<div class="pag-progress" style="width: 0%;"></div>');
    }, 500);
}

// touch support \/

let x1 = 0;
let x2 = 0;
let moveCoord = 0;
let moveDifference = 0;

sliderWrapper.addEventListener('touchstart', function (event) {
    x1 = event.touches[0].clientX;
})

sliderWrapper.addEventListener('touchmove', function (event) {
    moveCoord = event.touches[0].clientX;
    const maxCoord = Math.max(x1, moveCoord);
    const minCoord = Math.min(x1, moveCoord);
    moveDifference = maxCoord - minCoord;
    if (x1 < moveCoord) {
        for (slide of slides) {
            slide.style.left = moveDifference + 'px';
        }
    } else {
        for (slide of slides) {
            slide.style.left = `-${moveDifference}px`;
        }
    }
})

sliderWrapper.addEventListener('touchend', function (event) {
    for (slide of slides) {
        slide.style.left = '0';
    }
    x2 = event.changedTouches[0].clientX;
    const maxCoord = Math.max(x1, x2);
    const minCoord = Math.min(x1, x2);
    if (maxCoord - minCoord > 30) {
        if (x1 > x2) {
            let clickEvent = new MouseEvent('click', {clientX: 5});
            rightArrow.dispatchEvent(clickEvent);
        } else {
            let clickEvent = new MouseEvent('click', {clientX: 5});
            leftArrow.dispatchEvent(clickEvent);
        }
    }
})