<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AddWithdrawalInformation.aspx.cs" Inherits="FaraSM.AdminUI.AddWithdrawalInformation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="text-center text-grey add_student">
        <img src="assets/admin/img/Hello-Admin.png" alt="">
        <h3 class="bold">Hi Admin</h3>
        <label class="blocked f_18">Start Adding Withdrawal Information for School Now !</label>
        <button type="button" class="btn btn-primary margin-top-10" data-toggle="modal" data-target="#withdr_infor">Add Withdrawal Info</button>
    </div>
     <div class="stu_srch_box" id="Withdrawlsdisplay" style="display:none">
        <div class="clearfix srch_top">
          <div class="col-sm-2 col-md-2 col-xs-2 left-srch">
            <label id="filter" class="filt_btn mb-0 select" onclick="toggleClick();"> <i class="fa fa-sliders margin-right-10"></i> <span class="hidden-xs">Filters</span> </label>
          </div>
          <div class="col-sm-7 col-md-7 col-xs-7 mid-srch">
            <input type="text"   id="txtSearch" class="form-control" placeholder="Search by School Name">
          </div>
            <%--<div class="col-sm-3 col-md-3 right-srch">
                <a class="text-blue" data-toggle="modal" data-target="#withdr_infor"  id="addnewdetailstbl"><i class="fa fa-plus-circle margin-right-10 margin-top-10"></i>Add Withdrawal Info</a>
            </div>--%>

            <div class="col-sm-3 col-md-3 right-srch">  
                  <a class="text-blue"  id="addnewdetailstbl" data-toggle="modal" data-target="#withdr_infor"><i class="fa fa-plus-circle margin-right-10 margin-top-10"></i> Add Withdrawal Info</a>
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
            <table class="table table-borderd tblStudent">
              <thead>
                <tr>
                 <%-- <th><input type="checkbox" /></th>--%>
                  <th>School Name <i class="fa fa-sort margin-left-5"></i></th>
                  <th>Email ID <i class="fa fa-sort margin-left-5"></i></th>
                  <th>Phone Number <i class="fa fa-sort margin-left-5"></i></th>
                  <th>Time/Date <i class="fa fa-sort margin-left-5"></i></th>
				  <th>Withdrawal Amount <i class="fa fa-sort margin-left-5"></i></th>
                  <th>Available Amount <i class="fa fa-sort margin-left-5"></i></th>
				  <th>Comments <i class="fa fa-sort margin-left-5"></i></th>
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
                            <option value ="0">Select</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <div class="input-group full-w">
                            <div class="input-icon right">
                                <i class="fa fa-calendar" id="clrStartDate"></i>
                                <input type="text" class="form-control" placeholder="withdrawal Date" readonly="readonly" id="txtDate">
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="number" class="form-control" placeholder="Withdrawal Amount" min="0" required="required" id="txtWithdrawalAmount" >
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="comments" id="txtcomments">
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Available Amount" readonly="readonly" id="txtAvailableWalletBalnce">
                        <%--<span class="font-green f_11">Display left out amount available for school after subtracting withdrawal amount</span>--%>
                    </div>

                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default margin-right-10" id="btnCancel">Cancel</button>
                    <button type="button" class="btn btn-primary" id="btnSave">Save</button>
                </div>

            </div>

        </div>
    </div>

    <input type="hidden" id="hdnInstituteID" value="<%=instituteId %>" />
    <input type="hidden" id="hdnWalletBalance" value="<%=WalletBalance %>" />
    <input type="hidden" id="hdnCurrencyCode" value="<%=CurrencyCode %>" />
     <input type="hidden" id="hdnAvailableBalance" value="<%=AvailableBalance %>" />

     <script src="assets/global/plugins/jquery.min.js"></script>
       <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/AddWithdrawalInformation.js"></script>
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
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
 
</asp:Content>
