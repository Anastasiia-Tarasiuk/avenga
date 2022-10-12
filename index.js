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
let index = 0;

// adds slide numbers
let num = 1;
const total = itemArr.length;

slideNumberEls[index].textContent = `${index + 1}/${total}`;

// adds dots
itemArr.map(el => {
    const dot = document.createElement("div");
    dot.classList.add('dot');
    dotContainerEl.append(dot);
})

const dotEls = document.querySelectorAll('.dot');
dotEls[index].style.backgroundColor = "black";

function onNextButtonClick() {
    
    moveSlides(1);

    
    // dotEls[num].style.backgroundColor = "black";
        
    // num += 1;
    // slideNumberEls[num - 1].textContent = `${num}/${total}`;
    
    // for (let index = 0; index < itemArr.length; index += 1) {
    //     dotEls[index].style.backgroundColor = "blue";
    //     prevButtonEl.classList.remove('disabled');
        
    //     const current = itemArr[index];
    //     const next = itemArr[index + 1];        
        
    //     if (index === itemArr.length - 2) {
    //         nextButtonEl.classList.add('disabled');
    //     }
        
    //     if (itemArr[index].className.includes('is-active') && index !== itemArr.length - 1) {
    //         next.classList.add('is-active');
    //         current.classList.remove('is-active');
    //         return;
    //     }    
    // }
}


function moveSlides(param) {
    const current = itemArr[index];
    let next = itemArr[index + param];

    index = index + param;

    if (index === total) {
        index = 0;
        next = itemArr[index]
    } else if (index < 0) {
        index = total - 1;
        next = itemArr[index]
    }
   
    next.classList.add('is-active');
    current.classList.remove('is-active');
} 


function onPrevButtonClick() {

moveSlides(-1);

    // for (let index = itemArr.length - 1; index > 0; index -= 1) {
    //     dotEls[index].style.backgroundColor = "blue";
    //     dotEls[index - 1].style.backgroundColor = "black";

    //     nextButtonEl.classList.remove('disabled');
        
    //     const current = itemArr[index];
    //     const prev = itemArr[index - 1];

    //     if (index === 1) {
    //         prevButtonEl.classList.add('disabled');
    //     }

    //     if (itemArr[index].className.includes('is-active')) {
    //         prev.classList.add('is-active');
    //         current.classList.remove('is-active');
    //         return;
    //     }    
    // }
}

function onImageClick(e) {
    const imageEl = e.target;

    if (imageEl.className.includes('show-image')) {
        imageEl.classList.remove('show-image');
        return;
    }

    imageEl.classList.add('show-image');
}

