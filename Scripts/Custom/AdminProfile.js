$(document).ready(function () {

    request = new Request();
    GetAdminDetails();

});

function GetAdminDetails()
{
    data={type:2,mode:1}
    request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", false, data, function (successResponseData) {
        if (successResponseData.Success == true) {
            console.log(successResponseData.SuperAdminDetails);
            //$('#adminMasterName1').html(successResponseData.SuperAdminDetails[0].Name);
            $('#adminMasterName').html(successResponseData.SuperAdminDetails[0].Name);
            $('#txtAdminName').val(successResponseData.SuperAdminDetails[0].Name);
            $('#txtAdminEmail').val(successResponseData.SuperAdminDetails[0].Email);
            $('#txtAdminMobile').val(successResponseData.SuperAdminDetails[0].Mobile);
            $("#imgAdminProfile").prop("src", (successResponseData.SuperAdminDetails[0].Photo == "" ? $('#hdnWebUrl').val() + "/Images/ProfileImages/defaultimage.png" : $('#hdnWebUrl').val() + successResponseData.SuperAdminDetails[0].Photo))
        }
        else {
           
        }
    });

}


function seeadmintextlogin(x) {
    x.type = "text";
}

function seeadminasterisklogin(x) {
    x.type = "password";
}

function seeadminnewtextlogin(x) {
    x.type = "text";
}

function seeadminnewasterisklogin(x) {
    x.type = "password";
}
function seeadminnewconfirmtextlogin(x) {
    x.type = "text";
}

function seeadminnewconfirmasterisklogin(x) {
    x.type = "password";
}
$("#btnUpdateAdminProfile").click(function () {
    var superadminname=$('#txtAdminName').val();
    var mobile= $('#txtAdminMobile').val();
    var email = $('#txtAdminEmail').val();
    if (superadminname == '')
    {
        ErrorNotifier("SuperAdmin Name is Required");
    }
    else if (mobile.trim().length < 7)
        {
        ErrorNotifier("Please enter a mobile number of length atleast 7.");
    }
    else if (!checkEmail('txtAdminEmail')) {
        ErrorNotifier("Please enter a valid email address.");
    }
    else {
        data = { type: 2, mode: 2, superadminname: superadminname, mobile: mobile, email: email }
        request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", false, data, function (successResponseData) {
            if (successResponseData.Success == true) {
                SuccessNotifier("Details Updated Successfully");
            }
            else {
                //alert(successResponseData.Message);
                ErrorNotifier(successResponseData.Message);
            }
        });
    }
});



$("#myfile").on('change', function () {
    var logoUpLoad = $(this);
    readURL(this, '#imgAdminProfile');
    var docsupload = $('#myfile');
    var otherdocsupload = docsupload.prop("files")[0];
    var formData = new window.FormData();
    formData.append("type", 3);
    formData.append("ProfileUpdate", otherdocsupload);
    //$.ajax({
    //    url: "/AjaxHandlers/StudentProfile.ashx",
    //    method: "POST",
    //    data: formData,
    //    processData: false,
    //    contentType: false,
    //    dataType: "JSON",
    //    success: function (res) {
    request.InitiateFormRequest("/AjaxHandlers/Admin.ashx", "JSON", false, formData, function (res) {

        if (res.Success == true) {
            SuccessNotifier("profile image uploaded");
        }
        else {
            ErrorNotifier(res.Message);
        }

    });
    //})

});
function readURL(input, id) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(id).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}



$("#txtUpdatePassword").click(function () {
    var encryptedoldpassword=CryptoJS.SHA1(document.getElementById('txtOldPassword').value).toString();
    var encryptedPassword1 = CryptoJS.SHA1(document.getElementById('txtNewPassword').value).toString();
    var encryptedPassword2 = CryptoJS.SHA1(document.getElementById('txtConfirmPassword').value).toString();
    var oldPs = document.getElementById("txtOldPassword").value;
    var ps1 = document.getElementById("txtNewPassword").value;
    var ps2 = document.getElementById('txtConfirmPassword').value;
  
    if (oldPs.trim().length == 0 || oldPs.trim() == "")
    {
        ErrorNotifier("Please enter old password");
        return false;
    }
    else if (ps1.trim().length == 0 || ps1.trim() == "") {
        ErrorNotifier("Please enter new password");
        return false;
    }
    else if (ps2.trim().length == 0 || ps2.trim() == "") {
        ErrorNotifier("Please enter confirm password");
        return false;
    }

    if (ps1.length < 6 || ps2.length < 6) {
        ErrorNotifier("Password must be greater than 6 letters.");
        return false;
    } else if (encryptedPassword1 != encryptedPassword2) {
        ErrorNotifier("Passwords donot match.");
        return false;
    } else if (oldPs == ps1) {
        ErrorNotifier("Old password and new password cannot be same.");
        return false;
    }
    var data = {
        type: 4,
        newPassword: encryptedPassword2,
        oldpassword: encryptedoldpassword
    };
    request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", false, data, function (successResponseData) {
        if (successResponseData.Success == true) {
            SuccessNotifier("password updated Sucessfully");
            $("#txtOldPassword").val('');
            $("#txtNewPassword").val('');
            $("#txtConfirmPassword").val('');
            //$("#resetPasswordField").hide();
            //$("#resetSuccessTab").show();
            //sessionStorage.clear();
        } else {
            ErrorNotifier(successResponseData.Message);
        }
    })


});
$('#txtAdminMobile').keyup(validateOnlyNumbers);