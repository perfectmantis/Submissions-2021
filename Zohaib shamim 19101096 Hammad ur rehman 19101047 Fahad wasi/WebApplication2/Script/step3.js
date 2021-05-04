
$(document).ready(function ()
{
    $('#radio1').click(function ()
    {     
        $("#dis :input").prop("disabled", true);
        $("#dis").css("background-color", '#d3d3d3');
        $("#dis #showw").css("color", 'red');
        $("#dis #showw").show();
    });

    $('#radio2').click(function ()
    {       
        $("#dis :input").prop("disabled", false);
        $("#dis").css("background-color", '');       
        $("#dis #showw").hide();       
    });

    $("#btn9").click(function ()
    {
        $("body #partial1").hide();
        $("body #partial2").hide();
        $("body #partial3").hide();
        $("body #partial4").show();
    });

    $("#btn8").click(function ()
    {
        $("body #partial1").hide();
        $("body #partial2").show();
        $("body #partial3").hide();
        $("body #partial4").hide();
    });
});