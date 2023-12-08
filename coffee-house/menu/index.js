const body = document.querySelector('body');
const burgerMenuContent = document.querySelector('.burger-menu-content');
const burgerButton = document.querySelector('.burger-button');

burgerButton.addEventListener('click', toggleBurger);

const modalWrapper = document.querySelector('.modal-wrapper');
const modalMenu = document.querySelector('.modal-menu');
const modalCloseButton = document.querySelector('.modal-close-button')
const sizeButtons = document.querySelectorAll('.size-button');
const additivesButtons = document.querySelectorAll('.additives-button');

function toggleBurger() {
    window.scrollTo(0, 0);
    body.classList.toggle('lock');
    burgerMenuContent.classList.toggle('burger-menu-active');
    burgerButton.classList.toggle('burger-button-active');
}

document.addEventListener('click', closeInterface);

let isModalOpen = false;

function closeInterface(event) {
    if (burgerButton.classList.contains('burger-button-active')) {
        if (event.target.classList.contains('link') || event.target.classList.contains('logo')) {
            body.classList.remove('lock');
            burgerMenuContent.classList.remove('burger-menu-active');
            burgerButton.classList.remove('burger-button-active');
        }
    } else if (modalMenu.classList.contains('modal-menu-on') && isModalOpen === true) {
        if (!modalMenu.contains(event.target) || modalCloseButton.contains(event.target)) {
            body.classList.remove('lock');
            modalMenu.classList.remove('modal-menu-on');
            modalWrapper.classList.remove('modal-wrapper-blackout');
            setTimeout(() => {
                modalWrapper.classList.remove('modal-wrapper-on');
                
                sizeButtons[0].classList.add('active-button');
                sizeButtons[1].classList.remove('active-button');
                sizeButtons[2].classList.remove('active-button');

                for (let button of additivesButtons) {
                    button.classList.remove('active-button');
                }

                for (let card of productCards) {
                    card.addEventListener('click', openModalMenu);
                }
                isModalOpen = false;
            }, 500);
        }
    }
}

let initialWindowWidth = window.innerWidth;

window.addEventListener('resize', function () { // close the burger menu when going from 768px to higher values 
    if (window.innerWidth > initialWindowWidth && window.innerWidth > 768 && initialWindowWidth <= 768 && !modalWrapper.classList.contains('modal-wrapper-on')) {
        body.classList.remove('lock');
        burgerMenuContent.classList.remove('burger-menu-active');
        burgerButton.classList.remove('burger-button-active');
        initialWindowWidth = window.innerWidth;
    } else {
        initialWindowWidth = window.innerWidth;
    }
})

// burger /\

// product cards \/

const productCards = document.querySelectorAll('.product-item');
const offerButtons = document.querySelectorAll('.offer-button');
const coffeeButton = document.querySelector('.coffee-offer-button');
const refreshButton = document.querySelector('.refresh');
const loadProgress = document.querySelector('.load-progress');

for (let button of offerButtons) {
    button.addEventListener('click', updateCards);
}

const clickEvent = new PointerEvent('click');
coffeeButton.dispatchEvent(clickEvent);

async function updateCards(event) {
    const currentTarget = event.currentTarget;

    for (let button of offerButtons) {
        button.removeEventListener('click', updateCards);
        button.setAttribute('style', 'opacity: 0.4; pointer-events: none');
    }

    for (let card of productCards) {
        card.removeEventListener('click', openModalMenu);
    }

    for (let button of offerButtons) {
        button.classList.remove('active-button');
    }
    currentTarget.classList.add('active-button');
    currentTarget.classList.add('active-button-animation');

    loadProgress.setAttribute('style', 'width: 15%; opacity: 1; transition: 0.5s');

    const productJson = await fetch('../products.json');
    const productStorage = await productJson.json();
    const targetCategory = currentTarget.classList[1].slice(0, -13);

    if (targetCategory === 'tea') {
        document.querySelector('.item-5').style.display = 'none';
        document.querySelector('.item-5').setAttribute('style', 'display: none; opacity: 0');
        document.querySelector('.item-6').style.display = 'none';
        document.querySelector('.item-6').setAttribute('style', 'display: none; opacity: 0');
        document.querySelector('.item-7').style.display = 'none';
        document.querySelector('.item-7').setAttribute('style', 'display: none; opacity: 0');
        document.querySelector('.item-8').style.display = 'none';
        document.querySelector('.item-8').setAttribute('style', 'display: none; opacity: 0');
        document.querySelector('.refresh').style.display = 'none';
    } else {
        document.querySelector('.item-5').style.removeProperty('display');
        document.querySelector('.item-6').style.removeProperty('display');
        document.querySelector('.item-7').style.removeProperty('display');
        document.querySelector('.item-8').style.removeProperty('display');
        document.querySelector('.refresh').removeAttribute('style');
    }

    const requiredProducts = productStorage.filter(item => item.category === targetCategory);

    loadProgress.style.width = '35%';

    const hideCards = new Promise(function(resolve) {
        for (let i = 0; i < requiredProducts.length; i++) {
            switchCardsDisplay(i + 1, 'hide');
            if (i < requiredProducts.length) {
                setTimeout(() => {
                    resolve();
                    loadProgress.style.width = '60%';
                }, 1250);
            }
        }
    });

    function switchCardsDisplay(cardNum, action) {
        if (action === 'hide') {
            setTimeout(() => {
                document.querySelector(`.item-${cardNum}`).setAttribute('style', 'transform: scale(0); opacity: 0');
            }, 120 * cardNum);
        } else {
            setTimeout(() => {
                document.querySelector(`.item-${cardNum}`).removeAttribute('style');
            }, 120 * cardNum);
        }
    }

    hideCards.then(() => {
        for (let i = 0; i < requiredProducts.length; i++) {
        productCards[i].firstElementChild.style['background-image'] = `url("../assets/img/${requiredProducts[i].name.replaceAll(' ', '')}.png")`; // product image
        productCards[i].lastElementChild.children[0].innerHTML = requiredProducts[i].name; // product name
        productCards[i].lastElementChild.children[1].innerHTML = requiredProducts[i].description; // product description
        productCards[i].lastElementChild.children[2].innerHTML = '$' + requiredProducts[i].price; // product price
    }
    }).then(() => {
        for (let i = 0; i < requiredProducts.length; i++) {
            switchCardsDisplay(i + 1, 'show');
        }
        loadProgress.style.width = '80%';
    }).then(() => {
        setTimeout(() => {
            for (let button of offerButtons) {
            button.addEventListener('click', updateCards);
            button.removeAttribute('style');
            }

            for (let card of productCards) {
                card.addEventListener('click', openModalMenu);
            }
            loadProgress.style.width = '100%';
            currentTarget.classList.remove('active-button-animation');
            setTimeout(() => {
                loadProgress.removeAttribute('style');
            }, 500);
    }, 1000);
    })
}

refreshButton.addEventListener('click', loadMore);

function loadMore() {
    document.querySelector('.item-5').style.display = 'flex';
    document.querySelector('.item-6').style.display = 'flex';
    document.querySelector('.item-7').style.display = 'flex';
    document.querySelector('.item-8').style.display = 'flex';
    document.querySelector('.refresh').style.display = 'none';
}

// modal menu \/

const modalName = document.querySelector('.modal-name');
const modalDesc = document.querySelector('.modal-desc');
const modalPrice = document.querySelector('.modal-price');
const modalImg = document.querySelector('.modal-img');


for (let card of productCards) {
    card.addEventListener('click', openModalMenu);
}

const selectedProductAddition = {};

async function openModalMenu(event) {
    for (let card of productCards) {
        card.removeEventListener('click', openModalMenu);
    }
    const targetCard = event.currentTarget;
    const productName = targetCard.lastElementChild.firstElementChild.innerHTML.replaceAll(' ', '');
    const productsJson = await fetch ('../products.json');
    const productsStorage = await productsJson.json();
    const productData = productsStorage.find(item => item.name.replaceAll(' ', '') === productName);
    modalName.innerHTML = productData.name;
    modalDesc.innerHTML = productData.description;
    modalPrice.innerHTML = '$' + productData.price;
    modalImg.style['background-image'] = `url(../assets/img/${productName}.png)`;

    sizeButtons[0].lastElementChild.innerHTML = productData.sizes.s.size;
    sizeButtons[1].lastElementChild.innerHTML = productData.sizes.m.size;
    sizeButtons[2].lastElementChild.innerHTML = productData.sizes.l.size;

    additivesButtons[0].lastElementChild.innerHTML = productData.additives[0].name;
    additivesButtons[1].lastElementChild.innerHTML = productData.additives[1].name;
    additivesButtons[2].lastElementChild.innerHTML = productData.additives[2].name;

    selectedProductAddition[productData.sizes.s.size.replaceAll(' ', '')] = productData.sizes.s['add-price'];
    selectedProductAddition[productData.sizes.m.size.replaceAll(' ', '')] = productData.sizes.m['add-price'];
    selectedProductAddition[productData.sizes.l.size.replaceAll(' ', '')] = productData.sizes.l['add-price'];

    selectedProductAddition[productData.additives[0].name.replaceAll(' ', '')] = productData.additives[0]['add-price'];
    selectedProductAddition[productData.additives[1].name.replaceAll(' ', '')] = productData.additives[1]['add-price'];
    selectedProductAddition[productData.additives[2].name.replaceAll(' ', '')] = productData.additives[2]['add-price'];

    selectedProductAddition['current-size-addition'] = 0;
    selectedProductAddition['current-additive-addition'] = 0;

    body.classList.add('lock');
    modalWrapper.classList.add('modal-wrapper-on');
    setTimeout(() => {
        modalWrapper.classList.add('modal-wrapper-blackout');
        modalMenu.classList.add('modal-menu-on');
    }, 20);
    setTimeout(() => {
        isModalOpen = true;
    }, 500);
}

for (let button of sizeButtons) {
    button.addEventListener('click', updateModalPrice);
}

for (let button of additivesButtons) {
    button.addEventListener('click', updateModalPrice);
}

function updateModalPrice(event) {
    const targetButton = event.currentTarget;
    const oldPrice = Number(modalPrice.innerHTML.slice(1));
    const addition = Number(selectedProductAddition[targetButton.lastElementChild.innerHTML.replaceAll(' ', '')]);

    if (targetButton.classList.contains('size-button')) {
        for (let button of sizeButtons) {
            button.classList.remove('active-button');
        }
        targetButton.classList.add('active-button');

        modalPrice.innerHTML = `$${(oldPrice + addition - selectedProductAddition['current-size-addition']).toFixed(2)}`;
        selectedProductAddition['current-size-addition'] = addition;
    } else if (targetButton.classList.contains('additives-button')) {
        if (targetButton.classList.contains('active-button')) {
            targetButton.classList.remove('active-button');
            modalPrice.innerHTML = `$${(oldPrice - addition).toFixed(2)}`;
            selectedProductAddition['current-additive-addition'] -= addition;
        } else {
            targetButton.classList.add('active-button');
            modalPrice.innerHTML = `$${(oldPrice + addition).toFixed(2)}`;
            selectedProductAddition['current-additive-addition'] += addition;
        }
    }
    return;
}