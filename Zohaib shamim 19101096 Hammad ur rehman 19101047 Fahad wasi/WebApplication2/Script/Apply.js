

$(document).ready(function () {

    $("body #d1 #d2 div #bt1").click(function () {
        $("body #partial1").show();
        $("body #partial2").hide();
        $("body #partial3").hide();
        $("body #partial4").hide();
    });

    $("body #d1 #d2 div #bt2").click(function () {
        $("body #partial2").show();
        $("body #partial1").hide();
        $("body #partial3").hide();
        $("body #partial4").hide();
    });

    $("body #d1 #d2 div #bt3").click(function () {
        $("body #partial3").show();
        $("body #partial1").hide();
        $("body #partial2").hide();
        $("body #partial4").hide();
    });

    $("body #d1 #d2 div #bt4").click(function () {      
        $("body #partial4").show();
        $("body #partial1").hide();
        $("body #partial2").hide();
        $("body #partial3").hide();
    });

});