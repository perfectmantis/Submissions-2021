

$(document).ready(function () {

    $('#radio3').click(function ()
    {
        $("#child").show();
    });
    $('#radio4').click(function ()
    {
        $("#child").hide();        
    });
 
    $("#forwd1").click(function ()
    {
        $("body #partial1").hide();
        $("body #partial2").show();
        $("body #partial3").hide();
        $("body #partial4").hide();
    });

    $('#mstatus').on('change', function () {
        var optionsText = this.options[this.selectedIndex].text;
        if (optionsText == 'Unmarried')
        {            
            $('form #ge #div20').hide();
        }
        else
        {
            $('#div20').show();
        }
    });

    var select1 = document.getElementById('mstatus');
    var arr = ['Unmarried', 'Married', 'Widow', 'Divorced'];
   
    for (var i = 0; i < arr.length; i++)
    {
        var option = document.createElement('option');
        var txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        select1.insertBefore(option, select1.lastChild);
    }

    var select2 = document.getElementById('gendr');
    var arr = ['Male', 'Female', 'Other'];
    for (var i = 0; i < arr.length; i++)
    {
        var option = document.createElement('OPTION');
        var txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        select2.insertBefore(option, select2.lastChild);
    }

    var select3 = document.getElementById('country');
    var arr = ['Afghanistan', 'Aland Islands', 'Albania', 'Algeria', 'Bahrain', 'Bangladesh', 'Bermuda', 'China', 'Colombia', 'Denmark', 'Egypt', 'Estonia', 'Georgia', 'Guinea', 'Italy', 'Nepal', 'Oman', 'Pakistan'];
    for (var i = 0; i < arr.length; i++)
    {
        var option = document.createElement('OPTION');
        var txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        select3.insertBefore(option, select3.lastChild);
    }

    $('#child').on("change", function ()
    {   var val = $(this).val();
        if (val < 0)
        {           
            toastr.warning('Value can not be Negative', 'Error');        
            $(this).css('border-color', 'red');          
        }
        else
        {
            $(this).css('border-color', '');
        }
    }); 
}); 


