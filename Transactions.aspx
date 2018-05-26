<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="Transactions.aspx.cs" Inherits="FaraSM.AdminUI.Transactions" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
     
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
     <div class="text-center text-grey" id="DivNoDataFound" style="display:none">
        
         <label class="blocked f_18" style="padding-top:20%">No Transaction Records Found</label>
    </div>

    <!--show below when data present in the grid-->
    <div class="stu_srch_box" style="display:none" id="DivDataFound">
        <div class="clearfix srch_top">
            <div class="col-sm-2 col-md-2 col-xs-2 left-srch">
                <label id="filter" class="filt_btn mb-0 select" onclick="toggleClick();"><i class="fa fa-sliders margin-right-10"></i><span class="hidden-xs">Filters</span> </label>
            </div>
            <div class="col-sm-10 col-md-10 col-xs-10 mid-srch">
                <input type="text" class="form-control"   id="txtSearch" placeholder="Search by School Name">
            </div>
        </div>
        <div class="sbContainer">
            <!--<div class="col-sm-4 col-md-3 bord-right">
                            <div class="clearfix pad-15 bord-b text-blue">
                                <label class="pull-left mb-0">Refine Your Search</label>
                                <label class="pull-right mb-0"><i class="fa fa-repeat"></i></label>
                            </div>
                            <div class="filters">

                            </div>
                        </div>-->
            <div class="sidebar bord-right" id="sidebar">
                <div class="clearfix padBox bord-b text-blue">
                    <label class="pull-left mb-0">Refine Your Search</label>
                    <label class="pull-right mb-0"><i class="fa fa-repeat" id="RefineSearch"></i></label>
                </div>
                <div class="clearfix padBox bord-b">
                    <label class="pull-left f_15">Country</label>
                    <label class="pull-right indicator" data-toggle="collapse" data-target="#country"><i class="fa fa-plus-square-o"></i></label>
                    <div class="clear"></div>
                    <ul id="country" class="collapse  margin-top-10">
                        
                    </ul>
                </div>
                <div class="clearfix padBox bord-b">
                    <label class="pull-left f_15">Location</label>
                    <label class="pull-right indicator" data-toggle="collapse" data-target="#location"><i class="fa fa-plus-square-o"></i></label>
                    <div class="clear"></div>
                    <ul id="location" class="collapse margin-top-10">
                        
                    </ul>
                </div>
             <%--   <div class="clearfix padBox bord-b">
                    <label class="pull-left f_15">Status</label>
                    <label class="pull-right indicator" data-toggle="collapse" data-target="#status"><i class="fa fa-minus-square-o"></i></label>
                    <div class="clear"></div>
                    <ul id="status" class="collapse in margin-top-10">
                        <li>
                            <input type="checkbox" class="margin-right-5" />
                            Not Completed </li>
                        <li>
                            <input type="checkbox" class="margin-right-5" />
                            Successful </li>
                        <li>
                            <input type="checkbox" class="margin-right-5" />
                            Pending </li>
                        <li>
                            <input type="checkbox" class="margin-right-5" />
                            Rejected </li>

                    </ul>
                </div>--%>
              <%-- <div class="clearfix padBox bord-b">
                    <label class="pull-left f_15"> Amount</label>
                    <label class="pull-right indicator" data-toggle="collapse" data-target="#FeeAmt">
                        <i class="fa fa-minus-square-o"></i>
                    </label>
                    <div class="clear"></div>
                    <div id="FeeAmt" class="collapse in margin-top-20 margin-bottom-20">
                        <div id="TraBalanceslider" class=""></div>
                        <div class="margin-top-15">
                            <span class="pull-left" id="minbalanceamount"></span>
                            <span class="pull-right" id="maxbalanceamount"></span>
                        </div>
                    </div>
                </div>--%>
            </div>
            <div id="sbContent" class="sbContent table-responsive">
                <table class="table table-borderd" id="tblTransactionDetails">
                    <thead>
                        <tr>
                            
                            <th>School Name <i class="fa fa-sort margin-left-5"></i></th>
                            <th>Email ID <i class="fa fa-sort margin-left-5"></i></th>
                            <th>Phone Number <i class="fa fa-sort margin-left-5"></i></th>
                            <th>Transactions <i class="fa fa-sort margin-left-5"></i></th>
                            <th>Amount <i class="fa fa-sort margin-left-5"></i></th>
                            <th>Action <i class="fa fa-sort margin-left-5"></i></th>
                           <%-- <th>Time/Date <i class="fa fa-sort margin-left-5"></i></th>--%>
                          
                        </tr>
                    </thead>
                    <tbody id="TRANSACTIONDATA">
                        <!--<tr>
                  <td colspan="8" bgcolor="#f9f9f9" class="text-right"><label class="text-blue margin-right-15 margin-left-15 mb-0" title="Delete"><i class="fa fa-trash"></i> Delete</label>
                    <label class="text-blue margin-right-15 mb-0" title="Promote"><i class="fa fa-arrow-up"></i> Promote</label></td>
                </tr>-->
                       
                     
                      
                    </tbody>

                </table>
                <div class="col-md-12 text-center">
                    <ul class="pagination pagination-lg pager" id="myPager"></ul>
                </div>
            </div>
        </div>
    </div>




</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
    <script src="assets/global/plugins/jquery.min.js"></script>
    <script src="assets/global/scripts/metronic.js" type="text/javascript"></script> 
    <script src="Scripts/Plugins/paginationAdmin.js"></script>
    <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/Transactions.js"></script>
<script>
        $(document).ready(function () {
            //Metronic.init(); // init metronic core componets
            //Layout.init(); // init layout

          
        });

        function toggleClick() {
            //debugger;
            document.getElementsByClassName('sidebar')[0].classList.toggle('collapsed');
            $("#sbContent").toggleClass("sbContent full-w");
            $("#filter").toggleClass("select");
        }

        var selectIds = $('#country,#location');
        $(function ($) {
            selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
                //debugger;
                $(this).prev().prev().find('i').toggleClass('fa-plus-square-o fa-minus-square-o');
            })
        })
       
        //if ($("#existing").is(":Checked")) {
        //    $("#plus").hide();
        //}
        //$("#existing").click(function () {
        //    $("#minus").show();
        //});
        //$("#createNew").click(function () {
        //    $("#minus").hide();
        //});

        
    </script> 
    
</asp:Content>
