//var currentDate = new Date();
//var startDate = currentDate.toJSON().slice(0, 10).replace(/-/g, '-');
//currentDate.setMonth(currentDate.getMonth() - 1);
//var endDate = currentDate.toJSON().slice(0, 10).replace(/-/g, '-');
//$('#inputStartDate').val(endDate);
//$('#inputEndDate').val(startDate);
var colorClassArray = ["text-warning", "font-blue", "font-green", "font-red", "text-dark"];

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
            type: "splineArea",
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
    GetPayTabsMerchantDetails();
    GetPaymentStatuses();
    GetSchoolTransactionsForAdmin();

    function getInstituteDetails() {
        var data = { type: 11, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", true, data, function (res) {
            if (res.Success == true) {
                var logoPath = ((res.InstituteDetails[0].logopath == '') ? "/Images/ProfileImages/defaultimage.png" : res.InstituteDetails[0].logopath);
                $("#imgSchoolLogo").attr("src", $('#hdnWebUrl').val() + logoPath);
                $("#h3SchoolName").html(res.InstituteDetails[0].Name);
                $("#labelSchoolEmail").html(res.InstituteDetails[0].Email);
                $("#labelSchoolContactNo").html(res.InstituteDetails[0].ContactNumber);
                $("#labelInstituteCode").html(res.InstituteDetails[0].institutecode);
                $("#spanSchoolAddress").html(res.InstituteDetails[0].Address);
                $("#spanSchoolCityName").html(res.InstituteDetails[0].CityName);
                $('#spanSchoolCountryName').html(res.InstituteDetails[0].CountryName);

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
                    $('#blockAccountText').html('Delete Account');
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
                $("#labelTotalTrnsToday").html(res.TransactionsToday);
                $("#labelAvailableBalance").html(res.AvailableWalletBalance);
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
                $("#inputPayTabsEmail").val(res.MerchantDetails[0].MerchantEmail);
                $("#inputAddress").val(res.MerchantDetails[0].ShippingAddress);
            }
        })
    }
    $('#btnSave').on('click', function () {
        var secretKey = $("#inputSecretKey").val();
        var email = $("#inputPayTabsEmail").val();
        var address = $("#inputAddress").val();
        if (secretKey.trim().length == 0) {
            ErrorNotifier("Oops, you didn't enter secret key.");
            return false;
        } else if (!checkEmail('inputPayTabsEmail')) {
            ErrorNotifier("Oops, you didn't enter a valid email.");
            return false;
        } else if (address.trim().length == 0) {
            ErrorNotifier("Oops, you didn't enter address.");
            return false;
        } else {
            var data = { type: 16, instituteId: instituteId, secretKey: secretKey, email: email, address: address };
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
                $("#labelTotalFeeEstm").html(res.FeeSummary[0].TotalEstimationFee);
                $("#labelTotalCollected").html(res.FeeSummary[0].TotalPaidOnline);
                $("#labelTotalFeeDue").html(res.FeeSummary[0].TotalFeeDue);
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
                if (res.TransactionsTable.length == 0) {
                    $('#noDataTr').show();
                } else {
                    $('#noDataTr').hide();
                    $('#tBodyTransactions').empty();
                    $.each(res.TransactionsTable, function () {
                        $("#tBodyTransactions").append(
                            "<tr><td>" + this.OrderId + "</td><td>" + this.PaymentMode + "</td><td>" + this.Amount + "</td><td>" + this.DateNTime
                            + "</td><td>" + this.PayeeName + "</td><td>" + this.PayeeEmail + "</td><td>" + this.PayeeMobile +
                            "</td><td><label class=\"" + colorClassArray[(this.PaymentStatusId) - 1] + "\">" + this.Status
                            + "</label></td><td><a data-toggle=\"modal\" data-target=\"#trans_det\"><i  paymentId=\"" + this.PaymentId + "\" class=\"fa fa-eye text-blue\"></i></a></td></tr>");
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
        $('#modalPaymntStatus').html(status);
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
            $('#delete_sch').modal('show');
        }
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


    //$("#blockAccountOrDeleteAccount").on("click", function () {
    //    $('#delete_sch').modal('show');
    //});

    
    $("#btnDeleteCancel").on("click", function () {
        $('#delete_sch').modal('hide');
    });

    $("#btnDeleteYes").on("click", function () {
        var data = { type: 10, instituteId: instituteId };
        request.Initiate("/AjaxHandlers/AdminSchool.ashx", "JSON", false, data, function (response) {
            if (response.Success == true) {
                SuccessNotifier(response.Message);
                $('#delete_sch').modal('hide');
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

});