
$(document).ready(function ()
{

    $("#btn10").click(function () {
        $("body #partial1").hide();
        $("body #partial2").hide();
        $("body #partial3").show();
        $("body #partial4").hide();
    });
    //$("#check1").click(function ()
    //{
    //    $("#div8 #ab").hide();    
    //});

    $("#div8 #ab").hide();
    $("#div8 #abc").hide();
    $("#div8 #abcd").hide();
    $("#check1").click(function ()
    {
        if ($(this).is(":checked")) {
            $("#div8 #ab").show();
        } else
        {
            $("#div8 #ab").hide();
        }
    });

    $("#check2").click(function ()
    {
        if ($(this).is(":checked"))
        {
            $("#div8 #abc").show();
        } else
        {
            $("#div8 #abc").hide();
        }
    });

    $("#check3").click(function ()
    {
        if ($(this).is(":checked"))
        {
            $("#div8 #abcd").show();
        }
        else
        {
            $("#div8 #abcd").hide();
        }
    });

    $('#save1').click(function () {
      
        toastr.success('Data Saved', 'Saved');
    });
});

