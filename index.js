const slideEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onButtonClick);
prevButtonEl.addEventListener('click', onButtonClick);
nextButtonEl.addEventListener('dblclick', disableDoubleClickOnButton);
prevButtonEl.addEventListener('dblclick', disableDoubleClickOnButton);
dotContainerEl.addEventListener('click', onDotClick);
document.addEventListener('keydown', onArrowKeyPress);

// default values
const slidesArray = [...slideEls];
const slidesArrayLength = slidesArray.length;
let globalIndex = 0;
let dotEls = null;

renderDots(slidesArray);
changeSliderNumbers();
dotEls[globalIndex].classList.add('add-dot-bg-color');
slidesArray[globalIndex].classList.add('is-active-slide');

// functions
function onDotClick(e) {
    const chosenDot = e.target;
    const indexOfChosenDot = [...chosenDot.parentElement.children].indexOf(chosenDot);
    const current = slidesArray[globalIndex];
    let next = slidesArray[indexOfChosenDot];
    
    dotEls[globalIndex].classList.remove('add-dot-bg-color');
    
    globalIndex = indexOfChosenDot;
    
    //doesn't allow switch classes on the same dot
    if (current !== next) {
        next.classList.add('is-active-slide');
        current.classList.remove('is-active-slide');
    }
    
    dotEls[globalIndex].classList.add('add-dot-bg-color');
    changeSliderNumbers();
}

function renderDots(arr) {
    arr.map(el => {
        const dot = document.createElement("div");
        dot.classList.add('dot');
        dotContainerEl.append(dot);
    })
    
    dotEls = document.querySelectorAll('.dot');
}

function changeSliderNumbers() {
    slideNumberEls[globalIndex].textContent = `${1 + globalIndex}/${slidesArrayLength}`;
}

function changeDotColor(prevIndex) {
    dotEls[prevIndex].classList.remove('add-dot-bg-color');
    dotEls[globalIndex].classList.add('add-dot-bg-color');
}

function onButtonClick(e) {
    const directionAttributeValue = JSON.parse(e.currentTarget.getAttribute('data-direction'));
    let nextStep = directionAttributeValue ? 1 : -1;
    let prevIndex = globalIndex;
    
    globalIndex = globalIndex + nextStep;

    // checks if globalIndex stays in possible range
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
    slidesArray[globalIndex].classList.add('is-active-slide');
    slidesArray[prevIndex].classList.remove('is-active-slide');
}

function onArrowKeyPress(e) {
    // checks if arrow key was pressed and invokes button events
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