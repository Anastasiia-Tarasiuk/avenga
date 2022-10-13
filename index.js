const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');
const slideNumberEls = document.querySelectorAll('.slide-number');
const dotContainerEl = document.querySelector('.dots-container');

nextButtonEl.addEventListener('click', onNextButtonClick);
prevButtonEl.addEventListener('click', onPrevButtonClick);
slideListEl.addEventListener('click', onImageClick);

const itemArr = [...itemEls];

// default values
let index = 0;
const slidesArrayLength = itemArr.length;
slideNumberEls[index].textContent = `${index + 1}/${slidesArrayLength}`;

let dotEls = null;
renderDots(itemArr);
dotEls[index].style.backgroundColor = "black";

// functions
function renderDots(arr) {
    arr.map(el => {
        const dot = document.createElement("div");
        dot.classList.add('dot');
        dotContainerEl.append(dot);
    })

    dotEls = document.querySelectorAll('.dot');
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
        dotEls[slidesArrayLength - 1].style.backgroundColor = "blue";
    }

    dotEls[i].style.backgroundColor = "black";
    
    if (param === 1 && i === slidesArrayLength - 1) {
        i = 0;
        dotEls[i].style.backgroundColor = "blue";
    }
    
    dotEls[i + param].style.backgroundColor = "blue";  
}

function onNextButtonClick() {
    moveSlides(1);
    changeDotColor(index, -1);
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

function onPrevButtonClick() {
    moveSlides(-1);
    changeDotColor(index, 1);
    changeSliderNumbers(index, 1)
}

function onImageClick(e) {
    const imageEl = e.target;

    if (imageEl.className.includes('show-image')) {
        imageEl.classList.remove('show-image');
        return;
    }

    imageEl.classList.add('show-image');
}
