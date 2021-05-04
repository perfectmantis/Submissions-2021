
$(document).ready(function ()
{

    $('#dd2').fadeOut(0);
    $('#dd3').fadeOut(0);
    next1();
    function next1()
    {    
        $('#dd1').fadeOut(7000, function ()
        {
            $('#dd2').fadeIn(0, function () { next2(); });
        });
    }

    function next2()
    {
        $('#dd2').fadeOut(7000, function () {
            $('#dd3').fadeIn(0, function () { next3(); });
        });
    }

    function next3()
    {
        $('#dd3').fadeOut(7000, function () {
            $('#dd1').fadeIn(0, function () { next1(); });
        });
    }

   
});