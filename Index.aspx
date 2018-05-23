<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="FaraSM.AdminUI.Index" %>

<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>FaraAdmin-FaraPay</title>
   <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- <link href="assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />-->
    <link href="/assets/global/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/layout/css/bootstrap-switch.min.css" rel="stylesheet" />
    <link href="/assets/admin/layout/css/materialForm.css" rel="stylesheet" type="text/css" />
    <link href="/assets/global/css/toastr.min.css" rel="stylesheet" />
    <link href="/assets/global/css/bootstrap-datepicker.min.css" rel="stylesheet" />
    <%--<link href="assets/global/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />--%>

    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE STYLES -->

    <!-- END PAGE STYLES -->
    <!-- BEGIN THEME STYLES -->
    <!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
    <link href="/assets/global/css/components.css" id="style_components" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css" />
    <link href="/assets/admin/layout/css/themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color" />
    <link href="/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css" />

    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="favicon.ico" />
    <style type="text/css">
        body {
            background: url(assets/admin/img/login_bg2.png) no-repeat;
            background-size: cover;
            height: 100%;
            font-family: "Open Sans", sans-serif;
        }
    </style>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-2"></div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <div class="login_panel">
                    <div class="login_panel_head text-center">
                        <%--<img src="assets/admin/img/logo-w.png" height="35" alt="logo">--%>
                        <img src="assets/admin/img/Farapay%20WHITE_LOGO.png" alt="logo" />
                        
                    </div>
                    <div class="login_panel_body">
                        <div class="signIn material">
                            <div class="form-group">
                                <input type="text" id="txtAdminId" autofocus="autofocus" required="required" placeholder="Enter Email or Phone Number" />
                               <%-- <label class="control-label" for="input">Enter Email or Phone Number</label>--%>
                                <i class="bar"></i>
                            </div>
                            <div class="form-group">
                                <input type="password" id="txtAdminPassword" required="required" placeholder="Password" />
                                <%--<label class="control-label" for="input">Password</label>--%>
                                <i class="bar"></i>
                            </div>
                            <%--<div class="form-group clearfix margin-top-25 f_12">
                                <label class="control control--checkbox pull-left">
                                    <input type="checkbox" />
                                    <div class="control__indicator"></div>
                                </label>
                                Remember me
											
											<label class="pull-right f_12">
                                                <a>Forgot Password?</a>
                                            </label>
                            </div>--%>
                            <div class="form-group text-center">
                                <button type="button" id="btnAdminLogin" class="btn btn-primary">Login <i class="fa fa-arrow-right margin-left-10"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-2"></div>
        </div>

        <div class="login_foot">Copyright  &copy; PayTabs-QuickPay. All Rights Reserved.</div>

    </div>
    <script src="assets/global/plugins/jquery.min.js" type="text/javascript"></script>
    <script src="Scripts/Plugins/toastr.min.js"></script>
    <script src="Scripts/Plugins/sha1.js"></script>
     <script src="assets/global/scripts/metronic.js" type="text/javascript"></script>
      <script src="assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
     <script src="assets/admin/layout/scripts/nouislider.min.js"></script>
    <script src="assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>
    <script src="assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

    <script src="Scripts/Custom/Admin.js"></script>
   <script src="Scripts/Custom/request.js?v=1"></script>
    <script src="Scripts/Custom/Validation.js"></script>

    <script type="text/javascript">
        Metronic.init(); // init metronic core componets
        Layout.init();

        function ErrorNotifier(msg) {
            var arr = msg.split('-')
            toastr.options = {
                "closeButton": true,
                "debug": true,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"

            }
            toastr.error(msg);

        }

        function SuccessNotifier(msg) {
            var arr = msg.split('-')
            toastr.options = {
                "closeButton": true,
                "debug": true,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"

            }


            toastr.success(msg);

        }

    </script>
</body>
</html>
