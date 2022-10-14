const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onNextButtonClick);
prevButtonEl.addEventListener('click', onPrevButtonClick);
dotContainerEl.addEventListener('click', onDotClick);
document.addEventListener("keydown", onKeyPress);

const itemArr = [...itemEls];

// default values
let index = 0;
const slidesArrayLength = itemArr.length;
slideNumberEls[index].textContent = `${index + 1}/${slidesArrayLength}`;

let dotEls = null;
renderDots(itemArr);
dotEls[index].style.backgroundColor = "black";

// functions
function onDotClick(e) {
    const chosenDot = e.target;
    const indexOfCosenDot = [...chosenDot.parentElement.children].indexOf(chosenDot);
    
    dotEls[index].style.backgroundColor = "transparent";

    const current = itemArr[index];
    index = indexOfCosenDot;    
    let next = itemArr[indexOfCosenDot];
  
    if (current !== next) {
        next.classList.add('is-active');
        current.classList.remove('is-active');
    }

    changeSliderNumbers(index, 1);
    dotEls[index].style.backgroundColor = "black";
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
        dotEls[slidesArrayLength - 1].style.backgroundColor = "transparent";
    }

    dotEls[i].style.backgroundColor = "black";
    
    if (param === 1 && i === slidesArrayLength - 1) {
        i = 0;
        dotEls[i].style.backgroundColor = "transparent";
    }
    
    dotEls[i + param].style.backgroundColor = "transparent";  
}

function onNextButtonClick() {
    moveSlides(1);
    changeDotColor(index, -1);
    changeSliderNumbers(index, 1)
}

function onPrevButtonClick() {
    moveSlides(-1);
    changeDotColor(index, 1);
    changeSliderNumbers(index, 1)
}

function moveSlides(param) {
    const current = itemArr[index];
    let next = itemArr[index + param];

    index = index + param;

    if (index === slidesArrayLength) {
        index = 0;
        next = itemArr[index]
    } else if (index < 0) {
        index = slidesArrayLength - 1;
        next = itemArr[index]
    }
   
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