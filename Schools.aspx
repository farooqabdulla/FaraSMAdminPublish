<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="Schools.aspx.cs" Inherits="FaraSM.AdminUI.Schools" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">

    <div class="text-center text-grey" id="DivNoDataFound" style="display: none">

        <label class="blocked f_18" style="padding-top: 20%">No Schools Records Found</label>
    </div>
    <div class="stu_srch_box" style="display: none" id="DivDataFound">
        <div class="clearfix srch_top">
            <div class="col-sm-2 col-md-2 col-xs-2 left-srch">
                <label id="filter" class="filt_btn mb-0 select" onclick="toggleClick();"><i class="fa fa-sliders margin-right-10"></i><span class="hidden-xs">Filters</span> </label>
            </div>
            <div class="col-sm-3 col-md-7 col-xs-10 mid-srch">
                <input type="text" class="form-control" style="width:100%"    placeholder="Search by Name, Email, Status" id="txtSearch">
            </div>
            <div class="col-sm-3 col-md-3 col-xs-3 right-srch">
                <a class="text-blue" id="excelDownload"><i class="fa fa-file-excel-o  margin-left-5 margin-top-10 margin-right-5 "></i>Download To Excel</a>
        </div>
            
            
        </div>
        <div class="sbContainer">

            <div class="sidebar bord-right" id="sidebar">
                <div class="clearfix padBox bord-b text-blue">
                    <label class="pull-left mb-0">Refine Your Search</label>
                    <label class="pull-right mb-0"><i class="fa fa-repeat" id="btnRefresh"></i></label>
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
                <div class="clearfix padBox bord-b">
                    <label class="pull-left f_15">Status</label>
                    <label class="pull-right indicator" data-toggle="collapse" data-target="#status"><i class="fa fa-plus-square-o"></i></label>
                    <div class="clear"></div>
                    <ul id="status" class="collapse  margin-top-10">
                    </ul>
                </div>
            </div>
            <div id="sbContent" class="sbContent" style="min-height: 500px;">
                <div class="table-responsive">
                    <table id="tableSchools" class="table table-borderd tblStudent">
                        <thead>
                            <tr>
                                <%--<th>School Name </th>--%>
                                <%--//<i class="fa fa-sort margin-left-5"></i>--%>
                                <%-- <th>Email ID </th>--%>
                                <%--<i class="fa fa-sort margin-left-5"></i>--%>
                                <%-- <th>Phone Number </th>--%>
                                <%--<i class="fa fa-sort margin-left-5">--%>
                                <%--<th>Created Date </th>--%>
                                <%--<i class="fa fa-sort margin-left-5"></i>--%>
                                <%-- <th>Transactions </th>--%>
                                <%--<i class="fa fa-sort margin-left-5"></i>--%>
                                <%--<th>Revenue </th>--%>
                                <%--<i class="fa fa-sort margin-left-5"></i>--%>
                                <%-- <th>Status </th>--%>
                                <%--<i class="fa fa-sort margin-left-5"></i>--%>
                                <th class="noShow"><strong>School Name</strong></th>
                                <th class="noShow"><strong>Institute Code</strong></th>
                                <th class="noShow"><strong>Email</strong></th>
                                <th class="noShow"><strong>Status</strong></th>
                                <th class="noShow"><strong>Country Name</strong></th>
                                <th class='noExl'><strong>School Name</strong></th>
                                <th class='noExl'><strong>Email ID</strong></th>
                                <th><strong>Phone Number</strong> </th>
                                <th><strong>Created Date</strong></th>
                                <th style="display:none"><strong>Transactions</strong> </th>
                                <th style="display:none"><strong>Revenue</strong></th>
                                <th><strong>Comments</strong></th>
                                <th class='noExl'>Status</th>
                            </tr>
                        </thead>
                        <tbody id="tblBdySchoolDetails">
                        </tbody>
                    </table>
                    <div class="col-md-12 text-center">
                        <ul class="pagination pagination-lg pager" id="myPager"></ul>
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

    <div class="modal fade" id="paytabs_merch" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Paytabs Merchant Details</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="material">
                        <div class="form-group">
                            <input type="text" id="txtSecretKey" required="required" />
                            <label class="control-label" for="input">Secret Key (API KEY)</label>
                            <i class="bar"></i>
                        </div>

                        <div class="form-group">
                            <input type="text" id="txtPaytabsEmailID" required="required" class="full-w" />
                            <label class="control-label" for="input">PayTabs User Name</label>
                            <i class="bar"></i>
                        </div>

                        <div class="form-group">
                            <input type="text" id="txtBillingAddress" required="required" />
                            <label class="control-label" for="input">Billing Address</label>
                            <i class="bar"></i>
                        </div>

                         <div class="form-group">
                            <input type="text" id="txtPayTabsMID" required="required" maxlength="10" />
                            <label class="control-label" for="input">PayTabs MID</label>
                            <i class="bar"></i>
                        </div>
                        <h4 class="bold-6 mb-0">Convenience Fee</h4>
                        <i class="bar"></i>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Debit Card : </span>
                        </div>
                                </div>
                                <div class="row">
                                   <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Fraud Charges : </span>
                        </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlDebitCardConvenienceType" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtDebitCardConvenience"  />
                                    <i class="bar"></i>
                                </div>
                                    <div class="col-sm-2 margin-top-25">
                                   <%-- <label id="lbltxtDebitCardConvenience"></label>--%>
                                             <span id="lbltxtDebitCardConvenience"></span>
                                        </div>
                                    </div>
                                 <div class="row">
                                   <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Transaction Charges : </span>
                        </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlDebitCardConvenienceTypetc" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtDebitCardConveniencetc" />
                                    <i class="bar"></i>
                                </div>
                                     <div class="col-sm-2  margin-top-25">
                                  <%--  <label id="lbltxtDebitCardConveniencetc"></label>--%>
                                         <span id="lbltxtDebitCardConveniencetc"></span>
                                        </div>
                                    </div>
                            <%--</div>--%>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Credit Card : </span>
                                </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Fraud Handler charges: </span>
                                </div>

                                <div class="col-sm-5">
                                    <Select  id="ddlCreditCardConvenienceType" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                   <input type="text" id="txtCreditCardConvenience" />
                                    <%-- <span id="txtCreditCardConvenience"></span>--%>
                                    <i class="bar"></i>
                                </div>
                                    <div class="col-sm-2  margin-top-25">
                                   <%-- <label id="lbltxtCreditCardConvenience"></label>--%>
                                         <span id="lbltxtCreditCardConvenience"></span>
                                        </div>
                                    </div>

                             <div class="row">
                                    <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Transaction Charges: </span>
                                </div>

                                <div class="col-sm-5">
                                    <Select  id="ddlCreditCardConvenienceTypetc" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtCreditCardConveniencetc" />
                                    <i class="bar"></i>
                                </div>
                                 <div class="col-sm-2  margin-top-25">
                                  <%--  <label id="lbltxtCreditCardConveniencetc"></label>--%>
                                      <span id="lbltxtCreditCardConveniencetc"></span>
                                        </div>
                                    </div>


                                    </div>

                            </div>

                        </div>
                        <div class="form-group text-center">
                            <button type="button" class="btn btn-primary" id="btnUpdate">Update</button>
                        </div>

                    </div>
                </div>
            </div>
       <%-- </div>
    </div>--%>

    <div class="modal fade" id="Sch_det" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">School Details</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table class="table no-border sch_details" id="tblSchoolDetails">
                        </table>
                    </div>

                    <div class="text-center">
                        <button type="button" class="btn btn-primary" id="btnReject">Reject</button>
                        <button type="button" class="btn btn-primary" id="btnProceed">Proceed</button>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="ActivateSchoolAccount" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Paytabs Merchant Details</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="material">
                        <div class="form-group">

                            <input type="text" id="txtASecretKey" required="required" />
                            <label class="control-label" for="input">Secret Key (API KEY)</label>
                            <i class="bar"></i>
                        </div>

                        <div class="form-group">
                            <input type="text" id="txtAPaytabsEmailID" required="required" class="full-w" />
                            <label class="control-label" for="input">PayTabs User Name</label>
                            <i class="bar"></i>
                        </div>

                        <div class="form-group">
                            <input type="text" id="txtABillingAddress" required="required" />
                            <label class="control-label" for="input">Billing Address</label>
                            <i class="bar"></i>
                        </div>
                        <div class="form-group">
                            <input type="text" id="txtAPayTabsMID" required="required" maxlength="10" />
                            <label class="control-label" for="input">PayTabs MID</label>
                            <i class="bar"></i>
                        </div>
                        <h4 class="bold-6 mb-0">Convenience Fee</h4>
                        <i class="bar"></i>
                        <div class="form-group">
                            <div class="row">

                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Debit Card </span>
                        </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Fraud Handler Charges: </span>
                        </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlDebitCardConvenienceType1" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtDebitCardConvenience1" />
                                    <i class="bar"></i>
                        </div>
                                <div class="col-sm-2 margin-top-25">
                                    <span id="lbltxtDebitCardConvenience1"></span>
                                    </div>
                            </div>
                             <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Transaction Charges: </span>
                        </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlDebitCardConvenienceType1tc" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtDebitCardConvenience1tc" />
                                    <i class="bar"></i>
                        </div>
                                 <div class="col-sm-2 margin-top-25">
                                    <span id="lbltxtDebitCardConvenience1tc"></span>
                                    </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Credit Card : </span>
                                </div>
                                </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;"> Fraud Handler Charges: </span>
                                </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlCreditCardConvenienceType1" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtCreditCardConvenience1" />
                                    <i class="bar"></i>
                                </div>
                                <div class="col-sm-2 margin-top-25">
                                    <span id="lbltxtCreditCardConvenience1"></span>
                                    </div>
                                </div>
                            <div class="row">
                                <div class="col-sm-3">
                                    <span style="margin-top: 16px; display: inline-block;">Transaction Charges: </span>
                        </div>
                                <div class="col-sm-5">
                                    <Select  id="ddlCreditCardConvenienceType1tc" >
                                        <option value="0">Select</option>
                                    </Select>
                                </div>
                                <div class="col-sm-2">
                                    <input type="text" id="txtCreditCardConvenience1tc" />
                                    <i class="bar"></i>
                        </div>
                                <div class="col-sm-2 margin-top-25">
                                    <span id="lbltxtCreditCardConvenience1tc"></span>
                                    </div>
                            </div>

                            </div>
                        </div>
                        <div class="form-group text-center">
                            <button type="button" class="btn btn-default" id="btnApproveCancel" style="display: none">Cancel</button>
                            <button type="button" class="btn btn-primary" id="btnActivate">Approve</button>
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


     <div class="modal fade" id="Reject_sch" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 mb-0">Reject School Alert</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="material">

                        <h4 class="bold-6 mb-0">Are you sure you want to Reject the school</h4>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-sm-2">
                                    <h4 class="bold-6">Reason</h4>
                                </div>
                                <div class="col-sm-10">
                                    <input type="text" id="txtRejectReason" required="required" />
                                    <label class="control-label" for="input">Max 120 characters</label>
                                    <i class="bar"></i>
                                </div>
                            </div>
                        </div>

                        <div class="form-group text-center">
                            <button type="button" class="btn btn-default margin-right-10" id="btnRejectPopupCancel">Cancel</button>
                            <button type="button" class="btn btn-primary" id="btnRejectPopupYes">Yes</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" id="hdnInstituteID" value="<%=instituteId %>" />
    <input type="hidden" id="hdnAdminUrl" value="<%=AdminUrl %>" />
    <input type="hidden" id="hdnWebUrl" value="<%=WebUrl %>" />
    <input type="hidden" id="hdnIsActivateOrUnblock" value="<%=IsActivateOrUnblock %>" />
     <script src="assets/global/plugins/jquery.min.js"></script>
    <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/school.js?v=2"></script>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
   <script src="Scripts/Plugins/jquery.table2excel.js"></script>
   <script src="Scripts/Plugins/paginationAdmin.js?v=1"></script>
    <script>

        function toggleClick() {
            //debugger;
            document.getElementsByClassName('sidebar')[0].classList.toggle('collapsed');
            $("#sbContent").toggleClass("sbContent full-w");
            $("#filter").toggleClass("select");
        }

        var selectIds = $('#country,#location,#status');
        $(function ($) {
            selectIds.on('show.bs.collapse hidden.bs.collapse', function () {
                //debugger;
                $(this).prev().prev().find('i').toggleClass('fa-plus-square-o fa-minus-square-o');
            })
        });


    </script>
</asp:Content>
