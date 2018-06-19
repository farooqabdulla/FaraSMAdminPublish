<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AddWithdrawalInformation.aspx.cs" Inherits="FaraSM.AdminUI.AddWithdrawalInformation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .avail-amnt #txtAvailableWalletBalnce{
            float:right;
        }
        
        .avail-amnt span{
            font-size:13px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="text-center text-grey add_student">
        <img src="assets/admin/img/Hello-Admin.png" alt="">
        <h3 class="bold">Hi Admin</h3>
        <label class="blocked f_18">Start Adding Withdrawal Information for School Now !</label>
        <button type="button" class="btn btn-primary margin-top-10" data-toggle="modal" data-target="#withdr_infor">Add Withdrawal Info</button>
    </div>
    <div class="stu_srch_box" id="Withdrawlsdisplay" style="display: none">
        <div class="clearfix srch_top">
            <div class="col-sm-2 col-md-2 col-xs-2 left-srch">
                <label id="filter" class="filt_btn mb-0 select" onclick="toggleClick();"><i class="fa fa-sliders margin-right-10"></i><span class="hidden-xs">Filters</span> </label>
            </div>
            <div class="col-sm-6 col-md-6 col-xs-6 mid-srch">
                <input type="text" id="txtSearch" style="width:100%" class="forearm-control" placeholder="Search by School Name">
            </div>
            <%--<div class="col-sm-3 col-md-3 right-srch">
                <a class="text-blue" data-toggle="modal" data-target="#withdr_infor"  id="addnewdetailstbl"><i class="fa fa-plus-circle margin-right-10 margin-top-10"></i>Add Withdrawal Info</a>
            </div>--%>

            <div class="col-sm-4 col-md-4 right-srch">
                <div class="row">
                    <div class="col-sm-6">
                        <a class="text-blue" id="addnewdetailstbl" data-toggle="modal" data-target="#withdr_infor"><i class="fa fa-plus-circle margin-right-10 margin-top-1"></i>Add Withdrawal Info</a><br />
                    </div>
                    <div class="col-sm-6"> 
                        <a class="text-blue" id="excelDownload"><i class="fa fa-file-excel-o margin-left-5 margin-top-1 margin-right-5 "></i>Download To Excel</a>
                    </div>

                </div>
                
               
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
                    <a id="refreshtable">
                        <label class="pull-right mb-0"><i class="fa fa-repeat"></i></label>
                    </a>
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
                <%-- <div class="clearfix padBox bord-b">
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
                <%--<div class="clearfix padBox bord-b">
                                <label class="pull-left f_15">Amount</label>
                                <label class="pull-right indicator" data-toggle="collapse" data-target="#FeeAmt">
                                    <i class="fa fa-minus-square-o"></i>
                                </label>
                                <div class="clear"></div>
                                <div id="FeeAmt" class="collapse in margin-top-20 margin-bottom-20">
                                    <div id="feeSlider" class=""></div>
                                    <div class="margin-top-15">
                                        <span class="pull-left">0</span>
                                        <span class="pull-right">1000BHD</span>
                                    </div>
                                </div>
                            </div>--%>
            </div>
            <div id="sbContent" class="sbContent table-responsive">
                <table class="table table-borderd tblStudent" id="tableWithdrawal">
                    <thead>
                        <tr>
                            <%-- <th><input type="checkbox" /></th>--%>
                            <th class="noShow"><strong>School Name</strong></th>
                            <th class="noShow"><strong>Institute Code</strong></th>
                            <th class="noShow"><strong>Email Id</strong></th>
                            <th class='noExl'><strong>School Name</strong> </th>
                            <th class='noExl'>Email ID </th>
                            <th><strong> Number </strong> </th>
                            <th><strong>Time/Date</strong></th>
                            <th><strong>Withdrawal Amount</strong> </th>
                            <th><strong> AvailableAmount </strong></th>
                            <th><strong>Comments</strong></th>
                            <%-- <th>Status <i class="fa fa-sort margin-left-5"></i></th>--%>
                        </tr>
                    </thead>
                    <tbody id="Withdrawlsdata">
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

    <div class="modal fade" id="withdr_infor" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header clearfix">
                    <h4 class="bold-6 pull-left">Add Withdrawal Information</h4>
                    <button type="button" class="close" data-dismiss="modal"><i class="fa fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <select class="form-control" id="ddlSchools">
                            <option value="0">Select</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div class="input-group full-w">
                            <div class="input-icon right r-readonly">
                                <i class="fa fa-calendar" id="clrStartDate"></i>
                                <input type="text" class="form-control" placeholder="withdrawal Date" disable="true" id="txtDate">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="number" class="form-control" placeholder="Withdrawal Amount" min="0" required="required" id="txtWithdrawalAmount">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="comments" id="txtcomments">
                    </div>

                    <div class="form-group r-readonly avail-amnt">
                       <%-- <input type="text" class="form-control" placeholder="Available Amount" readonly="readonly" id="txtAvailableWalletBalnce">--%>
                    <span class="text-left">Availabale Amount : </span>   <span class="font-green f_11" id="txtAvailableWalletBalnce"></span>
                    </div>
                      
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default margin-right-10" id="btnCancel">Cancel</button>
                    <button type="button" class="btn btn-primary" id="btnSave">Save</button>
                </div>

            </div>

        </div>
    </div>
    <input type="hidden" id="hdnWebUrl" value="<%= ConfigurationManager.AppSettings["WebUrl"].ToString() %>" />

    <input type="hidden" id="hdnInstituteID" value="<%=instituteId %>" />
    <input type="hidden" id="hdnWalletBalance" value="<%=WalletBalance %>" />
    <input type="hidden" id="hdnCurrencyCode" value="<%=CurrencyCode %>" />
    <input type="hidden" id="hdnAvailableBalance" value="<%=AvailableBalance %>" />

     <script src="assets/global/plugins/jquery.min.js"></script>
    <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/AddWithdrawalInformation.js"></script>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
    <script src="Scripts/Plugins/jquery.table2excel.js"></script>
     <script src="Scripts/Plugins/paginationAdmin.js"></script>
    <script>

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
        });
    </script>
</asp:Content>
