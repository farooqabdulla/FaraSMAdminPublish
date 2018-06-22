
var request;
$(document).ready(function () {

    request = new Request();
});


function seeadmintextlogin(x) {
    x.type = "text";
}

function seeadminasterisklogin(x) {
    x.type = "password";
}
$("#btnAdminLogin").on("click", function () {
    var userEmail = document.getElementById('txtAdminId').value;
    var password = document.getElementById('txtAdminPassword').value;
    if (userEmail.trim() == '') {
        ErrorNotifier("please enter email / Phone ")
        return false;
    }
    if (password.trim() == '') {
        ErrorNotifier("please enter password")
        return false;
    }
    var encryptedPassword = CryptoJS.SHA1(document.getElementById('txtAdminPassword').value).toString();
    data = { type: 1, emailId: userEmail, password: encryptedPassword };
    request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", false, data, function (successResponseData) {
        if (successResponseData.Success == true) {
            window.location.href = "/AdminDashboard.aspx";
        }
        else {
            ErrorNotifier(successResponseData.Message);
        }
    })

});
$('body').on('keypress', '#txtAdminPassword,#txtAdminId', function (args) {
    if (args.keyCode == 13) {
        $('#btnAdminLogin').click();
        return false;
    }
});