// Begin Global Variables
var request;


// End Global Variables



// Begin Page load
var glbcountry = '';
var glblocations = '';
var websiteUrl = $("#hdnWebUrl").val();
$(document).ready(function () {
    $('#Withdrawlsdisplay').hide();
    request = new Request();
    getAllSchoolsDetails();
    getAllWithdrawlsDetails();
    GetCountriesandcities();
    getInstituteAreas();
    $('#filter').click();
    $("#withdr_infor").on("change", "#ddlSchools", getinstituteBalance);

   
    //StartDate Picker
    $("#txtDate").datepicker({
        format: 'dd-mm-yyyy',
        changeMonth: true,
        changeYear: true,
        autoclose: true,
        todayHighlight: true,
        startDate: new Date(),
    });
    $('#refreshtable').click(function () {
        window.location.href = "/AddWithdrawalInformation.aspx";
    })

    $("#txtSearch").on("keyup", function () {
        searchTerm = '';
        searchTerm = document.getElementById('txtSearch').value;
        getAllWithdrawlsDetails();
    });
    $(document).on('change', '.chkfilterTransactions', function () {

        glbcountry = '';
        glblocations = '';

        $("input:checkbox[name=chkCountries]:checked").each(function () {
            glbcountry += $(this).val() + ',';
        });
        $("input:checkbox[name=chkLocations]:checked").each(function () {
            glblocations += $(this).val() + ',';
        });
        getAllWithdrawlsDetails();
});
});

$("#clrStartDate").click(function () {
    $("#txtDate").datepicker("show", {
        format: 'dd-mm-yyyy',
        changeMonth: true,
        changeYear: true,
        autoclose: true,
        todayHighlight: true
    }).on('changeDate', function (e) {
        $(this).datepicker('hide')

    });

   
   
   
 
});

// end Page load

function getAllSchoolsDetails() {
    var data = { type: 1 };
    request.Initiate("/AjaxHandlers/Withdrawal.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.AllSchoolsDetails.length > 0) {
                $.each(response.AllSchoolsDetails, function () {
                    $("#ddlSchools").append($("<option>").val((this.id)).text(this.SchoolName));
                });
            }
        }
    });
}

function getinstituteBalance() {
    var instituteId = document.getElementById('ddlSchools').value;
    document.getElementById('txtWithdrawalAmount').value = "";

    if (instituteId == 0) {
        document.getElementById('hdnInstituteID').value = "0";
        document.getElementById('hdnWalletBalance').value = "0";
        document.getElementById('hdnCurrencyCode').value = "";
        return false;
    }

    var data = { type: 2, instituteId: instituteId };
    request.Initiate("/AjaxHandlers/Withdrawal.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.WalletBalance.length > 0) {
                var WalletInstituteId = parseInt(response.WalletBalance[0]["id"]);
                var WalletBalance = parseFloat(response.WalletBalance[0]["Balance"]);
                var code = response.WalletBalance[0]["Code"];
                document.getElementById('hdnInstituteID').value = WalletInstituteId;
                document.getElementById('hdnWalletBalance').value = WalletBalance;
                document.getElementById('txtAvailableWalletBalnce').value = WalletBalance + "  " + code;
                document.getElementById('hdnCurrencyCode').value = code;

            }
            else {
                document.getElementById('hdnInstituteID').value = "0";
                document.getElementById('hdnWalletBalance').value = "0";
                document.getElementById('txtAvailableWalletBalnce').value = "0";
            }
        }
        else {
            document.getElementById('hdnInstituteID').value = "0";
            document.getElementById('hdnWalletBalance').value = "0";
            document.getElementById('txtAvailableWalletBalnce').value = "0";
        }
    });
}

$('#txtWithdrawalAmount').keypress(function (e) {
    var character = String.fromCharCode(e.keyCode)
    var newValue = this.value + character;


    if (e.value == "") {
        document.getElementById('txtWithdrawalAmount').value = "";
        e.preventDefault();
        return false;
    }
    if (isNaN(newValue) || parseFloat(newValue) * 100 % 1 > 0) {
        e.preventDefault();
        return false;
    }
    if (e.keyCode === 46 && this.value.split('.').length === 2) {
        return false;
    }

});

$("#txtWithdrawalAmount").on("keyup", function () {
    withdralCalculation();
});

function withdralCalculation() {
    var widralAmount = document.getElementById('txtWithdrawalAmount').value;
    var code = document.getElementById('hdnCurrencyCode').value;

    if (widralAmount == "") { ErrorNotifier("Please enter valid withdrawal amount"); resetWithdralCalculation(); return; }

    var totalWalletBalance = parseFloat(document.getElementById('hdnWalletBalance').value);
    var availableWalletBalance = (parseFloat((parseFloat(totalWalletBalance)) - (parseFloat(widralAmount)))).toFixed(2);

    if (availableWalletBalance < 0) { ErrorNotifier("Please enter withdrawal amount should be less than are equal to Available Amount"); resetWithdralCalculation(); return; }

    document.getElementById('txtAvailableWalletBalnce').value = availableWalletBalance + " " + code;
    document.getElementById('hdnAvailableBalance').value = availableWalletBalance;
}

function resetWithdralCalculation() {
    var code = document.getElementById('hdnCurrencyCode').value;
    var WalletBalance = document.getElementById('hdnWalletBalance').value;
    document.getElementById('txtWithdrawalAmount').value = "";
    document.getElementById('txtAvailableWalletBalnce').value = WalletBalance + "  " + code;
    document.getElementById('hdnAvailableBalance').value = "0";
}

$("#btnCancel").on("click", function () {
    $('#withdr_infor').modal('hide');
});

function withdrawalinfoValidations(instituteId, comments, withdrawalAmount, availableAmount, withdrawalDate) {
    if (instituteId == 0) {
        ErrorNotifier("Please select school");
        return false;
    }
    else if (withdrawalDate.trim() == "") {
        ErrorNotifier("Please select withdrawal Date");
        return false;
    }
    else if (withdrawalAmount.trim() == "") {
        ErrorNotifier("Please enter withdrawal amount");
        return false;
    }
    else if (withdrawalAmount.trim() == 0 || withdrawalAmount.trim() == "" || parseInt(withdrawalAmount.trim()) < 0) {
        ErrorNotifier("Please enter valid withdrawal amount");
        return false;
    }
    else if (comments.trim() == "") {
        ErrorNotifier("Please enter withdrawal comments");
        return false;
    }
    else if (availableAmount.trim() == 0 || availableAmount.trim() == "" || parseInt(availableAmount.trim()) < 0) {
        ErrorNotifier("Available withdrawal amount should be greater then are equal to zero");
        return false;
    }
    return true;
}

$("#btnSave").on("click", function () {
    var instituteId = document.getElementById('ddlSchools').value;
    var comments = document.getElementById('txtcomments').value;
    var withdrawalAmount = document.getElementById('txtWithdrawalAmount').value;
    var availableAmount = document.getElementById('hdnAvailableBalance').value;
    var withdrawalDate = document.getElementById('txtDate').value;

    if (withdrawalinfoValidations(instituteId, comments, withdrawalAmount, availableAmount, withdrawalDate) == false) { return;}
    

    var data = { type: 3, instituteId: instituteId, comments: comments, withdrawalAmount: withdrawalAmount, availableAmount: availableAmount, withdrawalDate: withdrawalDate };
    request.Initiate("/AjaxHandlers/Withdrawal.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            SuccessNotifier(response.Message);
            window.location.href = "/AddWithdrawalInformation.aspx";

        }
        else {
            ErrorNotifier(response.Message);
        }
    });

});

function getAllWithdrawlsDetails()
{
    Searchtext = $("#txtSearch").val();
    data = { type: 4, Searchtext: Searchtext, countries: glbcountry, locations: glblocations };
    request.Initiate("/AjaxHandlers/Withdrawal.ashx", "JSON", false, data, function (successResponseData) {

        console.log(successResponseData.withdrawlslist);
        if (successResponseData.Success == true) {

            var html = '';
            if (successResponseData.withdrawlslist.length > 0) {
                $.each(successResponseData.withdrawlslist, function (item, index) {
                    html += '<tr><td class="noShow">' + index.Name + '</td><td class="noShow">' + index.institutecode + '</td><td class="noShow">' + index.email + '</td><td class="noExl"><div class="pull-left dp"><img src="' + (index.logopath == "" ? "/assets/admin/img/defaultSchool.png" : (websiteUrl + index.logopath)) + '" class="img-responsive" alt="profile pic"></div><div class="pull-left">'
                    html += '<h4 class="text-blue f_15 text-bold mb-0" style="cursor:pointer" Title="' + index.Name + '">' + (index.Name.length > 10 ? (index.Name.substring(0, 8) + '..') : (index.Name)) + '</h4><span style="cursor:pointer" class="f_12 margin-top-5 inlineBlock text-grey" Title="' + index.institutecode + '">' + (index.institutecode.length > 10 ? (index.institutecode.substring(0, 10) + '..') : (index.institutecode)) + '</span>'
                    html += '</div></td><td  class="noExl" Title="' + index.email + '" style="cursor:pointer">' + (index.email.length > 22 ? (index.email.substring(0, 20) + '..') : (index.email)) + '</td><td>' + index.ContactNumber + '</td><td>' + index.CreatedTime + '</td><td>' + index.WithDrawAmount + ' ' + index.Code + '</td>'
                    html += '<td>' + index.Balance + ' ' + index.Code + '</td><td>' + index.comments + '</td></tr>'
                });
                $("#Withdrawlsdata").html(html);
                $('#Withdrawlsdisplay').show();
                $('.add_student').hide();
                $('.noShow').hide();
                if (successResponseData.withdrawlslist.length > 10) {
                    var pageCount = parseInt(successResponseData.withdrawlslist.length / 10);
                    $('#myPager').html('');
                    $('#Withdrawlsdata').pageMe({ pagerSelector: '#myPager', showPrevNext: true, hidePageNumbers: false, Page: pageCount });
                } else {
                    $('#myPager').html('');
                }
                
            }
            else {
                //$('#Withdrawlsdisplay').hide();
                //$('.add_student').show();
                $("#Withdrawlsdata").html("<tr><td colspan='7' style='text-align:center'>No Records Found</td></tr>");
            }
           
          
        }

        else {
            $('#Withdrawlsdisplay').hide();
            $('.add_student').show();
        }
    });
}

function GetCountriesandcities() {
    {
        var data = { type: 2 };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
            if (response.Success == true) {
                console.log(response);
                if (response.CountriesDetails.length > 0) {
                    var ICHTML = '';
                    $.each(response.CountriesDetails, function (item, index) {
                        ICHTML += ' <li><input  type="checkbox"  value=' + index.ID + '  name="chkCountries"   id=' + index.Name + ' class="chkfilterTransactions"/>' + index.Name + '</li>'
                    });
                    $('#country').append(ICHTML);
                }
            }
            else {
                //alert("countries not found");
                //ErrorNotifier("country  data  not found");
            }
        });
    }
}
function getInstituteAreas() {
    var data = { type: 4 };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            console.log(response);
            if (response.AreaDetails.length > 0) {
                var ILHTML = '';
                $.each(response.AreaDetails, function (item, index) {
                    ILHTML += ' <li><input  type="checkbox"  value=' + index.ID + '  name="chkLocations"   id=' + index.Name + ' class="chkfilterTransactions"/>' + index.Name + '</li>'
                });
                $('#location').append(ILHTML);
            }
        }
        else {
            // alert("cities not found");
            //ErrorNotifier("locations  data  not found");
        }
    });
}
$('#excelDownload').on('click', function () {


    $("#tableWithdrawal").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "Reports_",
        fileext: ".xlsx",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });

})
