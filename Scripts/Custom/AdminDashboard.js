
window.onload = function () {

    //Better to construct options first and then pass it as a parameter
   
}

$(document).ready(function () {
 var data=   { type: 5};
    request.Initiate("/AjaxHandlers/Admin.ashx", "JSON", true, data, function (res) {
        if (res.Success == true) {

            console.log(res);
            if (res.TrasactionsToday.length > 0) {
                $('#lbltodayamount').text(res.TrasactionsToday[0].TOTALAMOUNT+' '+'BHD');
                $('#lblTodatTransactionCount').text(res.TrasactionsToday[0].countoftransactions);
            }
            if (res.AvalableBalance.length > 0) {
                $('#lbltotalbalance').text(res.AvalableBalance[0].totalbalance+' '+'BHD');
            }
            if (res.Approvedschools.length > 0) {
                $('#countofapprovedschools').text(res.Approvedschools[0].approvedcount);
            }
            if (res.pendingschools.length > 0) {
                $('#countofpendingschools').text(res.pendingschools[0].pendingcount);
            }
            if (res.blockedschools.length > 0) {
                $('#countofblockedschools').text(res.blockedschools[0].blockedcount);
            }
            if (res.RegionalStatus.length > 0) {
                var trhtml = '';
                $.each(res.RegionalStatus, function (item, index) {

                    trhtml += '<tr><td><label class="text-blue">' + index.Name + '</label></td><td>' + index.count + '</td><td>' + index.totalamount + ' ' + index.Code + '</td></tr>'

                });
                $("#tblreginalstatus").append(trhtml);

            }
            if (res.HighestFeeCollectionSchools.length > 0) {
                var trhtmlc = '';

                $.each(res.HighestFeeCollectionSchools, function (item, index) {

                    trhtmlc += '<tr><td><label class="text-blue">' + index.Name + '</label></td><td>' + index.count + '</td><td>' + index.totalamount + ' ' + index.Code + '</td></tr>'

                });
                $("#tblhighestcollection").append(trhtmlc);

            }
            if (res.RecentTransactions.length > 0) {
                var trhtmlcs = '';

                $.each(res.RecentTransactions, function (item, index) {

                    trhtmlcs += '<tr><td><h5 class="text-blue f_14">' + index.Name + '</h5><span class="font-grey-gallery">' + index.institutecode + '</span></td><td>' + index.Email + '</td>'
                    trhtmlcs += '<td>' + index.ContactNumber + '</td><td><label class="blocked">' + index.createdtime + '</label><span></span></td><td>' + index.TotalAmount +' '+index.Code+'</td></tr>'


                });
                $("#tblResentTransactions").append(trhtmlcs);

            }
            if(res.last30daytransaction.length>0)
            {
                var dsf = [];
                $.each(res.last30daytransaction, function (item, index) {
                   
                    dsf.push({
                        label: index.dayss,
                        y: index.totalamount
                    });
                });

                    var options = {
                        //title: {
                        //    text: "last 30 days fee collection" 
                        //},
                        axisY: {
                            title: "Fee Collection",
                        },
                        theme: "light2",
                        data: [
                        {
                            // Change type to "doughnut", "line", "splineArea", etc.
                            type: "column",
                            color:"#1a87fc",
                            dataPoints: dsf
			                  
                            
                        }
                        ]

                    };

                    $("#chartContainer").CanvasJSChart(options);


               
                }

        }


        else {
            ErrorNotifier(res.Message);
        }
    });
});

