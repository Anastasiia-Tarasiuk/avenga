How to use SlidePlugin:

1. index.html must containe div. By default div class name is "container". You can change it to your own. In this case you should set slider options property as container: ".your-class-name".

2. Create sliderItems.json in root of your project. It must containe data with mandatory properties "imagePath", "imageText" and "imageCaption":

   - "imagePath" is path to the image should be rendered
   - "imageText" is alt attribute for the image
   - "imageCaption" is image description

3. You can set option isDotsContainerShown to false to hide dots container

4. For correct usage you should add plugin.css file before your own css files
