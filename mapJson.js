import allSlides from "./sliderItems.json" assert { type: "json" };

const slides = getSlides();
const imagePathArray = [];
const imageTextArray = [];
const imageCaptionArray = [];

getDataToArray(slides, "imagePath", imagePathArray);
getDataToArray(slides, "imageText", imageTextArray);
getDataToArray(slides, "imageCaption", imageCaptionArray);

function getSlides() {
    const { slides } = allSlides;
    return slides;
}

function getDataToArray(slidesArray, data, array) {
    slidesArray.map(slide => {
        array.push(slide[data]);
    })
}

export default { imagePathArray, imageTextArray, imageCaptionArray };
