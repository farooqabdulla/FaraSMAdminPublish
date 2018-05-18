<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="SchoolDetails.aspx.cs" Inherits="FaraSM.AdminUI.SchoolDetails" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
        <div class="col-md-3">
            <div class="stu_srch_box text-center pad-10 profileDetails">
                <img id="imgSchoolLogo" src="assets/admin/img/School.png" alt="SchoolLogo" />
                <h3 id="h3SchoolName">Emirates International School</h3>
                <label id="labelSchoolEmail" class="text-center f_13 margin-top-5 blocked margin-bottom-10">emiratesinternational@gmail.com</label>
                <label id="labelSchoolContactNo" class="text-center blocked f_13">+12 12345 678</label>
                <label id="labelInstituteCode" class="text-grey f_12 margin-bottom-15">ST-0089</label>
                <label class="blocked f_12 text-grey margin-bottom-20">
                    <span>Address:</span><br>
                    <span id="spanSchoolAddress"></span>
                    <br>
                    <span id="spanSchoolCityName"></span>
                    <br>
                    <span id="spanSchoolCountryName"></span>
                </label>
                <button type="button" class="btn btn-primary" id="blockAccountOrDeleteAccount" hidden><i class="fa fa-ban margin-right-10"></i><span id="blockAccountText">Block Account</span></button>
            </div>
        </div>
        <div class="col-md-9">
            <div class="stu_srch_box tabbable-line">
                <ul class="nav nav-tabs ">
                    <li class="active">
                        <a href="#tab_15_1" data-toggle="tab">Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#tab_15_2" data-toggle="tab">Paytabs Merchant Account Details
                        </a>
                    </li>
                    <li>
                        <a href="#tab_15_3" data-toggle="tab">Transaction History
                        </a>
                    </li>

                </ul>
                <div class="tab-content material">
                    <div class="tab-pane active pad-15" id="tab_15_1">
                        <div class="row margin-top-15 margin-bottom-50">
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">Total Fee Estimation</h5>
                                    <label id="labelTotalFeeEstm" class="number">288888.00 <span class="text">bhd</span></label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">Total Fee Collected</h5>
                                    <label id="labelTotalCollected" class="number">288888.00 <span class="text">bhd</span></label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">Total Fee Due</h5>
                                    <label id="labelTotalFeeDue" class="number">288 <span class="text">bhd</span></label>
                                </div>
                            </div>
                        </div>

                        <div class="row margin-bottom-50">
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalAcademicYear" class="num">3</h4>
                                    <label class="name">Academic Year</label>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalClasses" class="num">45</h4>
                                    <label class="name">Classes</label>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalSections" class="num">3</h4>
                                    <label class="name">Sections</label>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalFeeCategories" class="num">15</h4>
                                    <label class="name">Fee Categories</label>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalFeeDiscount" class="num">NA</h4>
                                    <label class="name">Fee Discount</label>
                                </div>
                            </div>
                            <div class="col-md-4 col-sm-4 col-xs-6 col-lg-2">
                                <div class="stats">
                                    <h4 id="h3TotalFeeFine" class="num">NA</h4>
                                    <label class="name">Fee Fine</label>
                                </div>
                            </div>
                        </div>

                        <div class="graph_box margin-bottom-50" style="height: 500px;">
                            <div class="clearfix margin-bottom-20">
                                <h4 class="pull-left text-dark-blue text-uppercase bold-6">Total Revenue Generated</h4>
                                <%--<label class="pull-right">
                                    <select id="selectAcademicYear" class="form-control input-inline">
                                    </select>
                                </label>--%>
                            </div>
                            <div id="divRevenue"></div>
                        </div>

                        <div class="act-panel">
                            <div class="act-panel-head">Recent Activities</div>
                            <div class="act-panel-body">
                                <ul id="ulRecentActs">
                                    <li id="noDataRecent">
                                        <div class="clearfix">
                                            <h5>No Recent Activities</h5>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div class="tab-pane pad-15" id="tab_15_2">
                        <div class="row margin-bottom-15">
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="text" id="inputSecretKey" required="required" />
                                    <label class="control-label" for="select">Secret Key(API KEY)*</label>
                                    <i class="bar"></i>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <input type="text" id="inputPayTabsEmail" required="required" />
                                    <label class="control-label" for="select">Paytabs Email ID *</label>
                                    <i class="bar"></i>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <input type="text" id="inputAddress" required="required" />
                            <label class="control-label" for="select">Address</label>
                            <i class="bar"></i>
                        </div>

                        <div class="text-right">
                            <button id="btnSave" type="button" class="btn btn-primary">Save Changes</button>
                        </div>
                    </div>
                    <div class="tab-pane pad-15" id="tab_15_3">
                        <div class="row margin-top-15 margin-bottom-50">
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">Transactions Today<%--<span class="font-green normal margin-left-10"><i id="symbolTransactionToday" class="fa fa-long-arrow-down"></i><span id="percentageTransactionToday">34%</span></span>--%></h5>
                                    <label id="labelTotalTrnsToday" class="number">288888.00 <span id="spanTTCurrency" class="text">bhd</span></label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">Available Balance</h5>
                                    <label id="labelAvailableBalance" class="number">288888.00 <span id="spanAVCurrency" class="text">bhd</span></label>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="db_box">
                                    <h5 class="head">NO. Of Transactions</h5>
                                    <label id="noOfTrns" class="number">288 </label>
                                </div>
                            </div>
                        </div>
                        <div class="row margin-bottom-50">
                            <div class="col-sm-3">
                                <select id="selectTransactionStatus" class="form-control">
                                    <option value="0">All Transactions</option>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group full-w">
                                    <div class="input-icon right">
                                        <i class="fa fa-calendar"></i>
                                        <input id="inputStartDate" type="text" class="form-control" placeholder="From Date">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="input-group full-w">
                                    <div class="input-icon right">
                                        <i class="fa fa-calendar"></i>
                                        <input id="inputEndDate" type="text" class="form-control" placeholder="To Date">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <select id="selectRecordsToShow" class="form-control">
                                    <option value="5">Show 5 Records</option>
                                    <option value="50">Show 50 Records</option>
                                    <option value="100">Show 100 Records</option>
                                    <option value="1000">Show 1000 Records</option>
                                </select>
                            </div>
                        </div>
                        <div class="trans_his table-responsive">
                            <table class="table trans_his_table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Payment Mode</th>
                                        <th>Amount</th>
                                        <th>Date &amp; Time</th>
                                        <th>Payee Name</th>
                                        <th>Payee Email Address</th>
                                        <th>Payee Contact Number</th>
                                        <th>Status</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody id="tBodyTransactions">
                                </tbody>
                            </table>
                        </div>
                        <div id="noDataTr">
                            <h5 style="color:darkgrey;align-content:center;">No Transaction Activity</h5>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="trans_det" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 pull-left">Transaction Details</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="tabbable-line">
                        <ul class="nav nav-tabs ">
                            <li class="active"><a id="PayDet" href="#payD" data-toggle="tab">Payment Details
                            </a>
                            </li>
                            <li><a href="#shipD" data-toggle="tab">Shipping Details
                            </a>
                            </li>
                        </ul>
                        <div class="tab-content material">
                            <div class="tab-pane active pad-15" id="payD">
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Amount :</label>
                                    <label id="modalTrAmount" class="pull-left text-blue bold">230.00 BHD</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">To :</label>
                                    <label id="modalStudentName" class="pull-left">John Anderson</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Time :</label>
                                    <label id="modalTrTime" class="pull-left">03-01-2012 02:43:25 PM</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Result :</label>
                                    <label id="modalPaymntStatus" class="pull-left font-red bold">Payment Rejected</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Reason :</label>
                                    <label class="pull-left">Transaction currency is not supported, Please contact your merchant</label>
                                </div>
                            </div>

                            <div class="tab-pane pad-15" id="shipD">
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Shipping Country :</label>
                                    <label id="modalCountry" class="pull-left text-blue bold">BHD</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Shipping Address :</label>
                                    <label id="modalAddress" class="pull-left">123, building 1234, Block A</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Shipping City :</label>
                                    <label id="modalCity" class="pull-left">Mananama</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Shipping State :</label>
                                    <label id="modalState" class="pull-left">Exhibitions Road</label>
                                </div>
                                <div class="clearfix margin-bottom-15">
                                    <label class="pull-left margin-right-10">Shipping Postal Code :</label>
                                    <label id="modalPostal" class="pull-left">320</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="block_sch" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Block School Alert</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="material">

                        <h4 class="bold-6 mb-0">Are you sure you want to block the school</h4>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <h4 class="bold-6">Reason</h4>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" id="txtBlockReason" required="required" />
                                    <label class="control-label" for="input">Max 120 characters</label>
                                    <i class="bar"></i>
                                </div>
                            </div>
                        </div>

                        <div class="form-group text-center">
                            <button type="button" class="btn btn-default margin-right-10" id="btnBlockCancel">Cancel</button>
                            <button type="button" class="btn btn-primary" id="btnBlockYes">Yes</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="delete_sch" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Delete School Alert</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="text-center">

                        <h4 class="bold-6 mb-0">Are you sure you want to Delete the school ?</h4>

                        <h4 class="bold-6 mb-0">All the transactions history will be deleted.</h4>
                        <h4 class="bold-6">Click yes if you want to proceed</h4>

                        <div class="form-group text-center margin-top-15">
                            <button type="button" class="btn btn-default margin-right-10" id="btnDeleteCancel">Cancel</button>
                            <button type="button" class="btn btn-primary" id="btnDeleteYes">Yes</button>
                        </div>

                    </div>

                    <%-- <div class="text-center">
                        <h4 class="bold-6">Sorry it has been only 2 days you have blocked the account you can't delete the account before 30 days after blocking.</h4>
                        <br>
                        <button type="button" class="btn btn-primary">Ok</button>
                    </div>--%>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="delete_schConfirm" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Delete School Alert</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <%--<div class="text-center">

                        <h4 class="bold-6 mb-0">Are you sure you want to Delete the school ?</h4>

                        <h4 class="bold-6 mb-0">All the transactions history will be deleted.</h4>
                        <h4 class="bold-6">Click yes if you want to proceed</h4>

                        <div class="form-group text-center margin-top-15">
                            <button type="button" class="btn btn-default margin-right-10">Cancel</button>
                            <button type="button" class="btn btn-primary">Yes</button>
                        </div>

                    </div>--%>

                    <div class="text-center">
                        <h4 class="bold-6" id="AccountDeleteContent"></h4>
                        <%--Sorry it has been only 0 days you have blocked the account you can't delete the account before 30 days after blocking.--%>
                        <br>
                        <button type="button" class="btn btn-primary" id="btnDeleteOk">Ok</button>
                    </div>

                </div>
            </div>
        </div>
    </div>



    <input type="hidden" id="hdnWebUrl" value="<%=webUrl %>" />
    <input type="hidden" id="hdnAdminInstituteID" value="<%=AdminInstituteId %>" />
    <input type="hidden" id="hdnBlockOrDeleteSchoolAccount" value="<%=BlockOrDeleteSchoolAccount %>" />







</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">

    <script src="Scripts/Plugins/jquery.canvasjs.min.js"></script>
    <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/SchoolDetails.js"></script>
</asp:Content>
