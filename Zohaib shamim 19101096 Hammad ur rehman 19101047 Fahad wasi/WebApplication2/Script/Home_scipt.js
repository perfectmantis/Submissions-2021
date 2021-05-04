
$(document).ready(function () {

    var body = $('#body01');
    var backgrounds = new Array('url(../Content/images/America.jpg', 'url(../Content/images/Austalia.jpg', 'url(../Content/images/canada.jpg', 'url(../Content/images/canada1.jpg', 'url(../Content/images/canada2.jpg', 'url(../Content/images/canada3.jpg'

    );
    var current = 0;

    function nextBackground()
    {
            body.css('background',backgrounds[current = ++current % backgrounds.length]);
            body.css('background-repeat', 'no-repeat');
            body.css('background-size', 'cover');
        
   
            setTimeout(nextBackground, 3000);
    }
            setTimeout(nextBackground, 3000);
            body.css('background', backgrounds[3]);      
});
