


    function get()
    {
     
var profile =
{
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    fname: document.getElementById('fname').value,
    phone: document.getElementById('phone').value,
    dob: document.getElementById('datepicker').value,    
    country: $("#country option:selected").text(),
    maritial: document.getElementById('mstatus').value,
    gender: document.getElementById('gendr').value,       
    visatype: $("input[name='radio1']:checked").val(),
    children: $("input[name='radio2']:checked").val(),
    Nochildrens: document.getElementById('child').value      

    };


        var changed = JSON.stringify(profile);
       
       
        $.ajax({
            type: "POST",
            url: "/Apply/send",
            dataType: 'json',
            contentType:"application/json",
            data: changed,
            success: function (response)
            {
                alert(response);
            }
        });
}

    

