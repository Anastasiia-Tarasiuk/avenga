const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onButtonClick);
prevButtonEl.addEventListener('click', onButtonClick);
dotContainerEl.addEventListener('click', onDotClick);
document.addEventListener('keydown', onKeyPress);

const itemArr = [...itemEls];

// default values
let globalIndex = 0;
const slidesArrayLength = itemArr.length;
slideNumberEls[globalIndex].textContent = `${globalIndex + 1}/${slidesArrayLength}`;

let dotEls = null;
renderDots(itemArr);
dotEls[globalIndex].classList.add('addDotBgColor');

// functions
function onDotClick(e) {
    const chosenDot = e.target;
    const indexOfChosenDot = [...chosenDot.parentElement.children].indexOf(chosenDot);

    dotEls[globalIndex].classList.remove('addDotBgColor');

    const current = itemArr[globalIndex];
    globalIndex = indexOfChosenDot;    
    let next = itemArr[indexOfChosenDot];
  
    if (current !== next) {
        next.classList.add('isActiveSlide');
        current.classList.remove('isActiveSlide');
    }

    changeSliderNumbers(globalIndex, 1);
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

function changeSliderNumbers(i, param) {
    slideNumberEls[i].textContent = `${i + param}/${slidesArrayLength}`;
}

function changeDotColor(isRight) {

    const current = dotEls[globalIndex];

    let nextStep = isRight ? 1 : -1;
    let next = dotEls[globalIndex + nextStep];
    
    if (globalIndex === (slidesArrayLength - 1)) {
        next = dotEls[0];
    }
    console.log(globalIndex)
    if (globalIndex === 0) {
        next =  dotEls[slidesArrayLength - 1];
    }

    current.classList.remove('addDotBgColor');
    next.classList.add('addDotBgColor');
}

function onButtonClick(e) {
    const directionAttributeValue = JSON.parse(e.currentTarget.getAttribute('data-direction'));
    let nextStep = directionAttributeValue ? 1 : -1;

    globalIndex = globalIndex + nextStep;

    if (globalIndex > (slidesArrayLength - 1)) {
        globalIndex = 0;
    }
    
    if (globalIndex < 0) {
        globalIndex = slidesArrayLength - 1;
    } 

    moveSlides(directionAttributeValue);
   // changeDotColor(directionAttributeValue);
    
    

   
    
    
}

function moveSlides(isRight) {
    let prev = itemArr[globalIndex + !isRight ? 1 : -1];
    
    let nextStep = isRight ? 1 : -1;
    let curr = itemArr[globalIndex];
    
    if (globalIndex === 0) {
        itemArr[slidesArrayLength - 1].classList.remove('isActiveSlide');
        prev = itemArr[0];
    }
    
    if (globalIndex === (slidesArrayLength - 1) && !isRight) {
        prev = itemArr[0]
    }

    prev.classList.remove('isActiveSlide');
    curr.classList.add('isActiveSlide');

} 

function onKeyPress(e) {
    if (e.code === 'ArrowRight') {
        onNextButtonClick();
    }

    if (e.code === 'ArrowLeft') {
        onPrevButtonClick();
    }
}

