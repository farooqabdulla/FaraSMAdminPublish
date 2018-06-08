﻿
var glbcountry = '';
var glblocations = '';
var currencycode = '';
var maxamount = '';
var minamount = '';
var Searchtext = '';
var websiteUrl = $("#hdnWebUrl").val();
$(document).ready(function () {
    //request = new Request();
    var request = new Request();
    GetTransactionList();
    GetCountriesandcities();
    getInstituteAreas();
    $('#filter').click();
    $("#txtSearch").on("keyup", function () {
        searchTerm = '';
        searchTerm = document.getElementById('txtSearch').value;
        GetTransactionList();
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
        GetTransactionList();
    });


})
$('#RefineSearch').on("click", function () {
    $("input[type=checkbox]").removeAttr('checked');
    searchTerm = '';
    glbcountry = '';
    glblocations = '';
    document.getElementById('txtSearch').value = '';
    GetTransactionList();
    if (GetTransactionList.successResponseData.Transactionlist.length == 0) {
        $("#excelDownload").hide();
    }
});


function GetTransactionList() {
    debugger;
    Searchtext = $("#txtSearch").val();
    data = { type: 1, Searchtext: Searchtext,countries:glbcountry,locations:glblocations };
    request.Initiate("/AjaxHandlers/Finance1.ashx", "JSON", false, data, function (successResponseData) {
         debugger
        console.log(successResponseData.Transactionlist);
        $("#excelDownload").show();
        if (successResponseData.Success == true) {
            
            if (successResponseData.Transactionlist.length == 0) {
                $("#excelDownload").hide();
            }
            var html = '';
            $.each(successResponseData.Transactionlist, function (item, index) {
                var Id = btoa(index.Id);
                currencycode = index.code;
                
                html += '<tr><td class=\"noShow\">' + index.name + '</td><td class=\"noShow\">' + index.institutecode + '</td><td class=\"noShow\">' + index.email + '</td><td  class="noExl"><div class="pull-left dp"><img src="' + (index.logopath == "" ? "/assets/admin/img/defaultSchool.png" : websiteUrl + (index.logopath)) + '" class="img-responsive" alt="profile pic"></div>'
                html += '<div class="pull-left"><h4 class="text-blue f_15 text-bold mb-0" style="cursor:pointer" Title="' + index.name + '">' + (index.name.length > 10 ? (index.name.substring(0, 10) + '..') : (index.name)) + '</h4> <span style="cursor:pointer" class="f_12 margin-top-5 inlineBlock text-grey" Title="' + index.institutecode + '">' + (index.institutecode.length > 10 ? (index.institutecode.substring(0, 10) + '..') : (index.institutecode)) + '</span>'
                html += '</div></td><td Title="' + index.email + '" style="cursor:pointer"  class="noExl"> ' + (index.email.length > 22 ? (index.email.substring(0, 20) + '..') : (index.email)) + '</td><td>' + index.ContactNumber + '</td><td class="padl48">' + index.transactions + '</td><td>' + index.Balance + '  ' + index.code + '</td><td class="noExl"><a href="/SchoolDetails.aspx?InstituteID=' + Id + '"><i id=' + index.Id + ' class="pointer pull-right text-blue margin-right-10 fa fa-eye"></i></a></td></tr>'
            });
            //$('#tblTransactionDetails').append(html);
              $('.noShow').hide();
              $("#TRANSACTIONDATA").html(html);
              $('.noShow').hide();
            if (successResponseData.Transactionlist.length > 10) {
                var pageCount = parseInt(successResponseData.Transactionlist.length / 10);
                $('#myPager').html('');
                $('#TRANSACTIONDATA').pageMe({ pagerSelector: '#myPager', showPrevNext: true, hidePageNumbers: false, Page: pageCount });
            } else {
                $('#myPager').html('');
            }
            //maxamount = successResponseData.maxAmount + ' ' + currencycode;
            //minamount = successResponseData.minamount + ' ' + currencycode;
            //Balanceslider();
            $('#DivNoDataFound').hide();
            $('#DivDataFound').show();
        }
        else {
            //ErrorNotifier("no data found");
            //alert("no data found");
            $('#DivNoDataFound').show();
            $('#DivDataFound').hide();
            $("#excelDownload").hide();
        }
    });
}


//function Balanceslider()

//    {
//    var minbalancevalue = $('#minbalanceamount');
//    var maxbalancealues = $('#maxbalanceamount');
//    $('#TraBalanceslider').slider({
//        range: true,
//        min: parseInt(minamount),
//        max: parseInt(maxamount),
//        values: [parseInt(minamount), parseInt(maxamount)],
//        slide: function (event, ui) {
//            minbalancevalue.html(ui.values[0] + ' ' + currencycode);
//            maxbalancealues.html(ui.values[1] + ' ' + currencycode);
//        }, stop: function (event, ui) {
//            var minvalue = parseInt(ui.values[0]);
//            var maxvalue = parseInt(ui.values[1]);
//            var table = document.getElementById("tblTransactionDetails");

//            for (var i = 1, row; row = table.rows[i]; i++) {
//                //iterate through rows (we SKIP the first row: counter starts at 1!)
//                for (var j = 0, col; col = row.cells[j]; j++) {
//                    //iterate through columns: if first column not in range: HIDE, else SHOW

//                    if (j == 4) {             // if first column
//                        if ($(col).html() >= ui.values[0] && $(col).html() <= ui.values[1]) {
//                            // if in interval
//                            $(row).show();
//                        } else {
//                            $(row).hide();
//                        }
//                    }
//                }
//            }
//        }

//    });

//    }

function GetCountriesandcities()
{
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
              //  ErrorNotifier("country  data  not found");
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
            //alert("cities not found");
            //ErrorNotifier(" cites data  not found");
        }
    });
}

$('#excelDownload').on('click', function () {
    $("#tblTransactionDetails").table2excel({
        exclude: ".noExl",
        name: "Excel Document Name",
        filename: "Transactions",
        fileext: ".xlsx",
        exclude_img: true,
        exclude_links: true,
        exclude_inputs: true
    });

})