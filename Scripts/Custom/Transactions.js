
var glbcountry = '';
var glblocations = '';
var currencycode = '';
var maxamount = '';
var minamount = '';
var Searchtext = '';
$(document).ready(function () {
    //request = new Request();
    var request = new Request();
    GetTransactionList();
    GetCountriesandcities();
    getInstituteAreas();

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

function GetTransactionList() {
    debugger;
    Searchtext = $("#txtSearch").val();
    data = { type: 1, Searchtext: Searchtext,countries:glbcountry,locations:glblocations };
    request.Initiate("/AjaxHandlers/Finance1.ashx", "JSON", false, data, function (successResponseData) {
         debugger
        console.log(successResponseData.Transactionlist);

        if (successResponseData.Success == true) {
            
            var html = '';
            $.each(successResponseData.Transactionlist, function (item, index) {
                var Id = btoa(index.Id);
                currencycode = index.code;
                html += '<tr><td><div class="pull-left dp"><img src="' + (index.logopath == "" ? "/assets/admin/img/defaultSchool.png" : ('/' + index.logopath)) + '" class="img-responsive" alt="profile pic"></div>'
                html += '<div class="pull-left"><h4 class="text-blue f_15 text-bold mb-0">' + index.name + '</h4> <span class="f_12 margin-top-5 inlineBlock text-grey">' + index.institutecode +'</span>'
                html += '</div></td><td>' + index.email + '</td><td>' + index.ContactNumber + '</td><td>' + index.transactions + '</td><td>' + index.Balance + '  ' + index.code + '</td><td><a href="/SchoolDetails.aspx?InstituteID=' + Id + '"><i id=' + index.Id + ' class="pointer pull-right text-blue margin-right-10 fa fa-eye"></i></a></td></tr>'
            });
            //$('#tblTransactionDetails').append(html);
            $("#TRANSACTIONDATA").html(html);
            //maxamount = successResponseData.maxAmount + ' ' + currencycode;
            //minamount = successResponseData.minamount + ' ' + currencycode;
            //Balanceslider();
        }
           


        else {
            ErrorNotifier("no data found");
            //alert("no data found");

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
                ErrorNotifier("country  data  not found");
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
            ErrorNotifier(" cites data  not found");
        }
    });
}