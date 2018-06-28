<%@ Page Title="" Language="C#" MasterPageFile="~/Admin.Master" AutoEventWireup="true" CodeBehind="AdminProfile.aspx.cs" Inherits="FaraSM.AdminUI.AdminProfile" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
<style>
    .pass_icn{
position:absolute;
right:0px;
bottom:12px;
color:#bfbbbb;
    }
</style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row">
			<div class="col-sm-1"></div>
			<div class="col-sm-10">
			
			<div class="portlet lite margin-top-15">
			<div class="tabbable-line">
								<ul class="nav nav-tabs ">
									
									<li class="active">
										<a href="#tab_15_3" data-toggle="tab">
											Profile Information
										 </a>
									</li>
									<li>
										<a href="#tab_15_4" data-toggle="tab">
											Change Password
										 </a>
									</li>
								</ul>
								<div class="tab-content">
									
									<div class="tab-pane active material" id="tab_15_3">
										<div class="upload-btn-wrapper"> 
                                            <label class="inst_img">
										<span class="label-edit" ><i class="fa fa-camera"></i></span>
									<img src="assets/admin/layout/img/photo3.jpg" id="imgAdminProfile" class="img-responsive" alt="logo">	
									</label>
                                            <input type="file" name="myfile" id="myfile">
                                        </div>
										<div class="row">
										<div class="col-sm-4">
										<div class="form-group">
											<input type="text" id="txtAdminName" required="required" style="max-width:100%;" />
                                            <label class="control-label" for="input">Your Full Name</label>
                                            <i class="bar"></i>
										</div>	
										</div>
										<div class="col-sm-4">
										<div class="form-group">
										<input type="text" id="txtAdminEmail" required="required" style="max-width:100%;" />
                                            <label class="control-label" for="input">E-mail Address</label>
                                            <i class="bar"></i>	
										</div>
										</div>
										</div>
										<div class="row">
										<div class="col-sm-4">
										<div class="form-group">
											<input type="text" id="txtAdminMobile" required="required" style="max-width:100%;" />
                                            <label class="control-label" for="input">Mobile Number</label>
                                            <i class="bar"></i>
										</div>	
										</div>
										<%--<div class="col-sm-4">
										<div class="form-group">
										<select id="">
                                                <option>Select</option>
                                            </select>
                                            <label class="control-label" for="select">Select School</label>
                                            <i class="bar"></i>
										</div>
										</div>--%>
										</div>
										
										 <div class="text-center pad-15 margin-top-25">
                                    <button type="button" class="btn btn-primary" id="btnUpdateAdminProfile">Update </button>
                                </div>
									</div>
									<div class="tab-pane material" id="tab_15_4">
										<div class="row">
										<div class="col-sm-6 col-md-4">
											<div class="form-group">
										<input type="password" id="txtOldPassword" required="required" />
                                            <label class="control-label"  for="input">Old Password</label>
                                              <span class="pass_icn">
                                                  <i class="fa fa-eye " id="spndecryptadminpassword" onmouseover="seeadmintextlogin(txtOldPassword)" onmouseout="seeadminasterisklogin(txtOldPassword)"></i>
                                                  <!--<img src="assets/admin/img/pwd.png" alt=""  id="spmdecryptpasswordlogin" onmouseover="seetextlogin(logInPassword)" onmouseout="seeasterisklogin(logInPassword)">-->
                                                   
                                              </span>
                                            <i class="bar"></i>
										</div>
										<div class="form-group">
										<input type="password" id="txtNewPassword" required="required" />
                                            <label class="control-label" for="input">New Password</label>
                                         <span class="pass_icn">
                                                  <i class="fa fa-eye " id="spndecryptadminnewpassword" onmouseover="seeadminnewtextlogin(txtNewPassword)" onmouseout="seeadminnewasterisklogin(txtNewPassword)"></i>
                                                  <!--<img src="assets/admin/img/pwd.png" alt=""  id="spmdecryptpasswordlogin" onmouseover="seetextlogin(logInPassword)" onmouseout="seeasterisklogin(logInPassword)">-->
                                                   
                                              </span>
                                            <i class="bar"></i>
										</div>
										<div class="form-group">
										<input type="password" id="txtConfirmPassword" required="required" />
                                            <label class="control-label" for="input">Confirm Password</label>
                                           <span class="pass_icn">
                                                  <i class="fa fa-eye " id="spndecryptadminnewconfirmpassword" onmouseover="seeadminnewconfirmtextlogin(txtConfirmPassword)" onmouseout="seeadminnewconfirmasterisklogin(txtConfirmPassword)"></i>
                                                  <!--<img src="assets/admin/img/pwd.png" alt=""  id="spmdecryptpasswordlogin" onmouseover="seetextlogin(logInPassword)" onmouseout="seeasterisklogin(logInPassword)">-->
                                                   
                                              </span>
                                            <i class="bar"></i>
										</div>
										</div>
										</div>
										 <div class="text-center pad-15 margin-top-25">
                                    <button type="button"  class="btn btn-primary" id="txtUpdatePassword">Save </button>
                                </div>
									</div>
								</div>
							</div>
			
			</div>	
		
			</div>
			<div class="col-sm-1"></div>
			</div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptPart" runat="server">
    <script src="Scripts/Plugins/toastr.min.js"></script>
    <script src="Scripts/Plugins/sha1.js"></script>
	<script src="assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="Scripts/Custom/Admin.js"></script>
   <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/AdminProfile.js"></script>
</asp:Content>
