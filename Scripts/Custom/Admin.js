
var request;
$(document).ready(function () {
    checkNetConnection();
    testInternet();
    request = new Request();
});



function seeadminnewtextlogin(x) {
    x.type = "text";
}

function seeadminnewasterisklogin(x) {
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
function checkNetConnection() {
    debugger;
    var status = navigator.onLine;
    if (status) {
    } else {
        valu = $('#connectionUrl').val().trim() + 'NoInternetConnection.aspx';
        window.location.href = valu;
    }
}
function testInternet() {
    setInterval(function () {
        checkNetConnection();
    }, 5000);//5 sec
}