
function del(parameter1, parameter2)
{
    //alert(parameter1);
    var b = confirm('Are you sure you want to delete person' + parameter1);
    if (b)
    {
    $.ajax({
        type: "POST",
        url: '/Admin/deldata',
        data: { parameter1, parameter2 }, 
  
        success: function (response)
        {

            toastr.warning('Data is deleted successfully', 'Deleted ');
            window.setTimeout(function () { location.reload(true); }, 3000);
            }   
        });
    }
}

function editupdate()
{   
   
    var id = $('#myModal input#one1').val();
    var Name = $('#myModal input#two2').val();
    var Fname = $('#myModal input#three3').val();
    var Visatype = $("#myModal input[name='radio1']:checked").val();   
    $.ajax({
        type: "POST",
        url: '/Admin/Updatedata',
        data: { id, Name, Fname, Visatype },
        success: function (response)
        {       
            
            toastr.success('Data is Edit successfully', 'Edited');   
           
            window.setTimeout(function () { location.reload(true);  }, 3000);
           
        }        
    });    
}


function download(Id) {
    alert(Id);
    $.ajax({
        url: '/Admin/downloadform',
        type: "POST",
        //dataType: 'Json',
        data: { Id },
        success: function (data) {
            var objj = JSON.parse(data);
            $('#myModal input#one1').val(objj.Id);
            $('#myModal input#two2').val(objj.Name);
            $('#myModal input#three3').val(objj.fname);
            if (objj.visatype == 'study')
                $('#myModal #lbl1 input#radio23').prop('checked', true);
            else
                $('#myModal #lbl2 input#radio23').prop('checked', true);
        }
    });
}

function edit(Id)
{
    alert(Id);
    $.ajax({
        url: '/Admin/getforUpdate',
        type: "POST",
        //dataType: 'Json',
        data: { Id },
        success: function (data)
        {
            var objj = JSON.parse(data);
            $('#myModal input#one1').val(objj.Id);
            $('#myModal input#two2').val(objj.Name);
            $('#myModal input#three3').val(objj.fname);
            if (objj.visatype == 'study')
                $('#myModal #lbl1 input#radio23').prop('checked', true);
            else
                $('#myModal #lbl2 input#radio23').prop('checked', true);
        }
    });
}

$(document).ready(function ()
{
    $("#yaheha #myInput").on("keyup", function ()
    {
        var value = $(this).val().toLowerCase();
        $("#mytbl tbody tr").filter(function ()
        {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
 

    $.ajax({
        url: "/Admin/GetAllEmployees",
        dataType: "json",
        method: 'get',
        success: function (data)
        {
            var ob = JSON.parse(data);               
            var person = '<i class="fa fa-user fa-3x" style="font-size:24px"></i>';                                                   
            var active = $('tbody td#stat div').html();
            if (ob.length > 0)
            {
                for (i = 0; i < ob.length; i++)
                {
                    var html = "<tr><td>" + ob[i].Id /*Number(1 + i)*/ + "</td> <td>" + person + "</td> <td>" + ob[i].Name + "</td> <td>" + ob[i].fname + "</td> <td>" + ob[i].visatype + "</td> <td>" + " <i class='fa fa-pencil fa-3x' style='font-size:18px'; title='Edit' data-toggle='modal' data-target='#myModal' onclick=edit('" + ob[i].Id + "') margin - right: 13px;'></i> " + "<i class='fa fa-trash' style='font-size:18px'; title='Delete' onclick=del('" + ob[i].Name + "','" + ob[i].fname + "') margin - right: 13px;'></i>" + "</td><td>" + active + "</td><td>" + " <i class='fa fa-file-word-o fa-3x' style='font-size:25px'; title='download file'  onclick=download('" + ob[i].Id + "') margin - right: 13px;'></i> " + "</td></tr> ";
                    $("tbody").append(html);     
                }
            }
        }                 
    });   

});




