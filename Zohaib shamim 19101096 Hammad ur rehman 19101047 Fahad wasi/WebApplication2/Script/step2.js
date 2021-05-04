$(document).ready(function () {
    $("#forwd2").click(function () {
        $("body #partial1").hide();
        $("body #partial2").hide();
        $("body #partial3").show();
        $("body #partial4").hide();
    });

    $("#back1").click(function () {
        
        $("body #partial1").show();
        $("body #partial2").hide();
        $("body #partial3").hide();
        $("body #partial4").hide();
    });

    var select44 = document.getElementById('kcountry');
    var arr = ['Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'Bahrain', 'Bangladesh', 'Bermuda', 'China', 'Colombia', 'Denmark', 'Egypt', 'Estonia', 'Georgia', 'Guinea', 'Italy', 'Nepal', 'Oman', 'Pakistan'];
    for (var i = 0; i < arr.length; i++)
    {
        var option = document.createElement('OPTION');
        var txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        select44.insertBefore(option, select44.lastChild);
    }


    var select45 = document.getElementById('keduc');
    var arr = ['bachelor', 'Masters', 'Mhill', 'Phd'];
    for (var i = 0; i < arr.length; i++) {
        var option = document.createElement('OPTION');
        var txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        select45.insertBefore(option, select45.lastChild);
    }

});