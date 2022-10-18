function SlidePlugin(options) {
    const defaultOptions = {
        container: ".container",
        slidesClass: ".slide-item",
        nextButton: ".next",
        prevButton: ".prev"
    }

    options = { ...defaultOptions, ...options };

    const _this = this;
    const slidesArray = [...document.querySelectorAll('.slide-item')];
    const slidesArrayLength = slidesArray.length;
    let globalIndex = 0;
    slidesArray[globalIndex].classList.add('is-active-slide');

    this.prepareControls = function () {
        const nextButton = document.createElement("button");
        const prevButton = document.createElement("button"); 
    
        // create dots !

        nextButton.classList.add('next');
        prevButton.classList.add('prev');

        nextButton.setAttribute('data-direction', 'true');
        prevButton.setAttribute('data-direction', 'false');

        nextButton.innerHTML = `
            <svg class="next-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40">
                <path
                    d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM297 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L120 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L409 239c9.4 9.4 9.4 24.6 0 33.9L297 385z" />
            </svg>`
        prevButton.innerHTML = `
            <svg class="prev-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="40">
                <path
                    d="M0 256C0 397.4 114.6 512 256 512s256-114.6 256-256S397.4 0 256 0S0 114.6 0 256zM297 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L120 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L409 239c9.4 9.4 9.4 24.6 0 33.9L297 385z" />
            </svg>`
        
        let controlContainer = document.createElement("div");
        controlContainer.appendChild(prevButton);
        controlContainer.appendChild(nextButton);
        
        document.querySelector(options.container).appendChild(controlContainer);

        nextButton.addEventListener('click', _this.onButtonClick);
        prevButton.addEventListener('click', _this.onButtonClick);
    }

    // this.controlSlidesVisibility = function () {
    //     document.querySelectorAll(options.slidesClass).forEach(el => {
    //         el.style.display = "none";
    //     })
    
    //     slidesArray[globalIndex].classList.add('is-active-slide');
    // }

    this.moveSlides = function(prevIndex) {
        slidesArray[globalIndex].classList.add('is-active-slide');
        slidesArray[prevIndex].classList.remove('is-active-slide');
    }


    // this.changeSliderNumbers = function() {
    //     slideNumberEls[globalIndex].textContent = `${1 + globalIndex}/${slidesArrayLength}`;
    // }

    // this.changeDotColor = function(prevIndex) {
    //     dotEls[prevIndex].classList.remove('add-dot-bg-color');
    //     dotEls[globalIndex].classList.add('add-dot-bg-color');
    // }

    this.onButtonClick = function(e) {
        const directionAttributeValue = JSON.parse(e.currentTarget.getAttribute('data-direction'));
        let nextStep = directionAttributeValue ? 1 : -1;
        let prevIndex = globalIndex;
        
        globalIndex = globalIndex + nextStep;
        
        console.log(this)
        
        // checks if globalIndex stays in possible range
        if (globalIndex > (slidesArrayLength - 1)) {
            globalIndex = 0;
        }
        
        if (globalIndex < 0) {
            globalIndex = slidesArrayLength - 1;
        }

        // moveSlides();
        // this.changeSliderNumbers();
        // this.changeDotColor(prevIndex);
    }
    



    this.prepareControls();
    
    // this.controlSlidesVisibility();

}