const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onButtonClick);
prevButtonEl.addEventListener('click', onButtonClick);
nextButtonEl.addEventListener('dblclick', disableDoubleClickOnButton);
prevButtonEl.addEventListener('dblclick', disableDoubleClickOnButton);
dotContainerEl.addEventListener('click', onDotClick);
document.addEventListener('keydown', onArrowKeyPress);

const itemArr = [...itemEls];

// default values
const slidesArrayLength = itemArr.length;
let globalIndex = 0;
let dotEls = null;

renderDots(itemArr);
slideNumberEls[globalIndex].textContent = `${globalIndex + 1}/${slidesArrayLength}`;
dotEls[globalIndex].classList.add('addDotBgColor');
itemArr[globalIndex].classList.add('isActiveSlide');

// functions
function onDotClick(e) {
    const chosenDot = e.target;
    const indexOfChosenDot = [...chosenDot.parentElement.children].indexOf(chosenDot);
    const current = itemArr[globalIndex];
    let next = itemArr[indexOfChosenDot];
    
    dotEls[globalIndex].classList.remove('addDotBgColor');
    
    globalIndex = indexOfChosenDot;
    
    if (current !== next) {
        next.classList.add('isActiveSlide');
        current.classList.remove('isActiveSlide');
    }
    
    changeSliderNumbers();
    dotEls[globalIndex].classList.add('addDotBgColor');
}

function renderDots(arr) {
    arr.map(el => {
        const dot = document.createElement("div");
        dot.classList.add('dot');
        dotContainerEl.append(dot);
    })
    
    dotEls = [...document.querySelectorAll('.dot')];
}

function changeSliderNumbers() {
    slideNumberEls[globalIndex].textContent = `${1 + globalIndex}/${slidesArrayLength}`;
}

function changeDotColor(prevIndex) {
    dotEls[prevIndex].classList.remove('addDotBgColor');
    dotEls[globalIndex].classList.add('addDotBgColor');
}

function onButtonClick(e) {
    const directionAttributeValue = JSON.parse(e.currentTarget.getAttribute('data-direction'));
    let nextStep = directionAttributeValue ? 1 : -1;
    let prevIndex = globalIndex;
    
    globalIndex = globalIndex + nextStep;
    
    if (globalIndex > (slidesArrayLength - 1)) {
        globalIndex = 0;
    }
    
    if (globalIndex < 0) {
        globalIndex = slidesArrayLength - 1;
    }
    
    moveSlides(prevIndex);
    changeSliderNumbers();
    changeDotColor(prevIndex);
}

function moveSlides(prevIndex) {
    itemArr[globalIndex].classList.add('isActiveSlide');
    itemArr[prevIndex].classList.remove('isActiveSlide');
}

function onArrowKeyPress(e) {
    if (e.code === 'ArrowRight') {
        nextButtonEl.click();
    }
    
    if (e.code === 'ArrowLeft') {
        prevButtonEl.click();
    }
}


function disableDoubleClickOnButton(e) {
    e.stopPropagation();
}