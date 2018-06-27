//var currentDate = new Date();
//var startDate = currentDate.toJSON().slice(0, 10).replace(/-/g, '-');
//currentDate.setMonth(currentDate.getMonth() - 1);
//var endDate = currentDate.toJSON().slice(0, 10).replace(/-/g, '-');
//$('#inputStartDate').val(endDate);
//$('#inputEndDate').val(startDate);
var colorClassArray = ["text-warning", "font-blue", "font-green", "font-red", "text-dark"];
var currency = "";


$(document).ready(function () {



    var FromEndDate = new Date();
    FromEndDate.setDate(FromEndDate.getDate());
    var day = FromEndDate.getDate();
    var month = ((FromEndDate.getMonth() + 1) - (1));
    var year = FromEndDate.getFullYear();
    console.log(day + "......." + month + "....." + year)
    FromEndDate = day + "-" + month + "-" + year;

    var EndDate = new Date();
    EndDate.setDate(EndDate.getDate());
    var day1 = EndDate.getDate();
    var month1 = EndDate.getMonth() + 1;
    var year1 = EndDate.getFullYear();
    console.log(day + "......." + month + "....." + year)
    EndDate = day1 + "-" + month1 + "-" + year1;
   
    $("#inputStartDate,#inputEndDate").datepicker({
        format: 'dd-mm-yyyy',
        changeMonth: true,
        changeYear: true,
        autoclose: true,
        todayHighlight: true
    });
    $("#inputStartDate").datepicker('update', FromEndDate);
    $("#inputEndDate").datepicker('update', EndDate);


    var request = new Request();
    var instituteId = getParameterByName("InstituteID");
    var totalRevenueData = {
        animationEnabled: true,
        axisX: {
            title: "Days",
            interval: 1,
            intervalType: "day",
            valueFormatString: "D"
        },
        axisY: {
            //valueFormatString: "#0,,.",
            title: "Revenue Generated ",
            gridColor: "rgba(232,232,232,1)",
            tickLength: 0,
            includeZero: true,
            lineThickness: 1
        },
        data: [{
            type: "stepArea",
            color: "rgba(0, 132, 254, 0.62)",
            markerSize: 5,
            xValueFormatString: "D MMM YYYY",
            dataPoints: []
        }]
    };
    getInstituteDetails();
    getInstituteDashBoardForAdmin();
    GetInstituteAcademicYears();
    GetFeeSummary();
    GetSchoolRevenueForLastMonth();
    getDiscountTypes();
    GetPaymentStatuses();
    GetSchoolTransactionsForAdmin();
    
    GetPayTabsMerchantDetails();
    $('#txtDebitCardConvenience,#txtDebitCardConveniencetc,#txtCreditCardConvenience,#txtCreditCardConveniencetc').keyup(decimalValidator);
    $('#txtDebitCardConvenience1,#txtDebitCardConvenience1tc,#txtCreditCardConvenience1,#txtCreditCardConvenience1tc').keyup(decimalValidator);
    function getInstituteDetails() {
        var data = { type: 11, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                var logoPath = ((res.InstituteDetails[0].logopath == '') ? "/Images/ProfileImages/SchoolDefault.png" : res.InstituteDetails[0].logopath);
                $("#imgSchoolLogo").attr("src", $('#hdnWebUrl').val() + logoPath);
                $("#h3SchoolName").html(res.InstituteDetails[0].Name);
                $("#labelSchoolEmail").html(res.InstituteDetails[0].Email);
                $("#labelSchoolContactNo").html(res.InstituteDetails[0].ContactNumber);
                $("#labelInstituteCode").html(res.InstituteDetails[0].institutecode);
                $("#spanSchoolAddress").html(res.InstituteDetails[0].Address);
                $("#spanSchoolCityName").html(res.InstituteDetails[0].CityName);
                $("#spanSchoolStateName").html(res.InstituteDetails[0].StateName);
                $('#spanSchoolCountryName').html(res.InstituteDetails[0].CountryName);
                $('#spanSchoolStateName').html(res.InstituteDetails[0].StateName);
                currency = res.InstituteDetails[0].Currency;

                //// Begin Delete account block account
                document.getElementById("blockAccountOrDeleteAccount").style.visibility = "hidden";
                $('#blockAccountText').html(' ');

                if (res.InstituteDetails[0].StatusID == 2 || res.InstituteDetails[0].StatusID == 3 || res.InstituteDetails[0].StatusID == 4) // Institute Statuses
                {
                    document.getElementById('hdnBlockOrDeleteSchoolAccount').value = "1"; // if 1 then
                    $('#blockAccountText').html('Block Account');
                    document.getElementById("blockAccountOrDeleteAccount").style.visibility = "visible";
                }
                else if (res.InstituteDetails[0].StatusID == 5) // Block Account to delete
                {
                    document.getElementById('hdnBlockOrDeleteSchoolAccount').value = "2"; // if 1 then
                    $('#blockAccountText').html('Un-bolck Account');
                    document.getElementById("blockAccountOrDeleteAccount").style.visibility = "visible";
                }
                
                else {
                    document.getElementById('hdnBlockOrDeleteSchoolAccount').value = "0";
                    document.getElementById("blockAccountOrDeleteAccount").style.visibility = "hidden";
                }

                //// End Delete account block aacount
            }
        })
    }
    function getInstituteDashBoardForAdmin() {
        var data = { type: 12, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                $("#labelTotalTrnsToday").html(res.TransactionsToday + " " + currency);
                $("#labelAvailableBalance").html(res.AvailableWalletBalance + " " + currency);
                $("#noOfTrns").html(res.NumberOfTransactions);
                $("#h3TotalAcademicYear").html(res.NumberOfAcademicYears);
                $("#h3TotalClasses").html(res.NumberOfClasses);
                $("#h3TotalSections").html(res.NumberOfSections);
                $("#h3TotalFeeCategories").html(res.NumberOfFeeCategories);
                $('#h3TotalFeeDiscount').html(res.NumberOfFeeDiscounts);
                $('#h3TotalFeeFine').html(res.NumberOfFines);
                if (res.RecentActivities.length==0) {
                    $('#noDataRecent').show();
                } else {
                    $('#noDataRecent').hide();
                    $('#ulRecentActs').empty();
                    $.each(res.RecentActivities, function () {
                        $('#ulRecentActs').append('<li><div class="clearfix"><label class="pull-left">'
                            + this.Activity
                            + '</label><label class="pull-right bold-6">'
                            + this.DaysAgo + ' Days Ago' + '</label></div></li>')
                    })        
                }
                
                //var percentage = CalculatePercentage(res.TransactionsPreviousDay, res.TransactionsToday);
                //alert(percentage);
                //$('#percentageTransactionToday').html(percentage);
                //var percentFlag = (res.TransactionsPreviousDay < res.TransactionsToday);
                //alert(percentFlag);


            }
        })
    }

    function GetInstituteAcademicYears() {
        var data = { type: 13, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                $.each(res.AcademicYears, function () {
                    $("#selectAcademicYear").append($("<option>").val(this.Id).text(this.Name));
                });

            }

        })
    }

    function GetSchoolRevenueForLastMonth() {
        var data = { type: 14, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                totalRevenueData.axisY.prefix = res.CurrencyCode + " ";
                totalRevenueData.data[0].yValueFormatString = res.CurrencyCode + " #,##0.##";
                $.each(res.RevenueTable, function () {
                    totalRevenueData.data[0].dataPoints.push({ x: new Date(this.Dates.replace(/\-/g, ',')), y: this.Column1 });
                });
                $("#divRevenue").CanvasJSChart(totalRevenueData);
            }
        })
    }

    function GetPayTabsMerchantDetails() {
        var data = { type: 15, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                $("#inputSecretKey").val(res.MerchantDetails[0].SecreteKey);
                $("#inputPayTabsUserName").val(res.MerchantDetails[0].PayTabsUserName);
                $("#inputMerchantId").val(res.MerchantDetails[0].MerchantId);
                $("#inputAddress").val(res.MerchantDetails[0].ShippingAddress);
                if(res.ProcessingFeeDetails.length > 0)
                {
                    var currencytype = '';
                    for(var i=0; i< res.ProcessingFeeDetails.length;i++)
                    {
                        if (res.ProcessingFeeDetails[i].CardId == 1 && res.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                            $("#ddlCreditCardConvenienceType1").val(res.ProcessingFeeDetails[i]["FeeTypeId"]);
                            if ($('#ddlCreditCardConvenienceType1').val() == 1) {
                                currencytype = currency;
                            }
                            if ($('#ddlCreditCardConvenienceType1').val() == 2) {
                                currencytype = '%'
                            }

                            $('#lbltxtCreditCardConvenience1').text(currencytype);
                            $("#txtCreditCardConvenience1").val(res.ProcessingFeeDetails[i]["Value"]);
                      
                        }
                        else if (res.ProcessingFeeDetails[i].CardId == 1 && res.ProcessingFeeDetails[i].processingfeechargeId == 2) {

                            $("#ddlCreditCardConvenienceType1tc").val(res.ProcessingFeeDetails[i]["FeeTypeId"]);


                             if ($('#ddlCreditCardConvenienceType1tc').val() == 1) {
                                 currencytype = currency;
                             }
                             if ($('#ddlCreditCardConvenienceType1tc').val() == 2) {
                                 currencytype = '%'
                             }
                             $('#lbltxtCreditCardConvenience1tc').text(currencytype);
                             $("#txtCreditCardConvenience1tc").val(res.ProcessingFeeDetails[i]["Value"]);

                         }

                        else if (res.ProcessingFeeDetails[i].CardId == 2 && res.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                            $("#ddlDebitCardConvenienceType1").val(res.ProcessingFeeDetails[i]["FeeTypeId"]);
                             if ($('#ddlCreditCardConvenienceType1').val() == 1) {
                                 currencytype = currency;
                             }
                             if ($('#ddlCreditCardConvenienceType1').val() == 2) {
                                 currencytype = '%'
                             }

                             $('#lbltxtDebitCardConvenience1').text(currencytype);
                             $("#txtDebitCardConvenience1").val(res.ProcessingFeeDetails[i]["Value"]);
                         }


                        else if (res.ProcessingFeeDetails[i].CardId == 2 && res.ProcessingFeeDetails[i].processingfeechargeId == 2) {


                            $("#ddlDebitCardConvenienceType1tc").val(res.ProcessingFeeDetails[i]["FeeTypeId"]);
                             if ($('#ddlDebitCardConvenienceType1tc').val() == 1) {
                                 currencytype = currency;
                             }
                             if ($('#ddlDebitCardConvenienceType1tc').val() == 2) {
                                 currencytype = '%'
                             }

                             $('#lbltxtDebitCardConvenience1tc').text(currencytype);
                             $("#txtDebitCardConvenience1tc").val(res.ProcessingFeeDetails[i]["Value"]);
                         }
                    }
                    
                }
            }
        })
    }



    $('#ddlDebitCardConvenienceType').change(function () {
        if ($('#ddlDebitCardConvenienceType').val() == "2") {
            $("#lbltxtDebitCardConvenience").text("%");
        }
        if ($('#ddlDebitCardConvenienceType').val() == "1") {
            $("#lbltxtDebitCardConvenience").text(currency);
        }
    });


    //$('#ddlDebitCardConvenienceTypetc').on("change", function () {
    $('#ddlDebitCardConvenienceTypetc').change(function () {
        if ($('#ddlDebitCardConvenienceTypetc').val() == "2") {
            $("#lbltxtDebitCardConveniencetc").text("%");
        }
        if ($('#ddlDebitCardConvenienceTypetc').val() == "1") {
            $("#lbltxtDebitCardConveniencetc").text(currency);
        }
    });

    //$('#ddlCreditCardConvenienceType').on("change", function () {
    $('#ddlCreditCardConvenienceType').change(function () {
        if ($('#ddlCreditCardConvenienceType').val() == "2") {
            $("#lbltxtCreditCardConvenience").text("%");
        }
        if ($('#ddlCreditCardConvenienceType').val() == "1") {
            $("#lbltxtCreditCardConvenience").text(currency);
        }
    });
    //$('#ddlCreditCardConvenienceTypetc').on("change", function () {
    $('#ddlCreditCardConvenienceTypetc').on("change", function () {
        if ($('#ddlCreditCardConvenienceTypetc').val() == "2") {
            $("#lbltxtCreditCardConveniencetc").text("%");
        }
        if ($('#ddlCreditCardConvenienceTypetc').val() == "1") {
            $("#lbltxtCreditCardConveniencetc").text(currency);
        }
    });
    $('#ddlCreditCardConvenienceType1').change(function () {
        if ($('#ddlCreditCardConvenienceType1').val() == "2") {
            $("#lbltxtCreditCardConvenience1").text("%");
        }
        if ($('#ddlCreditCardConvenienceType1').val() == "1") {
            $("#lbltxtCreditCardConvenience1").text(currency);
        }
    });


    //$('#ddlDebitCardConvenienceTypetc').on("change", function () {
    $('#ddlDebitCardConvenienceType1').change(function () {
        if ($('#ddlDebitCardConvenienceType1').val() == "2") {
            $("#lbltxtDebitCardConvenience1").text("%");
        }
        if ($('#ddlDebitCardConvenienceType1').val() == "1") {
            $("#lbltxtDebitCardConvenience1").text(currency);
        }
    });

    //$('#ddlCreditCardConvenienceType').on("change", function () {
    $('#ddlDebitCardConvenienceType1tc').change(function () {
        if ($('#ddlDebitCardConvenienceType1tc').val() == "2") {
            $("#lbltxtDebitCardConvenience1tc").text("%");
        }
        if ($('#ddlDebitCardConvenienceType1tc').val() == "1") {
            $("#lbltxtDebitCardConvenience1tc").text(currency);
        }
    });
    //$('#ddlCreditCardConvenienceTypetc').on("change", function () {
    $('#ddlCreditCardConvenienceType1tc').on("change", function () {
        if ($('#ddlCreditCardConvenienceType1tc').val() == "2") {
            $("#lbltxtCreditCardConvenience1tc").text("%");
        }
        if ($('#ddlCreditCardConvenienceType1tc').val() == "1") {
            $("#lbltxtCreditCardConvenience1tc").text(currency);
        }
    });
    $('#btnSave').on('click', function () {
        var secretKey = $("#inputSecretKey").val();
        var userName = $("#inputPayTabsUserName").val();
        var merchantId = $("#inputMerchantId").val();
        var shippingAddress = $("#inputAddress").val();

        var debitCardConvinienceFeeTypeId = "0"
        debitCardConvinienceFeeTypeId = document.getElementById('ddlDebitCardConvenienceType1').value;
       
        var debitCardConvinienceFeeTypeIdtc = "0"
        debitCardConvinienceFeeTypeIdtc = document.getElementById('ddlDebitCardConvenienceType1tc').value;
        var creditCardConvinienceFeeTypeId = "0";
        creditCardConvinienceFeeTypeId = document.getElementById('ddlCreditCardConvenienceType1').value;
        var creditCardConvinienceFeeTypeIdtc = "0";
        creditCardConvinienceFeeTypeIdtc = document.getElementById('ddlCreditCardConvenienceType1tc').value;

        var debitCardConvinienceFeeValue = 0;
        debitCardConvinienceFeeValue = document.getElementById('txtDebitCardConvenience1').value = "" ? 0 : document.getElementById('txtDebitCardConvenience1').value;
        var debitCardConvinienceFeeValuetc = 0;
        debitCardConvinienceFeeValuetc = document.getElementById('txtDebitCardConvenience1tc').value = "" ? 0 : document.getElementById('txtDebitCardConvenience1tc').value;
        var creditCardConvinienceFeeValue = 0;
        creditCardConvinienceFeeValue = document.getElementById('txtCreditCardConvenience1').value = "" ? 0 : document.getElementById('txtCreditCardConvenience1').value;
        var creditCardConvinienceFeeValuetc = 0;
        creditCardConvinienceFeeValuetc = document.getElementById('txtCreditCardConvenience1tc').value = "" ? 0 : document.getElementById('txtCreditCardConvenience1tc').value;
        
        if (secretKey.trim().length == 0) {
            ErrorNotifier("Oops, you didn't enter secret key.");
            return false;
        } else if (userName.trim().length == 0) {
            ErrorNotifier("Oops, you didn't User Name.");
            return false;
        } else if (merchantId.trim().length == 0) {
            ErrorNotifier("Oops, you didn't enter a Merchant Id.");
            return false;
        } else if (shippingAddress.trim().length == 0) {
            ErrorNotifier("Oops, you didn't enter address.");
            return false;
        }

       else if (debitCardConvinienceFeeTypeId != "0" && debitCardConvinienceFeeValue.trim().length == 0) {
            ErrorNotifier("Please enter debit card convinience fee value");
            return false;
        }
       else if (debitCardConvinienceFeeTypeIdtc != "0" && debitCardConvinienceFeeValuetc.trim().length == 0) {
            ErrorNotifier("Please enter debit card convinience  transaction fee value");
            return false;

        }
       else if (creditCardConvinienceFeeTypeId != "0" && creditCardConvinienceFeeValue.trim().length == 0) {
            ErrorNotifier("Please enter credit card convinience fee value");
            return false;
       }

       else if (creditCardConvinienceFeeTypeIdtc != "0" && creditCardConvinienceFeeValuetc.trim().length == 0) {
            ErrorNotifier("Please enter credit card  transaction convinience fee value");
            return false;

        }


       else {
           var data = {
               type: 16, instituteId: instituteId, secretKey: secretKey, userName: userName, shippingAddress: shippingAddress, merchantId: merchantId
               , CreditCardProcessingFeeTypeId: creditCardConvinienceFeeTypeId, creditCardConvinienceFeeTypeIdtc: creditCardConvinienceFeeTypeIdtc, DebitCardProcessingFeeTypeId: debitCardConvinienceFeeTypeId, debitCardConvinienceFeeTypeIdtc: debitCardConvinienceFeeTypeIdtc, CreditCardProcessingFeeValue: parseFloat(creditCardConvinienceFeeValue),
               DebitCardProcessingFeeValue: parseFloat(debitCardConvinienceFeeValue), debitCardConvinienceFeeValuetc: parseFloat(debitCardConvinienceFeeValuetc), creditCardConvinienceFeeValuetc: parseFloat(creditCardConvinienceFeeValuetc)
           };
            request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
                if (res.Success == true) {
                    SuccessNotifier(res.Message);
                } else if (res.Success == false) {
                    ErrorNotifier(res.Message);
                } 
            })

        }
    })

    function GetFeeSummary() {
        var data = { type: 17, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                $("#labelTotalFeeEstm").html(res.FeeSummary[0].TotalEstimationFee + " " + currency);
                $("#labelTotalCollected").html(res.FeeSummary[0].TotalPaidOnline + " " + currency);
                $("#labelTotalFeeDue").html(res.FeeSummary[0].TotalFeeDue + " " + currency);
            }
        })
    }

    function GetPaymentStatuses() {
        var data = { type: 18 };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                $.each(res.PaymentStatus, function () {
                    $("#selectTransactionStatus").append($("<option>").val(this.Id).text(this.Status));
                });
            }
        })
    }

    function GetSchoolTransactionsForAdmin() {
        var statusId = $('#selectTransactionStatus').find("option:selected").val();
        var numberOfRecords = $('#selectRecordsToShow').find("option:selected").val();
        startDate = $('#inputStartDate').val();
        endDate = $('#inputEndDate').val();
        var data = { type: 19, instituteId: instituteId, statusId: statusId, startDate: startDate, endDate: endDate, numberOfRecords: numberOfRecords };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {

            if (res.Success == true) {
                $('#tBodyTransactions').empty();
                if (res.TransactionsTable.length == 0) {
                    $('#tBodyTransactions').empty();
                    $('#noDataTr').show();

                } else {
                    $('#noDataTr').hide();
                    //$('#tBodyTransactions').empty();
                    $.each(res.TransactionsTable, function () {
                        $("#tBodyTransactions").append(
                            "<tr><td>" + this.OrderId + "</td><td>" + this.PaymentMode + "</td><td>" + this.Amount + "</td><td>" + this.DateNTime
                            + "</td><td>" + this.PayeeName + "</td><td>" + this.PayeeEmail + "</td><td>" + this.PayeeMobile +
                            "</td><td><label class=\"" + colorClassArray[(this.PaymentStatusId) - 1] + "\">" + this.Status
                            + "</label></td><td class=\"text-center\"><a data-toggle=\"modal\" data-target=\"#trans_det\"><i  paymentId=\"" + this.PaymentId + "\" class=\"fa fa-eye text-blue\"></i></a></td></tr>");
                    });
                }
                
                
            }
        })
    }

    function GetTransactionDetailsForAdmin(paymentId) {
        var data = { type: 20, paymentId: paymentId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                var studentId = 0;
                var addressFlag = false;
                var studentName = "";
                for (var i = 0; i < res.TransactionDetails.length; i++) {
                    if (studentId != res.TransactionDetails[i].StudentId) {
                        studentName += res.TransactionDetails[i].StudentName + ', ';
                        if (!(addressFlag) && res.TransactionDetails[i].CountryName != "N/A") {
                            $('#modalCountry').html(res.TransactionDetails[i].CountryName);
                            $('#modalAddress').html(res.TransactionDetails[i].Address);
                            $('#modalCity').html(res.TransactionDetails[i].CityName);
                            $('#modalState').html(res.TransactionDetails[i].StateName);
                            $('#modalPostal').html(res.TransactionDetails[i].PostalCode);
                            $('#idReason').html(res.TransactionDetails[i].Reason);
                            
                            addressFlag = true;
                        }
                        studentId = res.TransactionDetails[i].StudentId;
                    } else {
                        continue;
                    }
                }
                studentName = studentName.replace(/,\s*$/, "");
                $('#modalStudentName').html(studentName);
                if (!addressFlag) {
                    $('#modalCountry').html("N/A");
                    $('#modalAddress').html("N/A");
                    $('#modalCity').html("N/A");
                    $('#modalState').html("N/A");
                    $('#modalPostal').html("N/A");
                    $('#idReason').html("N/A");
                }
            }
        })
    }

    function CalculatePercentage(prevDay, toDay) {
        if (prevDay == 0 && toDay == 0) {
            return 0;
        }
        if (isNaN(prevDay) || isNaN(prevDay)) {
            return " ";
        } else {
            return ((toDay / prevDay) * 100).toFixed(3);
        }

    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        console.log(results);
        if (!results) return null;
        if (!results[2]) return '';
        //return decodeURIComponent(results[2].replace(/\+/g, " "));
        return atob(results[2].replace(/\+/g, " "));
    }




    $(document).on("click", ".fa-eye", function () {
        var paymentId = this.getAttribute("paymentId");
        var amount = $(this).closest('tr').find('td:eq(2)').text();
        var time = $(this).closest('tr').find('td:eq(3)').text();
        var status = $(this).closest('tr').find('td:eq(7)').text();
        $('#modalTrAmount').html(amount);
        $('#modalTrTime').html(time);
        
        if (status == "PAID")
        {
            $('#modalPaymntStatus').html('<label class="pull-left font-green bold">' + status + '</label>');
        }
        else if (status == "INITIATED") {
            $('#modalPaymntStatus').html('<label class="pull-left font-blue bold">' + status + '</label>');
        }
        else if (status == "NOT_PAID") {
            $('#modalPaymntStatus').html('<label class="pull-left text-warning bold">' + status + '</label>');
        }
        else
        {
            $('#modalPaymntStatus').html('<label class="pull-left font-red bold">' + status + '</label>');
        }
        $('#PayDet').trigger('click');
        GetTransactionDetailsForAdmin(paymentId);

    });

    //$("#inputStartDate,#EndDate").datepicker({
    //    format: 'dd-mm-yyyy',
    //    changeMonth: true,
    //    changeYear: true,
    //    autoclose: true,
    //    todayHighlight: true
    //});
    $("#inputStartDate,#inputEndDate,#selectTransactionStatus,#selectRecordsToShow").on('change', function () {
        GetSchoolTransactionsForAdmin();
    });



    /////////////////////////// Ayyappa //////////////////////////////////////


    $("#blockAccountOrDeleteAccount").on("click", function () {
        document.getElementById('txtBlockReason').value = "";
        if (document.getElementById('hdnBlockOrDeleteSchoolAccount').value == 1) // Block Account
        {
            $('#block_sch').modal('show');
        }
        else if(document.getElementById('hdnBlockOrDeleteSchoolAccount').value == 2) // Delete Account
        {
            //$('#delete_sch').modal('show');
            clearMarchantValues();
            getPaytabsMarchantAccountDetails();
            $('#ActivateSchoolAccount').modal('show');
            
        }
    });

    function clearMarchantValues() {
        $('#txtASecretKey').val('');
        $('#txtAPaytabsEmailID').val('');
        $('#txtABillingAddress').val('');
    }


    function getPaytabsMarchantAccountDetails() {

        var data = { type: 7, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
            if (response.Success == true) {
                if (response.ExistingPaytabsMerchantDetails.length > 0) {
                    document.getElementById('txtASecretKey').value = response.ExistingPaytabsMerchantDetails[0]["SecreteKey"];
                    document.getElementById('txtAPaytabsEmailID').value = response.ExistingPaytabsMerchantDetails[0]["PayTabsUserName"];
                    document.getElementById('txtABillingAddress').value = response.ExistingPaytabsMerchantDetails[0]["ShippingAddress"];
                    document.getElementById('txtAPayTabsMID').value = response.ExistingPaytabsMerchantDetails[0]["MerchantID"];
                }
                if (response.ProcessingFeeDetails.length > 0) {
                    for (var i = 0; i < response.ProcessingFeeDetails.length; i++) {
                        //if (response.ProcessingFeeDetails[i].CardId == 1) {
                        //    $("#txtCreditCardConvenience").val(response.ProcessingFeeDetails[i]["Value"]);
                        //    $("#ddlCreditCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        //}
                        //else if (response.ProcessingFeeDetails[i].CardId == 2) {
                        //    $("#ddlDebitCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                        //    $("#txtDebitCardConvenience").val(response.ProcessingFeeDetails[i]["Value"]);
                        //}
                        if (response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                            $("#ddlCreditCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);


                            if ($('#ddlCreditCardConvenienceType').val() == 1) {
                                currencytype = currency;
                            }
                            if ($('#ddlCreditCardConvenienceType').val() == 2) {
                                currencytype = '%'
                            }
                            $('#lbltxtCreditCardConvenience').text(currencytype);
                            $("#txtCreditCardConvenience").val(response.ProcessingFeeDetails[i]["Value"] );

                        }
                        else if (response.ProcessingFeeDetails[i].CardId == 1 && response.ProcessingFeeDetails[i].processingfeechargeId == 2) {

                            $("#ddlCreditCardConvenienceTypetc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);


                            if ($('#ddlCreditCardConvenienceTypetc').val() == 1) {
                                currencytype = currency;
                            }
                            if ($('#ddlCreditCardConvenienceTypetc').val() == 2) {
                                currencytype = '%'
                            }
                            $('#lbltxtCreditCardConveniencetc').text(currencytype);
                            $("#txtCreditCardConveniencetc").val(response.ProcessingFeeDetails[i]["Value"] );

                        }

                        else if (response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 2) {

                            $("#ddlDebitCardConvenienceTypetc").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                            if ($('#ddlDebitCardConvenienceTypetc').val() == 1) {
                                currencytype = currency;
                            }
                            if ($('#ddlDebitCardConvenienceTypetc').val() == 2) {
                                currencytype = '%'
                            }
                            $('#lbltxtDebitCardConveniencetc').text(currencytype);
                            $("#txtDebitCardConveniencetc").val(response.ProcessingFeeDetails[i]["Value"] );
                        }

                        else if (response.ProcessingFeeDetails[i].CardId == 2 && response.ProcessingFeeDetails[i].processingfeechargeId == 1) {
                            $("#ddlDebitCardConvenienceType").val(response.ProcessingFeeDetails[i]["FeeTypeId"]);
                            if ($('#ddlDebitCardConvenienceType').val() == 1) {
                                currencytype = currency;
                            }
                            if ($('#ddlDebitCardConvenienceType').val() == 2) {
                                currencytype = '%'
                            }
                            $('#lbltxtDebitCardConvenience').text(currencytype);
                            $("#txtDebitCardConvenience").val(response.ProcessingFeeDetails[i]["Value"] );
                        }


                    }
                }

            }
            else {
            }
        });
    }


    $("#btnActivate").on("click", function () {

        var secreteKey = document.getElementById('txtASecretKey').value;
        var merchantEmail = document.getElementById('txtAPaytabsEmailID').value;
        var shippingAddress = document.getElementById('txtABillingAddress').value;
        var txtAPayTabsMID = document.getElementById('txtAPayTabsMID').value;
        var isActivateOrUnblock = "1";

        var debitCardConvinienceFeeTypeId = "0"
        debitCardConvinienceFeeTypeId = document.getElementById('ddlDebitCardConvenienceType').value;
        var creditCardConvinienceFeeTypeId = "0";
        creditCardConvinienceFeeTypeId = document.getElementById('ddlCreditCardConvenienceType').value;
        var debitCardConvinienceFeeTypeIdtc = "0"
        debitCardConvinienceFeeTypeIdtc = document.getElementById('ddlDebitCardConvenienceTypetc').value;
        var creditCardConvinienceFeeTypeIdtc = "0";
        creditCardConvinienceFeeTypeIdtc = document.getElementById('ddlCreditCardConvenienceTypetc').value;
        //var creditCardConvinienceFeeTypeId = "0";
        //creditCardConvinienceFeeTypeId = document.getElementById('ddlCreditCardConvenienceType').value;
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
        if (txtAPayTabsMID.trim().length == 0) {
            ErrorNotifier("Please enter paytabs MID");
            return false;
        }

        if (debitCardConvinienceFeeTypeId != "0" && debitCardConvinienceFeeValue.trim().length == 0) {
            ErrorNotifier("Please enter debit card convinience fee value");
            return false;
        }
        if (debitCardConvinienceFeeTypeIdtc != "0" && debitCardConvinienceFeeValuetc.trim().length == 0) {
            ErrorNotifier("Please enter debit card convinience  transaction fee value");
            return false;

        }
        if (creditCardConvinienceFeeTypeId != "0" && creditCardConvinienceFeeValue.trim().length == 0) {
            ErrorNotifier("Please enter credit card convinience fee value");
            return false;
        }
        if (creditCardConvinienceFeeTypeIdtc != "0" && creditCardConvinienceFeeValuetc.trim().length == 0) {
            ErrorNotifier("Please enter credit card  transaction convinience fee value");
            return false;

        }
        var data = {
            type: 9, secreteKey: secreteKey, instituteId: instituteId, merchantEmail: merchantEmail, shippingAddress: shippingAddress,
            isActivateOrUnblock: isActivateOrUnblock, PayTabsMID: txtAPayTabsMID,CreditCardProcessingFeeTypeId: creditCardConvinienceFeeTypeId,creditCardConvinienceFeeTypeIdtc:creditCardConvinienceFeeTypeIdtc,
            DebitCardProcessingFeeTypeId: debitCardConvinienceFeeTypeId, debitCardConvinienceFeeTypeIdtc: debitCardConvinienceFeeTypeIdtc, CreditCardProcessingFeeValue: parseFloat(creditCardConvinienceFeeValue),
            DebitCardProcessingFeeValue: parseFloat(debitCardConvinienceFeeValue), debitCardConvinienceFeeValuetc: parseFloat(debitCardConvinienceFeeValuetc), creditCardConvinienceFeeValuetc: parseFloat(creditCardConvinienceFeeValuetc),
        };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
            if (response.Success == true) {
                SuccessNotifier(response.Message);
                $('#ActivateSchoolAccount').modal('hide');
                timeRunner();

            }
            else {
                ErrorNotifier(response.Message);
            }
        });
    });

    $("#btnApproveCancel").on("click", function () {
        $('#ActivateSchoolAccount').modal('hide');
    });

    $("#btnBlockCancel").on("click", function () {
        $('#block_sch').modal('hide');
    });

    $("#btnBlockYes").on("click", function () {
        var reason = document.getElementById('txtBlockReason').value;
        if (reason.trim().length == 0) {
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
                timeRunner();
            }
            else {
                ErrorNotifier(response.Message);
            }
        });
    });

    function timeRunner() {
        var myTimer;
        var sec = 0;
        clearInterval(myTimer);

        myTimer = setInterval(function () {
            if (sec > 0) {
                sec = sec - 1;

            } else {
                clearInterval(myTimer);
                getInstituteDetails();
            }
        }, 1000);
        return 1;
    }


    function getDiscountTypes() {

        var data = { type: 2 };
        var discountTypes = "<option value='0'> Select </option>"
        request.Initiate("/AjaxHandlers/Finance1.ashx", "JSON", false, data, function (response) {
            if (response.Success == true) {
                for (var i = 0; i < response.DiscountTypes.length > 0; i++) {
                    discountTypes += "<option value='" + response.DiscountTypes[i].Id + "'>" + response.DiscountTypes[i].Type + "</option>";
                }

            }
            else {

            }
            $("#ddlDebitCardConvenienceType,#ddlCreditCardConvenienceType, #ddlDebitCardConvenienceTypetc, #ddlCreditCardConvenienceTypetc").html(discountTypes);
            $("#ddlDebitCardConvenienceType1,#ddlCreditCardConvenienceType1,#ddlDebitCardConvenienceType1tc,#ddlCreditCardConvenienceType1tc").html(discountTypes);
        });
    }


    //$("#blockAccountOrDeleteAccount").on("click", function () {
    //    $('#delete_sch').modal('show');
    //});

    
    //$("#btnDeleteCancel").on("click", function () {
    //    $('#delete_sch').modal('hide');
    //});

    //$("#btnDeleteYes").on("click", function () {
    //    var data = { type: 10, instituteId: instituteId };
    //    request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
    //        if (response.Success == true) {
    //            SuccessNotifier(response.Message);
    //            $('#delete_sch').modal('hide');
    //            timeRunner();
    //        }
    //        else {
    //            $("#AccountDeleteContent").text("");
    //            var body = "Sorry it has been only " + response.Days + " days you have blocked the account you can't delete the account before 30 days after blocking."
    //            $("#AccountDeleteContent").text(body);

    //            $('#delete_sch').modal('hide');
    //            $('#delete_schConfirm').modal('show');
    //        }
    //    });
    //});

    //$("#btnDeleteOk").on("click", function () {
    //    $('#delete_schConfirm').modal('hide');

    //});







});