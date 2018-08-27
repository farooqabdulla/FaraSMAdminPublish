// Begin Global Variables
var request; var instituteId = 0; var searchTerm = ''; var statusIDs = []; var countryIDs = []; var areaID = [];
var currencycodeformerchantdetails = '';

// End Global Variables



// Begin Page load

$(document).ready(function () {
    request = new Request();
    getAllSchoolsDetails();
    getDiscountTypes();
    
    $("#tblBdySchoolDetails").on("click", ".blockAccount", blockAccount);
    $("#tblBdySchoolDetails").on("click", ".paytabsMarchantAccount", paytabsMarchantAccount);
    $("#tblBdySchoolDetails").on("click", ".viewProfile", viewProfile);
    $("#tblBdySchoolDetails").on("click", ".verifyAccount", verifyAccount);
    $("#tblBdySchoolDetails").on("click", ".deleteAccount", unblockAccount);
    $("#tblBdySchoolDetails").on("click", ".schoolClick", viewProfile);
    
    
    getInstituteCountries();
    getInstituteStatus();
    getInstituteAreas();

    clearMarchantValues();
   
    $('#filter').click();

    //$('#txtDebitCardConvenience').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
    //$('#txtDebitCardConveniencetc').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
    //$('#txtCreditCardConvenience').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
    //$('#txtCreditCardConveniencetc').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});

    //$('#txtDebitCardConvenience,#txtDebitCardConveniencetc,#txtCreditCardConvenience,#txtCreditCardConveniencetc').keyup(decimalValidator);
    //$('#txtDebitCardConvenience1,#txtDebitCardConvenience1tc,#txtCreditCardConvenience1,#txtCreditCardConvenience1tc').keyup(decimalValidator);
    $('#txtDebitCardConvenience,#txtDebitCardConveniencetc,#txtCreditCardConvenience,#txtCreditCardConveniencetc').keypress(decimalpointcheck);
    $('#txtDebitCardConvenience1,#txtDebitCardConvenience1tc,#txtCreditCardConvenience1,#txtCreditCardConvenience1tc').keypress(decimalpointcheck);
    // activate
    //$('#txtDebitCardConvenience1').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
    //$('#txtDebitCardConvenience1tc').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");

    //        $(this).val("");
    //        return false;
    //    }

    //});
    //$('#txtCreditCardConvenience1').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
    //$('#txtCreditCardConvenience1tc').blur(function () {
    //    var value = $(this).val();
    //    if (!$.isNumeric(value)) {
    //        //alert("Please enter a valid data");
    //        ErrorNotifier("Please enter a valid data");
    //        $(this).val("");
    //        return false;
    //    }
    //});
}); 

// end Page load
    


// Begin Custom Define Functions

function clearMarchantValues() {
    $('#txtSecretKey').val('');
    $('#txtPaytabsEmailID').val('');
    $('#txtBillingAddress').val('');
    $('#txtPayTabsMID').val('');

    $('#txtASecretKey').val('');
    $('#txtAPaytabsEmailID').val('');
    $('#txtABillingAddress').val('');
    $('#txtAPayTabsMID').val('');
    
    $('#ddlDebitCardConvenienceType').val('0');
    $('#ddlDebitCardConvenienceTypetc').val('0');
    $('#ddlCreditCardConvenienceType').val('0');
    $('#ddlCreditCardConvenienceTypetc').val('0');
    $('#txtDebitCardConvenience').val('');
    $('#txtDebitCardConveniencetc').val('');
    $('#txtCreditCardConvenience').val('');
    $('#txtCreditCardConveniencetc').val('');
    // pending
    $('#ddlDebitCardConvenienceType1').val('0');
    $('#ddlDebitCardConvenienceType1tc').val('0');
    $('#ddlCreditCardConvenienceType1').val('0');
    $('#ddlCreditCardConvenienceType1tc').val('0');
    $('#txtDebitCardConvenience1').val('');
    $('#txtDebitCardConvenience1tc').val('');
    $('#txtCreditCardConvenience1').val('');
    $('#txtCreditCardConvenience1tc').val('');

    // 

    $('#lbltxtDebitCardConvenience').text('');
    $('#lbltxtDebitCardConveniencetc').text('');
    $('#lbltxtCreditCardConvenience').text('');
    $('#lbltxtCreditCardConveniencetc').text('');


    //

    $('#lbltxtDebitCardConvenience1').text('');
    $('#lbltxtDebitCardConvenience1tc').text('');
    $('#lbltxtCreditCardConvenience1').text('');
    $('#lbltxtCreditCardConvenience1tc').text('');
}

function unblockAccount() {
    currencycodeformerchantdetails = $(this).attr("currencycode");
    document.getElementById('hdnIsActivateOrUnblock').value = "1";
    clearMarchantValues();

    $('#ActivateSchoolAccount').modal('show');

    document.getElementById('hdnInstituteID').value = $(this).attr("id");

    getPaytabsMarchantAccountDetails();

    $('#btnApproveCancel').show();

    $('#btnActivate').html('Un-block');
    
}

$("#btnApproveCancel").on("click", function () {
    $('#ActivateSchoolAccount').modal('hide');
    $('#btnApproveCancel').hide();
    clearMarchantValues();
    $('#btnActivate').html('Approve');
});


$("#btnRefresh").on("click", function () {
    $("input[name*='chk']").removeAttr('checked');
    clearValues();
    document.getElementById('txtSearch').value = '';
    getAllSchoolsDetails();
});



function clearValues() {
    instituteId = 0; searchTerm = ''; statusIDs = []; countryIDs = []; areaID = [];
}

function redirectionToPage() {
    window.location.href = "/Schools.aspx";
}

$("#txtSearch").on("keyup", function () {
    searchTerm = ''; instituteId = 0;
    searchTerm = document.getElementById('txtSearch').value;
    getAllSchoolsDetails();
});

function getInstituteCountries() {
    var data = { type: 2 };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.CountriesDetails.length > 0) {
                bindInstituteCountry(response);
            }
        }
        else {

        }
    });
}

function bindInstituteCountry(response) {
    var CountryDetails = response.CountriesDetails;
    var i = 0; var ulBody = '';

    for (i = 0; i < response.CountriesDetails.length; i++) {
        ulBody = "<li> <input type='checkbox' name='countrieschk'  id='" + CountryDetails[i]["ID"] + "'  class='margin-right-5 countries'  onclick='onlickFunction()'/> " + CountryDetails[i]["Name"] + " </li>";
        $(ulBody).appendTo($("#country"));      
    }
}

function getInstituteStatus() {
    var data = { type: 3 };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.StatusDetails.length > 0) {
                bindInstituteStatus(response);
            }
        }
        else {

        }
    });
}

function bindInstituteStatus(response) {
    var StatusDetail = response.StatusDetails;
    var i = 0; var ulBody = '';

    for (i = 0; i < response.StatusDetails.length; i++) {
        ulBody = "<li> <input type='checkbox' name='ststuschk'  id='" + StatusDetail[i]["ID"] + "' class='margin-right-5 statuses' onclick='onlickFunction()'/> " + StatusDetail[i]["Name"] + " </li>";
        $(ulBody).appendTo($("#status"));
    }
}

function getInstituteAreas() {
    var data = { type: 4 };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.AreaDetails.length > 0) {
                bindInstituteAreas(response);
            }
        }
        else {

        }
    });
}

function bindInstituteAreas(response) {
    var AreaDetail = response.AreaDetails;
    var i = 0; var ulBody = '';
    for (i = 0; i < response.AreaDetails.length; i++) {
        ulBody = "<li> <input type='checkbox' name='areachk' id='" + AreaDetail[i]["ID"] + "' class='margin-right-5 location' onclick='onlickFunction()' /> " + AreaDetail[i]["Name"] + " </li>";
        $(ulBody).appendTo($("#location"));
    }
}

function getAllSchoolsDetails() {
    var formData = new window.FormData();
    formData.append("type", 1)
    formData.append("instituteId", instituteId);
    formData.append("searchTerm", searchTerm);
    formData.append("statusIDs", statusIDs);
    formData.append("countryIDs", countryIDs);
    formData.append("areaID", areaID);

    request.InitiateFormRequest("/AjaxHandlers/AdminSchool.ashx", "JSON", false, formData, function (response) {
        if (response.Success == true) {
            $('#excelDownload').show();
            $('#myPager').show();
            if (response.AllSchoolsDetails.length == 0) {
                $('#excelDownload').hide();
                $('#myPager').hide();
            }

            if (response.AllSchoolsDetails.length > 0) {
                bindAllSchools(response);
                $('#DivNoDataFound').hide();
                $('#DivDataFound').show();
                
            }
            else {
                $("#tblBdySchoolDetails").html("<tr><td colspan='7' style='text-align:center'>No Records Found</td></tr>");
            }
        }
        else {
            $("#tblBdySchoolDetails").html("<tr><td colspan='7' style='text-align:center'>No Records Found</td></tr>");
            $('#DivNoDataFound').show();
            $('#DivDataFound').hide();
        }
    });
}

function bindAllSchools(response) {
    document.getElementById('tblBdySchoolDetails').innerText = "";
    var webUrl = document.getElementById('hdnWebUrl').value;
    var schoolDetails = response.AllSchoolsDetails;
    var i = 0; 
    var schoolName; var reasons;

    for (i = 0; i < response.AllSchoolsDetails.length; i++) {
        var tblBody; var tblEnd; var tblBdy; var finalBody;
        var imageFileName = (schoolDetails[i]["logopath"]).trim() == "" ? '/assets/admin/img/defaultSchool.png' : webUrl + (schoolDetails[i]["logopath"]).trim();
        var instituteName = "";
        if (schoolDetails[i]["SchoolName"].length > 9) {
            instituteName = schoolDetails[i]["SchoolName"].substring(0, 6) + "...";
        }
        else {
            instituteName = schoolDetails[i]["SchoolName"]
        }
        var instituteEmail = "";
        if (schoolDetails[i]["Email"].length > 12) {
            instituteEmail = schoolDetails[i]["Email"].substring(0, 6) + "...";
        }
        else {
            instituteEmail = schoolDetails[i]["Email"];
        }
        tblBody = " <tr><td class=\"noShow\">" + schoolDetails[i]["SchoolName"] + "</td><td class=\"noShow\">" + schoolDetails[i]["InstituteCode"] + "</td><td class=\"noShow\">" + schoolDetails[i]["Email"] + "</td><td class=\"noShow\">" + schoolDetails[i]["Status"] + "</td><td class=\"noShow\">" + schoolDetails[i]["CountryName"] + "</td><td class='noExl'>"
                      + "<div class='pull-left dp'> <img src='" + imageFileName + "' class='img-responsive' alt='profile pic'></div>"
                        + "<div class='pull-left'> <h4 class='text-blue f_15 text-bold mb-0'><a  id ='" + schoolDetails[i]["InstituteID"] + "_" + schoolDetails[i]["StatusID"] + "' href='#' style='text-overflow: ellipsis;'  title='" + schoolDetails[i]["SchoolName"] + "' class='text-blue schoolClick' data-toggle='modal' data-target=''>"

                       + instituteName + " <a/></h4>"
                        + "<span class='f_12 margin-top-5 inlineBlock text-grey'>" + schoolDetails[i]["InstituteCode"] + "</span> </div> "
                        + "</td>"
            + "<td class='noExl'><span title=" + schoolDetails[i]["Email"] + ">" + instituteEmail + "</span></td>"
                        + "<td>" + schoolDetails[i]["PhoneNo"] + "</td>"
                        + "<td>" + schoolDetails[i]["CreatedDate"] + "</td>"
                        + "<td  style=display:none>" + schoolDetails[i]["Transactions"] + "</td>"
                        + "<td  style=display:none>" + schoolDetails[i]["Revenue"] + "</td>"
                        + "<td width='12%'>" + schoolDetails[i]["BlockReason"] + "</td>";

        if (schoolDetails[i]["StatusID"] == 3) {  // School status as Approved

            tblBdy = "<td class='noExl'>"
                + "<label class='font-green pull-left'>" + schoolDetails[i]["Status"] + "</label>"
                + "<label class='dropdown dropdown-user pull-right margin-right-10 sch_stat'>"
                    + "<a href='#' class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'><i class='fa fa-ellipsis-v'></i></a>"
                    + "<ul class='dropdown-menu dropdown-menu-default'>"
                + "<li><a  id ='" + schoolDetails[i]["InstituteID"] + "' class ='blockAccount'  data-toggle='modal' data-target=''><i class='icon-ban'></i> Block Account </a></li>"
                        + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "' class ='paytabsMarchantAccount' currencycode='" + schoolDetails[i]["Code"] + "'   data-toggle='modal' data-target='paytabs_merch'><i class='fa fa-credit-card'></i> Paytabs Merchant Details </a></li>"
                + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "_" + schoolDetails[i]["StatusID"] + "' class ='viewProfile' ><i class='fa fa-eye'></i> View Profile </a></li>"
                    + "</ul>"
                + "</label>"
             + "</td>"
        }

        else if (schoolDetails[i]["StatusID"] == 4) { // School status as Rejected

            tblBdy = "<td class='noExl'>"
                + "<label class='font-red pull-left'>" + schoolDetails[i]["Status"] + "</label>"
                + "<label class='dropdown dropdown-user pull-right margin-right-10 sch_stat'>"
                    + "<a  class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'><i class='fa fa-ellipsis-v'></i></a>"
                    + "<ul class='dropdown-menu dropdown-menu-default'>"
                        + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "' class ='verifyAccount'  currencycode='" + schoolDetails[i]["Code"] + "'    ><i class='icon-refresh'></i> Re-Verify Account </a></li>"
                        + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "' class ='blockAccount'   ><i class='icon-ban'></i> Block Account </a></li>"
                        //+ "<li><a id ='" + schoolDetails[i]["InstituteID"] + "_" + schoolDetails[i]["StatusID"] + "' class ='viewProfile' ><i class='fa fa-eye'></i> View Profile </a></li>"
                    + "</ul>"
                + "</label>"
             + "</td>"
        }

        else if (schoolDetails[i]["StatusID"] == 2) { // School status as Pending

            tblBdy = "<td class='noExl'>"
                + "<label class='font-yellow-gold pull-left'>" + schoolDetails[i]["Status"] + "</label>"
                + "<label class='dropdown dropdown-user pull-right margin-right-10 sch_stat'>"
                    + "<a  class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'><i class='fa fa-ellipsis-v'></i></a>"
                    + "<ul class='dropdown-menu dropdown-menu-default'>"
                        + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "'  currencycode='" + schoolDetails[i]["Code"] + "'   class ='verifyAccount' ><i class='icon-check'></i> Verify Account </a></li>"
                    + "</ul>"
                + "</label>"
             + "</td>"
        }
        else if (schoolDetails[i]["StatusID"] == 5) { // School status as Blockd

            tblBdy = "<td class='noExl'>"
                + "<label class='pull-left font-maroon'>" + schoolDetails[i]["Status"] + "</label>"
                + "<label class='dropdown dropdown-user pull-right margin-right-10 sch_stat'>"
                    + "<a class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'><i class='fa fa-ellipsis-v'></i></a>"
                    + "<ul class='dropdown-menu dropdown-menu-default'>"
                        + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "'    currencycode='" + schoolDetails[i]["Code"] + "'        class ='deleteAccount' data-toggle='modal'><i class='icon-trash'></i> Un-block </a></li>" //Delete Account
                    + "</ul>"
                + "</label>"
             + "</td>"
        }
        else {
            tblBdy = "<td class='noExl'>"
               + "<label class='pull-left font-maroon'>" + schoolDetails[i]["Status"] + "</label>"
               + "<label class='dropdown dropdown-user pull-right margin-right-10 sch_stat'>"
                   + "<a class='dropdown-toggle' data-toggle='dropdown' data-hover='dropdown' data-close-others='true'><i class='fa fa-ellipsis-v'></i></a>"
                   + "<ul class='dropdown-menu dropdown-menu-default'>"
                      // + "<li><a id ='" + schoolDetails[i]["InstituteID"] + "' class ='deleteAccount' href='#' data-toggle='modal' data-target='#delete_sch'><i class='icon-trash'></i> </a></li>"
                   + "</ul>"
               + "</label>"
            + "</td>"
        }

        finalBody = (tblBody + tblBdy) + "</tr>";
        $(finalBody).appendTo($("#tblBdySchoolDetails"));
        $('.noShow').hide();
      
    }
    if (response.AllSchoolsDetails.length > 10) {
        var pageCount = parseInt(response.AllSchoolsDetails.length / 10);
        $('#myPager').html('');
        $('#tblBdySchoolDetails').pageMe({ pagerSelector: '#myPager', showPrevNext: true, hidePageNumbers: false, Page: pageCount });
    } else {
        $('#myPager').html('');
    }
}

function blockAccount() {
    document.getElementById('hdnInstituteID').value = $(this).attr("id");
    document.getElementById('txtBlockReason').value = "";
    $('#block_sch').modal('show');
}

$("#btnBlockCancel").on("click", function () {
    $('#block_sch').modal('hide');
});

$("#btnBlockYes").on("click", function () {
    var reason = document.getElementById('txtBlockReason').value;
    instituteId = document.getElementById('hdnInstituteID').value;

    if (reason.trim().length == 0 || reason=='' || reason==null) {
        ErrorNotifier("Please enter reason");
        return false;
    }

    else if (reason.trim().length > 120) {
        ErrorNotifier("Reason should be maximum 120 characters");
        return false;
    }

  

    var data = { type: 5, reason: reason, instituteId: instituteId };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            SuccessNotifier(response.Message);
            $('#block_sch').modal('hide');
            //clearValues();
            //getAllSchoolsDetails();
             timeRunner();
        }
        else {
            ErrorNotifier(response.Message);
        }
    });
});

function paytabsMarchantAccount() {
    clearValues();
    $('#paytabs_merch').modal('show');
    clearMarchantValues();
    document.getElementById('hdnInstituteID').value = $(this).attr("id");
    currencycodeformerchantdetails = $(this).attr("currencycode");
    //alert(currencycodeformerchantdetails);
    //document.getElementById('txtSecretKey').value = "";
    //document.getElementById('txtPaytabsEmailID').value = "";
    //document.getElementById('txtBillingAddress').value = "";
    //document.getElementById('txtPayTabsMID').value = "";
    getPaytabsMarchantAccountDetails();
    
}

function getPaytabsMarchantAccountDetails() {
    instituteId = document.getElementById('hdnInstituteID').value;
    var data = { type: 7, instituteId: instituteId };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            if (response.ExistingPaytabsMerchantDetails.length > 0) {
                document.getElementById('txtSecretKey').value = response.ExistingPaytabsMerchantDetails[0]["SecreteKey"];
                document.getElementById('txtPaytabsEmailID').value = response.ExistingPaytabsMerchantDetails[0]["PayTabsUserName"];
                document.getElementById('txtBillingAddress').value = response.ExistingPaytabsMerchantDetails[0]["ShippingAddress"];
                document.getElementById('txtAPayTabsMID').value = response.ExistingPaytabsMerchantDetails[0]["MerchantID"];

                document.getElementById('txtASecretKey').value = response.ExistingPaytabsMerchantDetails[0]["SecreteKey"];
                document.getElementById('txtAPaytabsEmailID').value = response.ExistingPaytabsMerchantDetails[0]["PayTabsUserName"];
                document.getElementById('txtABillingAddress').value = response.ExistingPaytabsMerchantDetails[0]["ShippingAddress"];
                document.getElementById('txtPayTabsMID').value = response.ExistingPaytabsMerchantDetails[0]["MerchantID"];
            }
            if(response.ProcessingFeeDetails.length > 0)
            {
                var currencytypedebit = '';
                var currencytypecredit = '';
                for(var i=0; i< response.ProcessingFeeDetails.length;i++)
                {
                    if (response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId==1) {
                        $("#ddlCreditCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);

                       
                        if ($('#ddlCreditCardConvenienceType').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlCreditCardConvenienceType').val() == 2) {
                            currencytype = '%'
                        }
                        $('#lbltxtCreditCardConvenience').text(currencytype);
                        $("#txtCreditCardConvenience").val(response.ProcessingFeeDetails[i]["Value"]);
                       
                    }

                    else if(response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId==2)
                    {

                        $("#ddlCreditCardConvenienceTypetc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);


                        if ($('#ddlCreditCardConvenienceTypetc').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlCreditCardConvenienceTypetc').val() == 2) {
                            currencytype = '%'
                        }
                        $('#lbltxtCreditCardConveniencetc').text(currencytype);
                        $("#txtCreditCardConveniencetc").val(response.ProcessingFeeDetails[i]["Value"] );

                    }
                     
                    else if(response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 2)
                    {

                        $("#ddlDebitCardConvenienceTypetc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        if ($('#ddlDebitCardConvenienceTypetc').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlDebitCardConvenienceTypetc').val() == 2) {
                            currencytype = '%'
                        }
                        $('#lbltxtDebitCardConveniencetc').text(currencytype);
                        $("#txtDebitCardConveniencetc").val(response.ProcessingFeeDetails[i]["Value"] );
                    }


                    else if (response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                        $("#ddlDebitCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        if ($('#ddlDebitCardConvenienceType').val() == 1)
                        {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlDebitCardConvenienceType').val() == 2)
                        {
                            currencytype='%'
                        }
                        $('#lbltxtDebitCardConvenience').text(currencytype);
                        $("#txtDebitCardConvenience").val(response.ProcessingFeeDetails[i]["Value"] );
                    }

                    if (response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                        $("#ddlCreditCardConvenienceType1").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        if ($('#ddlCreditCardConvenienceType1').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlCreditCardConvenienceType1').val() == 2) {
                            currencytype = '%'
                        }

                        $('#lbltxtCreditCardConvenience1').text(currencytype);
                        $("#txtCreditCardConvenience1").val(response.ProcessingFeeDetails[i]["Value"] );
                      
                    }
                    else if(response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId == 2)
                    {

                        $("#ddlCreditCardConvenienceType1tc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);


                        if ($('#ddlCreditCardConvenienceType1tc').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlCreditCardConvenienceType1tc').val() == 2) {
                            currencytype = '%'
                        }
                        $('#lbltxtCreditCardConvenience1tc').text(currencytype);
                        $("#txtCreditCardConvenience1tc").val(response.ProcessingFeeDetails[i]["Value"] );

                    }

                



                    else if (response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                        $("#ddlDebitCardConvenienceType1").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        if ($('#ddlCreditCardConvenienceType1').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlCreditCardConvenienceType1').val() == 2) {
                            currencytype = '%'
                        }

                        $('#lbltxtDebitCardConvenience1').text(currencytype);
                        $("#txtDebitCardConvenience1").val(response.ProcessingFeeDetails[i]["Value"] );
                    }


                    else if (response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 2) {


                        $("#ddlDebitCardConvenienceType1tc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        if ($('#ddlDebitCardConvenienceType1tc').val() == 1) {
                            currencytype = currencycodeformerchantdetails;
                        }
                        if ($('#ddlDebitCardConvenienceType1tc').val() == 2) {
                            currencytype = '%'
                        }

                        $('#lbltxtDebitCardConvenience1tc').text(currencytype);
                        $("#txtDebitCardConvenience1tc").val(response.ProcessingFeeDetails[i]["Value"] );
                    }
                }
            }
        }
        else {
        }
    });
}

function getDiscountTypes() {
    
    var data = { type: 2 };
    var discountTypes = "<option value='0'> Select </option>"
    request.Initiate("/AjaxHandlers/Finance1.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            for (var i = 0; i < response.DiscountTypes.length > 0; i++)
            {
                discountTypes += "<option value='" + response.DiscountTypes[i].Id + "'>" + response.DiscountTypes[i].Type + "</option>";
            }
            
        }
        else {

        }
        $("#ddlDebitCardConvenienceType,#ddlCreditCardConvenienceType, #ddlDebitCardConvenienceTypetc, #ddlCreditCardConvenienceTypetc").html(discountTypes);
        $("#ddlDebitCardConvenienceType1,#ddlCreditCardConvenienceType1,#ddlDebitCardConvenienceType1tc,#ddlCreditCardConvenienceType1tc").html(discountTypes);
    });
}

$("#btnUpdate").on("click", function () {

    instituteId = document.getElementById('hdnInstituteID').value;
    var secreteKey = document.getElementById('txtSecretKey').value;
    var merchantEmail = document.getElementById('txtPaytabsEmailID').value;
    var shippingAddress = document.getElementById('txtBillingAddress').value;
    var txtPayTabsMID = document.getElementById('txtPayTabsMID').value;
    var debitCardConvinienceFeeTypeId = "0"
    debitCardConvinienceFeeTypeId = document.getElementById('ddlDebitCardConvenienceType').value;
    var debitCardConvinienceFeeTypeIdtc = "0"
    debitCardConvinienceFeeTypeIdtc = document.getElementById('ddlDebitCardConvenienceTypetc').value;
    
    var creditCardConvinienceFeeTypeId = "0";
    creditCardConvinienceFeeTypeId = document.getElementById('ddlCreditCardConvenienceType').value;

    var creditCardConvinienceFeeTypeIdtc = "0";
    creditCardConvinienceFeeTypeIdtc = document.getElementById('ddlCreditCardConvenienceTypetc').value;
    var debitCardConvinienceFeeValue = 0;
    debitCardConvinienceFeeValue = document.getElementById('txtDebitCardConvenience').value = "" ? 0 : document.getElementById('txtDebitCardConvenience').value;
    var debitCardConvinienceFeeValuetc = 0;
    debitCardConvinienceFeeValuetc = document.getElementById('txtDebitCardConveniencetc').value = "" ? 0 : document.getElementById('txtDebitCardConveniencetc').value;
    var creditCardConvinienceFeeValue = 0;
    creditCardConvinienceFeeValue = document.getElementById('txtCreditCardConvenience').value = "" ? 0 : document.getElementById('txtCreditCardConvenience').value;
    var creditCardConvinienceFeeValuetc = 0;
    creditCardConvinienceFeeValuetc = document.getElementById('txtCreditCardConveniencetc').value = "" ? 0 : document.getElementById('txtCreditCardConveniencetc').value;


    if (secreteKey.trim().length == 0) {
        ErrorNotifier("Please enter secrete Key");
        return false;
    }
   
    else if (merchantEmail.trim().length == 0) {
        ErrorNotifier("Please enter paytabs user name");
        return false;
    }
    else if (shippingAddress.trim().length == 0) {
        ErrorNotifier("Please enter Billing Address");
        return false;
    }
    var reEmail = /^([\w\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!merchantEmail.match(reEmail)) {
        ErrorNotifier("Please enter valid email address.");
        return false;
    }
    if (txtPayTabsMID.trim().length == 0) {
        ErrorNotifier("Please enter PayTabs MID");
        return false;
    }
    //if (debitCardConvinienceFeeTypeId == "0") {
    //    ErrorNotifier("Please select debit card convinience fee type");
    //    return false;
    //}
    if (debitCardConvinienceFeeTypeId == "0" && debitCardConvinienceFeeValue.trim().length != 0) {
        ErrorNotifier("Please select debit card convinience fraud fee type");
        return false;
    }
    else if (debitCardConvinienceFeeTypeIdtc == "0" && debitCardConvinienceFeeValuetc.trim().length != 0) {
        ErrorNotifier("Please select debit card convinience  transaction fee type");
        return false;

    }
    else if (creditCardConvinienceFeeTypeId == "0" && creditCardConvinienceFeeValue.trim().length != 0) {
        ErrorNotifier("Please select credit card convinience fraud fee type");
        return false;
    }

    else if (creditCardConvinienceFeeTypeIdtc == "0" && creditCardConvinienceFeeValuetc.trim().length != 0) {
        ErrorNotifier("Please select credit card convinience transaction fee type");
        return false;

    }
    if (debitCardConvinienceFeeTypeId !="0" && debitCardConvinienceFeeValue.trim().length == 0) {
        ErrorNotifier("Please enter debit card convinience fraud  fee value");
        return false;
    }
    //if (creditCardConvinienceFeeTypeId == "0") {
    //    ErrorNotifier("Please select credit card convinience fee type");
    //    return false;
    //}

    if (debitCardConvinienceFeeTypeIdtc != "0" && debitCardConvinienceFeeValuetc.trim().length == 0)
    {
        ErrorNotifier("Please enter debit card convinience  transaction fee value");
        return false;

    }
    if (creditCardConvinienceFeeTypeId != "0" && creditCardConvinienceFeeValue.trim().length == 0) {
        ErrorNotifier("Please enter credit card convinience fraud fee value");
        return false;
    }
    if (creditCardConvinienceFeeTypeIdtc != "0" && creditCardConvinienceFeeValuetc.trim().length == 0)
    {
        ErrorNotifier("Please enter credit card convinience transaction fee value");
        return false;

    }




    var data = {
        type: 6, secreteKey: secreteKey, instituteId: instituteId, merchantEmail: merchantEmail,
        shippingAddress: shippingAddress, PayTabsMID: txtPayTabsMID, CreditCardProcessingFeeTypeId: creditCardConvinienceFeeTypeId, creditCardConvinienceFeeTypeIdtc:creditCardConvinienceFeeTypeIdtc, debitCardConvinienceFeeTypeIdtc : debitCardConvinienceFeeTypeIdtc,
        DebitCardProcessingFeeTypeId: debitCardConvinienceFeeTypeId, CreditCardProcessingFeeValue: parseFloat(creditCardConvinienceFeeValue),debitCardConvinienceFeeValuetc:parseFloat(debitCardConvinienceFeeValuetc),creditCardConvinienceFeeValuetc:parseFloat(creditCardConvinienceFeeValuetc),
        DebitCardProcessingFeeValue: parseFloat(debitCardConvinienceFeeValue)
    };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            $('#paytabs_merch').hide();
            SuccessNotifier(response.Message);

            //clearValues();
            //getAllSchoolsDetails();
            timeRunner();
        }
        else {
            console.log(response.Message);
            ErrorNotifier(response.Message);
          
        }
    });
    
});








function viewProfile() {
   
    var instituteID; var statusID;
    var InstituteIDDetailID = $(this).attr("id");
    var sid = InstituteIDDetailID.split('_');
    instituteID = btoa(sid[0]);
    statusID = sid[1];

    if (statusID == 3 || statusID == 5)//Active and Block acounts can be redicrect to school details
    {
        var adminUrl = document.getElementById('hdnAdminUrl').value;
        var location = "/SchoolDetails.aspx?InstituteID=";
        var url = (adminUrl + location + instituteID);
        window.open(url);
    }
    
    
}

function verifyAccount() {


    document.getElementById('hdnIsActivateOrUnblock').value = "0";
    document.getElementById('hdnInstituteID').value = $(this).attr("id");
    currencycodeformerchantdetails = $(this).attr("currencycode");
    //alert()
    getSchoolsDetails();
}

function getSchoolsDetails() {
    instituteId = document.getElementById('hdnInstituteID').value;
    var formData = new window.FormData();
    formData.append("type", 1)
    formData.append("instituteId", instituteId);
    formData.append("searchTerm", searchTerm);
    formData.append("statusIDs", statusIDs);
    formData.append("countryIDs", countryIDs);
    formData.append("areaID", areaID);

    request.InitiateFormRequest("/AjaxHandlers/AdminSchool.ashx", "JSON", false, formData, function (response) {
        if (response.Success == true) {
            if (response.AllSchoolsDetails.length > 0) {
                bindSchoolDetails(response);
            }
           
        }
    });
}

function bindSchoolDetails(response) {
    document.getElementById('tblSchoolDetails').innerText = "";
    var tblBody = "<tr> <td>School Code</td> <td>" + response.AllSchoolsDetails[0]["InsCode"] + "</td> </tr>"
        + "<tr> <td>School Name</td> <td>" + response.AllSchoolsDetails[0]["SchoolName"] + "</td> </tr>"
                 // + "<tr> <td>Principal's Name</td> <td>" + response.AllSchoolsDetails[0]["Institutecode"]; +"</td> </tr>"
        + "<tr> <td>School Landline Number</td> <td>" + response.AllSchoolsDetails[0]["LandLineNumber"] + "</td> </tr>"
        + "<tr> <td>School Mobile Number</td> <td>" + response.AllSchoolsDetails[0]["PhoneNo"] + "</td> </tr>"
        //+ "<tr> <td>School Fax Number</td> <td>" + response.AllSchoolsDetails[0]["FaxNumber"] + "</td> </tr>"
        + "<tr> <td>School Address</td> <td>" + response.AllSchoolsDetails[0]["Address"] + "</td> </tr>";

                  $(tblBody).appendTo($("#tblSchoolDetails"));

    $('#Sch_det').modal('show');
}

$("#btnReject").on("click", function () {
    $('#Sch_det').modal('hide');
    $('#Reject_sch').modal('show');
});

function rejectAccount()
{
    instituteId = document.getElementById('hdnInstituteID').value;
    var rejectReason = document.getElementById('txtRejectReason').value;
    var data = { type: 8, instituteId: instituteId, RejectReason: rejectReason };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            SuccessNotifier(response.Message);
            
            timeRunner();
        }
        else {
            ErrorNotifier(response.Message);
        }
    });
}

$("#btnRejectPopupCancel").on("click", function () {
    document.getElementById('txtRejectReason').value = "";
    $('#Sch_det').modal('show');
    $('#Reject_sch').modal('hide');
});

$("#btnRejectPopupYes").on("click", function () {
    var rejectReason = document.getElementById('txtRejectReason').value;
    if (rejectReason.trim().length > 120) {
        ErrorNotifier("Reason should be maximum 120 characters");
        return false;
    }
    rejectAccount();
});


$("#btnProceed").on("click", function () {
    document.getElementById('txtASecretKey').value = "";
    document.getElementById('txtAPaytabsEmailID').value = "";
    document.getElementById('txtABillingAddress').value = "";
    clearMarchantValues();
    $('#Sch_det').modal('hide');
    $('#ActivateSchoolAccount').modal('show');
   
});



//$('#ddlDebitCardConvenienceType').on("change", function () {
    $('#ddlDebitCardConvenienceType').change(function(){
    if ($('#ddlDebitCardConvenienceType').val() == "2") {
        $("#lbltxtDebitCardConvenience").text("%");
    }
    if ($('#ddlDebitCardConvenienceType').val() == "1") {
        $("#lbltxtDebitCardConvenience").text(currencycodeformerchantdetails);
    }
    if($('#ddlDebitCardConvenienceType').val() == "0")
    {
        $("#lbltxtDebitCardConvenience").text('');
    }
});


//$('#ddlDebitCardConvenienceTypetc').on("change", function () {
    $('#ddlDebitCardConvenienceTypetc').change(function(){
    if ($('#ddlDebitCardConvenienceTypetc').val() == "2") {
        $("#lbltxtDebitCardConveniencetc").text("%");
    }
    if ($('#ddlDebitCardConvenienceTypetc').val() == "1") {
        $("#lbltxtDebitCardConveniencetc").text(currencycodeformerchantdetails);
    }
    if ($('#ddlDebitCardConvenienceTypetc').val() == "0") {
        $("#lbltxtDebitCardConveniencetc").text('');
    }
});

//$('#ddlCreditCardConvenienceType').on("change", function () {
    $('#ddlCreditCardConvenienceType').change(function(){
    if ($('#ddlCreditCardConvenienceType').val() == "2") {
        $("#lbltxtCreditCardConvenience").text("%");
    }
    if ($('#ddlCreditCardConvenienceType').val() == "1") {
        $("#lbltxtCreditCardConvenience").text(currencycodeformerchantdetails);
    }
    if ($('#ddlCreditCardConvenienceType').val() == "0") {
        $("#lbltxtCreditCardConvenience").text('');
    }
});
//$('#ddlCreditCardConvenienceTypetc').on("change", function () {
    $('#ddlCreditCardConvenienceTypetc').on("change", function () {
    if ($('#ddlCreditCardConvenienceTypetc').val() == "2") {
        $("#lbltxtCreditCardConveniencetc").text("%");
    }
    if ($('#ddlCreditCardConvenienceTypetc').val() == "1") {
        $("#lbltxtCreditCardConveniencetc").text(currencycodeformerchantdetails);
    }
    if ($('#ddlCreditCardConvenienceTypetc').val() == "0") {
        $("#lbltxtCreditCardConveniencetc").text('');
    }
});








    $('#ddlCreditCardConvenienceType1').change(function () {
        if ($('#ddlCreditCardConvenienceType1').val() == "2") {
            $("#lbltxtCreditCardConvenience1").text("%");
        }
        if ($('#ddlCreditCardConvenienceType1').val() == "1") {
            $("#lbltxtCreditCardConvenience1").text(currencycodeformerchantdetails);
        }
        if ($('#ddlCreditCardConvenienceType1').val() == "0") {
            $("#lbltxtCreditCardConvenience1").text('');
        }
    });


    //$('#ddlDebitCardConvenienceTypetc').on("change", function () {
    $('#ddlDebitCardConvenienceType1').change(function () {
        if ($('#ddlDebitCardConvenienceType1').val() == "2") {
            $("#lbltxtDebitCardConvenience1").text("%");
        }
        if ($('#ddlDebitCardConvenienceType1').val() == "1") {
            $("#lbltxtDebitCardConvenience1").text(currencycodeformerchantdetails);
        }
        if ($('#ddlDebitCardConvenienceType1').val() == "0") {
            $("#lbltxtDebitCardConvenience1").text('');
        }
    });

    //$('#ddlCreditCardConvenienceType').on("change", function () {
    $('#ddlDebitCardConvenienceType1tc').change(function () {
        if ($('#ddlDebitCardConvenienceType1tc').val() == "2") {
            $("#lbltxtDebitCardConvenience1tc").text("%");
        }
        if ($('#ddlDebitCardConvenienceType1tc').val() == "1") {
            $("#lbltxtDebitCardConvenience1tc").text(currencycodeformerchantdetails);
        }
        if ($('#ddlDebitCardConvenienceType1tc').val() == "0") {
            $("#lbltxtDebitCardConvenience1tc").text('');
        }
    });
    //$('#ddlCreditCardConvenienceTypetc').on("change", function () {
    $('#ddlCreditCardConvenienceType1tc').on("change", function () {
        if ($('#ddlCreditCardConvenienceType1tc').val() == "2") {
            $("#lbltxtCreditCardConvenience1tc").text("%");
        }
        if ($('#ddlCreditCardConvenienceType1tc').val() == "1") {
            $("#lbltxtCreditCardConvenience1tc").text(currencycodeformerchantdetails);
        }
        if ($('#ddlCreditCardConvenienceType1tc').val() == "0") {
            $("#lbltxtCreditCardConvenience1tc").text('');
        }
    });

$("#btnActivate").on("click", function () {
    
    instituteId = document.getElementById('hdnInstituteID').value;
    var secreteKey = document.getElementById('txtASecretKey').value;
    var merchantEmail = document.getElementById('txtAPaytabsEmailID').value;
    var shippingAddress = document.getElementById('txtABillingAddress').value;
    var isActivateOrUnblock = document.getElementById('hdnIsActivateOrUnblock').value;
    var txtAPayTabsMID = document.getElementById('txtAPayTabsMID').value;

    var debitCardConvinienceFeeTypeId = "0"
    debitCardConvinienceFeeTypeId = document.getElementById('ddlDebitCardConvenienceType1').value;
    debitCardConvinienceFeeTypeIdtc="0"
    debitCardConvinienceFeeTypeIdtc = document.getElementById('ddlDebitCardConvenienceType1tc').value;
    var creditCardConvinienceFeeTypeId = "0";
    creditCardConvinienceFeeTypeId = document.getElementById('ddlCreditCardConvenienceType1').value;
    var creditCardConvinienceFeeTypeIdtc = "0";
    creditCardConvinienceFeeTypeIdtc = document.getElementById('ddlCreditCardConvenienceType1tc').value;
    var debitCardConvinienceFeeValue = 0;
    debitCardConvinienceFeeValue = document.getElementById('txtDebitCardConvenience1').value == "" ? 0 : document.getElementById('txtDebitCardConvenience1').value;
    var debitCardConvinienceFeeValuetc = 0;
    debitCardConvinienceFeeValuetc = document.getElementById('txtDebitCardConvenience1tc').value == "" ? 0 : document.getElementById('txtDebitCardConvenience1tc').value;
    var creditCardConvinienceFeeValue = 0;
    creditCardConvinienceFeeValue = document.getElementById('txtCreditCardConvenience1').value == "" ? 0 : document.getElementById('txtCreditCardConvenience1').value;
    var creditCardConvinienceFeeValuetc = 0;
    creditCardConvinienceFeeValuetc = document.getElementById('txtCreditCardConvenience1tc').value == "" ? 0 : document.getElementById('txtCreditCardConvenience1tc').value;




    if (secreteKey.trim().length == 0) {
        ErrorNotifier("Please enter secrete Key");
        return false;
    }
    else if (merchantEmail.trim().length == 0) {
        ErrorNotifier("Please enter paytabs user name");
        return false;
    }
    else if (shippingAddress.trim().length == 0) {
        ErrorNotifier("Please enter Billing Address");
        return false;
    }
    
    var reEmail = /^([\w\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (!merchantEmail.match(reEmail)) {
        ErrorNotifier("Please enter valid paytabs username(email)");
        return false;
    }
    if (txtAPayTabsMID.trim().length == 0) {
        ErrorNotifier("Please enter PayTabs MID");
        return false;
    }

    if (debitCardConvinienceFeeTypeId != "0" && debitCardConvinienceFeeValue == 0) {
        ErrorNotifier("Please enter debit card fraud charges  convinience fee  value");
        return false;
    }
    if (debitCardConvinienceFeeTypeIdtc != "0" && debitCardConvinienceFeeValuetc == 0) {
        ErrorNotifier("Please enter debit card  transaction charges convinience fee value");
        return false;
    }

    if (creditCardConvinienceFeeTypeId != "0" && creditCardConvinienceFeeValue == 0) {
        ErrorNotifier("Please enter credit card  fraud charges convinience fee value");
        return false;
    }
    if (creditCardConvinienceFeeTypeIdtc != "0" && creditCardConvinienceFeeValuetc == 0) {
        ErrorNotifier("Please enter credit card convinience transaction charges fee value");  
        return false;
    }

    

    var data = {
        type: 9, secreteKey: secreteKey, instituteId: instituteId, merchantEmail: merchantEmail, shippingAddress: shippingAddress,
        isActivateOrUnblock: isActivateOrUnblock, PayTabsMID: txtAPayTabsMID, CreditCardProcessingFeeTypeId: creditCardConvinienceFeeTypeId,
        DebitCardProcessingFeeTypeId: debitCardConvinienceFeeTypeId, CreditCardProcessingFeeValue: parseFloat(creditCardConvinienceFeeValue),
        DebitCardProcessingFeeValue: parseFloat(debitCardConvinienceFeeValue), creditCardConvinienceFeeTypeIdtc: creditCardConvinienceFeeTypeIdtc, debitCardConvinienceFeeTypeIdtc: debitCardConvinienceFeeTypeIdtc,
        creditCardConvinienceFeeValuetc: parseFloat(creditCardConvinienceFeeValuetc), debitCardConvinienceFeeValuetc: parseFloat(debitCardConvinienceFeeValuetc)
    };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            SuccessNotifier(response.Message);
            $('#ActivateSchoolAccount').modal('hide');
            clearValues();
            //getAllSchoolsDetails();
            timeRunner();

        }
        else {
            ErrorNotifier(response.Message);
        }
    });
});

function deleteAccount() {
    document.getElementById('hdnInstituteID').value = $(this).attr("id");
    $('#delete_sch').modal('show');
}

$("#btnDeleteCancel").on("click", function () {
    $('#delete_sch').modal('hide');
});

$("#btnDeleteYes").on("click", function () {
    instituteId = document.getElementById('hdnInstituteID').value;
   

    var data = { type: 10, instituteId: instituteId };
    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
        if (response.Success == true) {
            SuccessNotifier(response.Message);
            $('#delete_sch').modal('hide');
            //clearValues();
            //getAllSchoolsDetails();
            timeRunner();
        }
        else {
            $("#AccountDeleteContent").text("");
            var body = "Sorry it has been only " + response.Days + " days you have blocked the account you can't delete the account before 30 days after blocking."
            $("#AccountDeleteContent").text(body);
            
            $('#delete_sch').modal('hide');
            $('#delete_schConfirm').modal('show');
        }
    });
});

$("#btnDeleteOk").on("click", function () {
    $('#delete_schConfirm').modal('hide');
   
});

function onlickFunction() {
    clearValues();
    statusIDs = [];
    countryIDs = []; areaID = [];

    // Countries Checking

        $("#country li input[type='checkbox']").each(function () {
            var ischecked = $(this).is(":checked");
            if (ischecked) {
                countryIDs.push($(this).attr("id"));
                }
        });

    // Status Checking

        $("#status li input[type='checkbox']").each(function () {
            var ischecked = $(this).is(":checked");
            if (ischecked) {
                statusIDs.push($(this).attr("id"));
                
            }
            
        });

    // location Checking
        $("#location li input[type='checkbox']").each(function () {
            var ischecked = $(this).is(":checked");
            if (ischecked) {
                areaID.push($(this).attr("id"));

            }

        });

        getAllSchoolsDetails();
}

function timeRunner() {
    var myTimer;
    var sec = 0;
    clearInterval(myTimer);

    myTimer = setInterval(function () {
        if (sec > 0) {
            sec = sec - 1;
            
        } else {
            clearInterval(myTimer);
            redirectionToPage();
        }
    }, 1000);
    return 1;
}


// PAGINATION CODE

$('#excelDownload').on('click', function () {


    $("#tableSchools").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "Schools",
        fileext: ".xlsx",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });

})

// End Custom Define Functions
