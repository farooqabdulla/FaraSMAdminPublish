
var request = ''
//======================== Master Page Load==========================================//
$(document).ready(function () {
    request = new Request();


    var urlString = document.location.href;
    var urlArray = urlString.split('/');
    var pageHREF = urlArray[urlArray.length - 1];
    GetAdminDetails();
    if (pageHREF !== "") {
        var menu = document.querySelectorAll('ul#ulAdminLeftMenus li a');
        var i;
        for (i = 0; i < menu.length; i++) {
            var testUrl = (menu[i].getAttribute("href")).split('/');
            var currentUrl = testUrl[testUrl.length - 1];
            menu[i].parentNode.className = "";
            if (currentUrl == pageHREF) {
                if (currentUrl.toUpperCase() == "AddWithdrawalInformation.aspx".toUpperCase() || currentUrl.toUpperCase() == "Transactions.aspx".toUpperCase() ) {
                    $('#finance').addClass("active")
                    break;
                }
                else {
                    menu[i].parentNode.className = "active";
                    break;
                }
            }
        }
    }
});
$(".sidebar-toggler i").click(function () {
    $(this).toggleClass("fa-angle-double-left fa-angle-double-right");
});

$("#logout").on("click", function () {
    var data = { type: 1 };
    request.Initiate("/AjaxHandlers/Logout.ashx", "JSON", false, data, function (successResponseData) {
        if (successResponseData.Status == "True") {
            window.location.href = "/Index.aspx";
        }
    });
});

function GetAdminDetails() {
    data = { type: 2, mode: 1 }
    request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", false, data, function (successResponseData) {
        if (successResponseData.Success == true) {
            $('#adminMasterName').html(successResponseData.SuperAdminDetails[0].Name);
        }
        else {

        }
    });

}