<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminDashboard.aspx.cs" Inherits="FaraSM.AdminUI.AdminDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        #Transactions a:hover {
            border-radius: 0px 0px 25px 0px !important;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%-- <div class="text-center text-grey add_student">
        <label class="blocked f_18"><h1>COMING SOON !</h1></label>
         <label class="blocked f_18">We are currently working on this , will get back to you soon.</label>
    </div>--%>

    <%-- <div class="page-content">--%>
    <div class="row margin-top-15 margin-bottom-20">
        <div class="col-sm-6">
            <div class="db_box clearfix">
                <div class="pull-left">
                    <h5 class="head">Transactions Today</h5>
                    <label class="number" id="lbltodayamount"><span class="text"></span></label>
                </div>
                <label class="pull-right num_circle margin-top-10" id="lblTodatTransactionCount"></label>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="db_box">
                <h5 class="head">Available Balance</h5>
                <label class="number" id="lbltotalbalance"><span class="text"></span></label>
            </div>
        </div>
    </div>


    <div class="row margin-bottom-20">
        <div class="col-sm-4">
            <div class="db_box2 clearfix">
                <label class="pull-left name">
                    <img src="assets/admin/img/approved_icn.png" alt="approved" class="margin-right-15">
                    Approved Schools
                </label>
                <label class="pull-right num_circle margin-top-10" id="countofapprovedschools"></label>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="db_box2 clearfix">
                <a href="/Schools.aspx" style="text-decoration: none">
                    <label class="pull-left name">
                        <img src="assets/admin/img/pending.png" alt="pending" class="margin-right-15">
                        Pending Schools
                    </label>
                </a>
                <label class="pull-right num_circle margin-top-10" id="countofpendingschools"></label>
            </div>
        </div>
        <div class="col-sm-4">
            <div class="db_box2 clearfix">
                <label class="pull-left name">
                    <img src="assets/admin/img/blocked.png" height="27" alt="blocked" class="margin-right-15">
                    Blocked
                </label>
                <label class="pull-right num_circle margin-top-10" id="countofblockedschools"></label>
            </div>
        </div>
    </div>

    <div>
        <h4 class="bold-6 text-grey">Last 30 Day Fee Collection</h4>
        <div class="portlet box" id="chartContainer" style="height: 500px; width: 100%;">
        </div>
    </div>
    <div class="row margin-bottom-20">
        <div class="col-sm-6">
            <div class="portlet box">
                <h4 class="bold-6 text-grey margin-bottom-20">Regional Status</h4>
                <div class="table-responsive trans_his">
                    <table class="table trans_his_table mb-0" id="tblreginalstatus">
                        <tr>
                            <th>Country</th>
                            <th>Transactions</th>
                            <th>Amount</th>
                        </tr>


                    </table>
                </div>
            </div>
        </div>
        <div class="col-sm-6">
            <div class="portlet box">
                <h4 class="bold-6 text-grey margin-bottom-20">Highest Fee Collection by Schools</h4>
                <div class="table-responsive trans_his">
                    <table class="table trans_his_table mb-0" id="tblhighestcollection">
                        <tr>
                            <th>School Name</th>
                            <th>Transactions</th>
                            <th>Amount</th>
                        </tr>

                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="portlet box">
        <h4 class="bold-6 text-grey margin-bottom-20">Recent Transactions</h4>
        <div class="table-responsive trans_his">
            <table class="table trans_his_table mb-0" id="tblResentTransactions">
                <tr>
                    <th>School Name</th>
                    <th>E-mail Address</th>
                    <th>Contact Number</th>
                    <th>Date and Time</th>
                    <th>Amount</th>
                </tr>


            </table>
        </div>
        <hr>
        <div class="text-center margin-bottom-15"><a class="text-blue" href="Transactions.aspx">View All</a></div>

    </div>
    <%-- </div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
    <script src="Scripts/Plugins/jquery.canvasjs.min.js"></script>
    <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/AdminDashboard.js"></script>
</asp:Content>
