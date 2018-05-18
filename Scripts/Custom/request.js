(function () {
    var defaultErrorMessage = "Handler Returned Non-Success Response Code";
    var failedActionResponse = { Success: false, Message: defaultErrorMessage }
    var isAsync = true;
    function CanCallBack(callBackFunction) {
        //if (isAsync && callBackFunction && typeof callBackFunction === "function")
        //    return true;
        //else
        //    return false;
        return true;
    }

    this.Request = function () {
        
    }


    Request.prototype.Initiate = function (handlerPage,dataType,isAsync,data, callBackFunction) {
        var actionResponse;
        failedActionResponse.Message = defaultErrorMessage;
        $.ajax({
            url: handlerPage,
            async: false,
            dataType: dataType,
            data:data,
            success: function (response) {
                actionResponse = response;
                if (CanCallBack(callBackFunction))
                    callBackFunction(actionResponse);
            },
            error: function (jqXHR, textStatus, response) {
                if (jqXHR.status == 401) {
                    window.location.href = "/Index.aspx?message=Session expired";
                }
                else {
                    failedActionResponse.Response = response;
                    failedActionResponse.Message = response.responseJSON.Message;
                    actionResponse = failedActionResponse;
                    if (CanCallBack(callBackFunction))
                        callBackFunction(actionResponse);
                }
            }
        });
        if (!CanCallBack(callBackFunction))
            return actionResponse;
    }

    Request.prototype.InitiateFormRequest = function (handlerPage, dataType, isAsync, data, callBackFunction) {
        var actionResponse;
        failedActionResponse.Message = defaultErrorMessage;
        $.ajax({
            url: handlerPage,
            data: data,
            processData: false,
            contentType: false,
            async:false,
            dataType:dataType,
            type: 'POST',
            success: function (response) {
                actionResponse = response;
                if (CanCallBack(callBackFunction))
                    callBackFunction(actionResponse);
            },
            error: function (jqXHR, textStatus, response) {
                if (jqXHR.status == 401) {
                    window.location.href = "/Index.aspx?message=Session expired";
                }
                else {
                    failedActionResponse.Response = response;
                    failedActionResponse.Message = response.responseJSON.Message;
                    actionResponse = failedActionResponse;
                    if (CanCallBack(callBackFunction))
                        callBackFunction(actionResponse);
                }
            }
        });
        if (!CanCallBack(callBackFunction))
            return actionResponse;
    }
    

}());