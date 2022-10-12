const itemEls = document.querySelectorAll('.slide-item');
const nextButtonEl = document.querySelector('.next');
const prevButtonEl = document.querySelector('.prev');
const slideListEl = document.querySelector('.slide-list');

const itemArr = [...itemEls];

let num = 1;
const total = itemArr.length;

nextButtonEl.addEventListener('click', onNextButtonClick);
prevButtonEl.addEventListener('click', onPrevButtonClick);
slideListEl.addEventListener('click', onImageClick);

function onNextButtonClick() {
    num += 1;
    for (let index = 0; index < itemArr.length; index += 1) {
        
        prevButtonEl.classList.remove('disabled');
        
        const current = itemArr[index];
        const next = itemArr[index + 1];        
        
        if (index === itemArr.length - 2) {
            nextButtonEl.classList.add('disabled');
        }
        
        if (itemArr[index].className.includes('is-active') && index !== itemArr.length - 1) {
            next.classList.add('is-active');
            current.classList.remove('is-active');
            return;
        }    
    }
}


function onPrevButtonClick() {
    for (let index = itemArr.length - 1; index > 0; index -= 1) {

        nextButtonEl.classList.remove('disabled');
        
        const current = itemArr[index];
        const prev = itemArr[index - 1];

        if (index === 1) {
            prevButtonEl.classList.add('disabled');
        }

        if (itemArr[index].className.includes('is-active')) {
            prev.classList.add('is-active');
            current.classList.remove('is-active');
            return;
        }    
    }
}

function onImageClick(e) {
    const imageEl = e.target;

    if (imageEl.className.includes('show-image')) {
        imageEl.classList.remove('show-image');
        return;
    }

    imageEl.classList.add('show-image');
}

