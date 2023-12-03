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

// burger /\

// product cards \/

const productCards = document.querySelectorAll('.product-item');
const offerButtons = document.querySelectorAll('.offer-button');
const coffeeButton = document.querySelector('.coffee-offer-button');
const refreshButton = document.querySelector('.refresh');

for (let button of offerButtons) {
    button.addEventListener('click', updateCards);
}

const clickEvent = new PointerEvent('click');
coffeeButton.dispatchEvent(clickEvent);

async function updateCards(event) {
    const currentTarget = event.currentTarget;
    for (let button of offerButtons) {
        button.classList.remove('active-offer-button');
    }
    currentTarget.classList.add('active-offer-button');

    const productJson = await fetch('../products.json');
    const productStorage = await productJson.json();
    const targetCategory = currentTarget.classList[1].slice(0, -13);

    if (targetCategory === 'tea') {
        document.querySelector('.item-5').style.display = 'none';
        document.querySelector('.item-6').style.display = 'none';
        document.querySelector('.item-7').style.display = 'none';
        document.querySelector('.item-8').style.display = 'none';
        document.querySelector('.refresh').style.display = 'none';
    } else {
        document.querySelector('.item-5').removeAttribute('style');
        document.querySelector('.item-6').removeAttribute('style');
        document.querySelector('.item-7').removeAttribute('style');
        document.querySelector('.item-8').removeAttribute('style');
        document.querySelector('.refresh').removeAttribute('style');
    }

    const requiredProducts = productStorage.filter(item => item.category === targetCategory);

    for (let i = 0; i < requiredProducts.length; i++) {
        productCards[i].firstElementChild.style['background-image'] = `url("../assets/img/${requiredProducts[i].name.replaceAll(' ', '')}.png")`; // product image
        productCards[i].lastElementChild.children[0].innerHTML = requiredProducts[i].name; // product name
        productCards[i].lastElementChild.children[1].innerHTML = requiredProducts[i].description; // product description
        productCards[i].lastElementChild.children[2].innerHTML = '$' + requiredProducts[i].price; // product price
    }
}

refreshButton.addEventListener('click', loadMore);

function loadMore() {
    document.querySelector('.item-5').style.display = 'flex';
    document.querySelector('.item-6').style.display = 'flex';
    document.querySelector('.item-7').style.display = 'flex';
    document.querySelector('.item-8').style.display = 'flex';
    document.querySelector('.refresh').style.display = 'none';
}