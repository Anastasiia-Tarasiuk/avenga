const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onNextButtonClick);
prevButtonEl.addEventListener('click', onPrevButtonClick);
dotContainerEl.addEventListener('click', onDotClick);
document.addEventListener('keydown', onKeyPress);

const itemArr = [...itemEls];

// default values
let index = 0;
const slidesArrayLength = itemArr.length;
slideNumberEls[index].textContent = `${index + 1}/${slidesArrayLength}`;

let dotEls = null;
renderDots(itemArr);
dotEls[index].classList.add('addBlackBgColor');


// functions
function onDotClick(e) {
    const chosenDot = e.target;
    const indexOfChosenDot = [...chosenDot.parentElement.children].indexOf(chosenDot);

    dotEls[index].classList.remove('addBlackBgColor');

    const current = itemArr[index];
    index = indexOfChosenDot;    
    let next = itemArr[indexOfChosenDot];
  
    if (current !== next) {
        next.classList.add('is-active');
        current.classList.remove('is-active');
    }

    changeSliderNumbers(index, 1);
    dotEls[index].classList.add('addBlackBgColor');
}

function renderDots(arr) {
    arr.map(el => {
        const dot = document.createElement("div");
        dot.classList.add('dot');
        dotContainerEl.append(dot);
    })

    dotEls = [...document.querySelectorAll('.dot')];
}

function changeSliderNumbers(i, param) {
    slideNumberEls[i].textContent = `${i + param}/${slidesArrayLength}`;
}

function changeDotColor(i, param) {
    if (i >= slidesArrayLength) {
        i = 0;
    }

    if (i <= 0) {
        param = 1;
        dotEls[slidesArrayLength - 1].classList.remove('addBlackBgColor');
    }

    dotEls[i].classList.add('addBlackBgColor');
    
    if (param === 1 && i === slidesArrayLength - 1) {
        i = 0;
        dotEls[i].classList.remove('addBlackBgColor');
    }
    
    dotEls[i + param].classList.remove('addBlackBgColor');
}

function onNextButtonClick() {
    moveSlides(1);
    changeDotColor(index, -1);
    changeSliderNumbers(index, 1);
}

function onPrevButtonClick() {
    moveSlides(-1);
    changeDotColor(index, 1);
    changeSliderNumbers(index, 1);
}

function moveSlides(param) {
    const current = itemArr[index];
    let next = itemArr[index + param];

    index = index + param;

    if (index === slidesArrayLength) {
        index = 0;
    } else if (index < 0) {
        index = slidesArrayLength - 1;
    }

    next = itemArr[index];
   
    next.classList.add('is-active');
    current.classList.remove('is-active');
} 

function onKeyPress(e) {
    if (e.code === 'ArrowRight') {
        onNextButtonClick();
    }

    if (e.code === 'ArrowLeft') {
        onPrevButtonClick();
    }
}
