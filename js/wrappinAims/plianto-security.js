function callAjax(url, requestData, responseMethod, errorMethod) {
    var request = $.ajax({
        type: "POST",
        url: basePath + url,
        data: requestData
    });
    request.done(function(response) {
        response = formatToJSONOBject(response);
        if (typeof response.ajaxErrorObj != "undefined") {
            showErrorResponse(response.ajaxErrorObj);
            if (typeof errorMethod != "undefined") {
                errorMethod(response);
            }
            return false;
        }
        if (typeof response == "string" && (response.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (response.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                eval(errorMethod + "(" + JSON.stringify(response) + ");");
                return false;
            }
        }
        if (typeof responseMethod != "undefined") {
            eval(responseMethod + "(" + JSON.stringify(response) + ");");
        } else {
            if (typeof response.exceptionData != "undefined") {
                showException(response.exceptionData);
            }
            if (typeof response.focusOn != "undefined") {
                $(response.focusOn).focus();
            }
            if ((typeof response.tabClass != "undefined" && response.tabClass != "") && (typeof response.tabContent != "undefined" && response.tabContent != "")) {
                changeTab(response.tabClass, response.tabContent);
            }
        }
    });
    request.fail(function(response) {
        if (response.status == 404) {
            showException("Please check the URL that you have provided " + basePath + url);
        } else {
            if (response.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + url);
            } else {
                if (response.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof errorMethod != "undefined") {
            eval(errorMethod + "();");
        }
    });
}

function callAjaxWithArgs(C, B, E, A) {
    var D = $.ajax({
        type: "POST",
        url: basePath + C,
        data: B
    });
    D.done(function(F) {
        F = formatToJSONOBject(F);
        if (typeof F.ajaxErrorObj != "undefined") {
            showErrorResponse(F.ajaxErrorObj);
            if (typeof A != "undefined") {
                A(F);
            }
            return false;
        }
        if (typeof F == "string" && (F.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (F.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                A(F);
                return false;
            }
        }
        if (typeof E != "undefined") {
            E(F);
        } else {
            if (typeof F.exceptionData != "undefined") {
                showException(F.exceptionData);
            }
            if (typeof F.focusOn != "undefined") {
                $("#" + F.focusOn).focus();
            }
            if ((typeof F.tabClass != "undefined" && F.tabClass != "") && (typeof F.tabContent != "undefined" && F.tabContent != "")) {
                changeTab(F.tabClass, F.tabContent);
            }
        }
    });
    D.fail(function(F) {
        if (F.status == 404) {
            showException("Please check the URL that you have provided " + basePath + C);
        } else {
            if (F.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + C);
            } else {
                if (F.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof A != "undefined") {
            A(F);
        }
    });
}

function callAjaxByObj(A) {
    var B = A.url;
    if (isAppUrlEntityHaveSecurity(A)) {
        A.securityResp = afterSecuritySuccess(A);
        A.securityError = afterSecurityError(A);
        if (securityData.securityType == securityData.OTP) {
            callOldAjaxAfterSecurity(prepareOTPAjaxObj(A));
        } else {
            if (securityData.securityType == securityData.CAPTCHA) {
                callOldAjaxAfterSecurity(prepareCaptchaAjaxObj(A));
            } else {
                if (securityData.securityType == securityData.LOGINUSERPWD) {
                    callOldAjaxAfterSecurity(prepareLoginUserPwdAjaxObj(A));
                }
            }
        }
    } else {
        callOldAjaxAfterSecurity(A);
    }
}

function callOldAjaxAfterSecurity(J) {
    var A = J.url;
    var E = J.type;
    var C = J.data;
    var F = J.resp;
    var I = J.error;
    var H = J.async;
    var G = J.cType;
    var B = J.securityResp;
    var K = J.securityError;
    if (typeof E == "undefined") {
        E = "GET";
    }
    if (typeof C == "undefined") {
        C = {};
    }
    if (typeof H == "undefined") {
        H = true;
    }
    if (typeof G == "undefined") {
        G = "application/x-www-form-urlencoded; charset=UTF-8";
    }
    var D = $.ajax({
        type: E,
        url: basePath + A,
        async: H,
        data: C,
        contentType: G
    });
    D.done(function(L) {
        L = formatToJSONOBject(L);
        if (typeof L.ajaxErrorObj != "undefined") {
            if (typeof K != "undefined") {
                if (L.ajaxErrorObj.isSecurityErr) {
                    showErrorResponse(L.ajaxErrorObj);
                    K(L);
                } else {
                    closePopup();
                    showErrorResponse(L.ajaxErrorObj);
                    if (typeof I != "undefined") {
                        I(L);
                    }
                }
                return false;
            } else {
                showErrorResponse(L.ajaxErrorObj);
                if (typeof I != "undefined") {
                    I(L);
                }
            }
            return false;
        }
        if (typeof L == "string" && (L.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (L.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                if (typeof I != "undefined") {
                    I(L);
                }
                return false;
            }
        }
        if (typeof B != "undefined") {
            B(L);
        }
        if (typeof F != "undefined") {
            F(L);
        } else {
            if (typeof L.exceptionData != "undefined") {
                showException(L.exceptionData);
            }
            if (typeof L.focusOn != "undefined") {
                $("#" + L.focusOn).focus();
            }
            if ((typeof L.tabClass != "undefined" && L.tabClass != "") && (typeof L.tabContent != "undefined" && L.tabContent != "")) {
                changeTab(L.tabClass, L.tabContent);
            }
        }
    });
    D.fail(function(L) {
        if (L.status == 404) {
            showException("Please check the URL that you have provided " + basePath + A);
        } else {
            if (L.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + A);
            } else {
                if (L.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof K != "undefined") {
            K(L);
            return false;
        } else {
            if (typeof I != "undefined") {
                I(L);
            }
        }
    });
}

function callUploadAjax(url, requestData, responseMethod, errorMethod) {
    var request = $.ajax({
        type: "POST",
        url: basePath + url,
        data: requestData,
        cache: false,
        contentType: false,
        processData: false
    });
    request.done(function(response) {
        response = formatToJSONOBject(response);
        if (typeof response.ajaxErrorObj != "undefined") {
            showErrorResponse(response.ajaxErrorObj);
            if (typeof errorMethod != "undefined") {
                eval(errorMethod + "();");
            }
            return false;
        }
        if (typeof response == "string" && (response.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (response.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                eval(errorMethod + "(" + JSON.stringify(response) + ");");
                return false;
            }
        }
        if (typeof responseMethod != "undefined") {
            eval(responseMethod + "(" + JSON.stringify(response) + ");");
        } else {
            if (typeof response.exceptionData != "undefined") {
                showException(response.exceptionData);
            }
            if (typeof response.focusOn != "undefined") {
                $(response.focusOn).focus();
            }
            if ((typeof response.tabClass != "undefined" && response.tabClass != "") && (typeof response.tabContent != "undefined" && response.tabContent != "")) {
                changeTab(response.tabClass, response.tabContent);
            }
        }
    });
    request.fail(function(response) {
        if (response.status == 404) {
            showException("Please check the URL that you have provided " + basePath + url);
        } else {
            if (response.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + url);
            } else {
                if (response.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof errorMethod != "undefined") {
            eval(errorMethod + "();");
        }
    });
}

function callUploadAjaxWithArgs(C, B, E, A) {
    var D = $.ajax({
        type: "POST",
        url: basePath + C,
        data: B,
        cache: false,
        contentType: false,
        processData: false
    });
    D.done(function(F) {
        F = formatToJSONOBject(F);
        if (typeof F.ajaxErrorObj != "undefined") {
            showErrorResponse(F.ajaxErrorObj);
            if (typeof A != "undefined") {
                A(F);
            }
            return false;
        }
        if (typeof F == "string" && (F.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (F.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                A(F);
                return false;
            }
        }
        if (typeof E != "undefined") {
            E(F);
        } else {
            if (typeof F.exceptionData != "undefined") {
                showException(F.exceptionData);
            }
            if (typeof F.focusOn != "undefined") {
                $(F.focusOn).focus();
            }
            if ((typeof F.tabClass != "undefined" && F.tabClass != "") && (typeof F.tabContent != "undefined" && F.tabContent != "")) {
                changeTab(F.tabClass, F.tabContent);
            }
        }
    });
    D.fail(function(F) {
        if (F.status == 404) {
            showException("Please check the URL that you have provided " + basePath + C);
        } else {
            if (F.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + C);
            } else {
                if (F.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof A != "undefined") {
            A();
        }
    });
}

function callUploadAjaxByObj(A) {
    var D = A.url;
    var E = A.type;
    var C = A.data;
    var G = A.resp;
    var B = A.error;
    if (typeof E == "undefined") {
        E = "GET";
    }
    if (typeof C == "undefined") {
        C = {};
    }
    var F = $.ajax({
        type: E,
        url: basePath + D,
        data: C,
        cache: false,
        contentType: false,
        processData: false
    });
    F.done(function(H) {
        H = formatToJSONOBject(H);
        if (typeof H.ajaxErrorObj != "undefined") {
            showErrorResponse(H.ajaxErrorObj);
            if (typeof B != "undefined") {
                B(H);
            }
            return false;
        }
        if (typeof H == "string" && (H.toLowerCase().indexOf("<!doctype html public") != -1)) {
            if (H.indexOf("LoginHomePage") != -1) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                callAjaxByObj({
                    "url": "/base/showError",
                    "resp": afterErrorResponse()
                });
                B(H);
                return false;
            }
        }
        if (typeof G != "undefined") {
            G(H);
        } else {
            if (typeof H.exceptionData != "undefined") {
                showException(H.exceptionData);
            }
            if (typeof H.focusOn != "undefined") {
                $("#" + H.focusOn).focus();
            }
            if ((typeof H.tabClass != "undefined" && H.tabClass != "") && (typeof H.tabContent != "undefined" && H.tabContent != "")) {
                changeTab(H.tabClass, H.tabContent);
            }
        }
    });
    F.fail(function(H) {
        if (H.status == 404) {
            showException("Please check the URL that you have provided " + basePath + D);
        } else {
            if (H.status == 405) {
                showException("Request type was not matched for the URL : " + basePath + D);
            } else {
                if (H.status == 302) {
                    window.top.location.href = basePath + "/login/loginHome";
                } else {
                    callAjaxByObj({
                        "url": "/base/showError",
                        "resp": afterErrorResponse()
                    });
                }
            }
        }
        if (typeof B != "undefined") {
            B(H);
        }
    });
}

function redirectToErrorpage(A) {
    window.location = basePath + A.url;
}

function isAppUrlEntityHaveSecurity(A) {
    if (getPlainUrl(A.url) == securityData.topURL && securityData.isSecurityRequired) {
        return true;
    } else {
        return false;
    }
}

function prepareOTPAjaxObj(A) {
    return {
        "url": "/otp/sendOTP",
        "type": "POST",
        "data": {
            "actualAjaxReqObj": JSON.stringify(A)
        },
        "resp": afterAjaxSuccessOTPCallback(A),
        "error": afterAjaxErrorOTPCallback(A)
    };
}

function prepareCaptchaAjaxObj(A) {
    return {
        "url": "/captcha/generateCaptcha",
        "type": "POST",
        "data": {
            "actualAjaxReqObj": JSON.stringify(A)
        },
        "resp": afterAjaxSuccessCaptchaCallback(A),
        "error": afterAjaxErrorCaptchaCallback(A)
    };
}

function prepareLoginUserPwdAjaxObj(A) {
    return {
        "url": "/loginUserPwd/sendLoginUserPwd",
        "type": "POST",
        "data": {
            "actualAjaxReqObj": JSON.stringify(A)
        },
        "resp": afterAjaxSuccessLoginUsrPwdCallback(A),
        "error": afterAjaxErrorLoginUsrPwdCallback(A)
    };
}

function afterAjaxSuccessOTPCallback(A) {
    return function(B) {
        afterSuccessOTPCallback(A);
    };
}

function afterAjaxErrorOTPCallback(A) {
    return function() {
        var B = A.error;
        if (typeof B != "undefined") {
            B();
        }
    };
}

function afterAjaxSuccessCaptchaCallback(A) {
    return function(B) {
        afterSuccessCaptchaCallback(A, B);
    };
}

function afterAjaxErrorCaptchaCallback(A) {
    return function() {
        var B = A.error;
        if (typeof B != "undefined") {
            B();
        }
    };
}

function afterAjaxSuccessLoginUsrPwdCallback(A) {
    return function(B) {
        afterSuccessLoginUsrPwdCallback(A);
    };
}

function afterAjaxErrorLoginUsrPwdCallback(A) {
    return function() {
        var B = A.error;
        if (typeof B != "undefined") {
            B();
        }
    };
}

function afterSuccessOTPCallback(A) {
    var C = {};
    var B = "";
    B += '<div style="margin-top: 25px; min-height: 100px;">';
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2">';
    B += '<label class="leftDiv" style="width:140px;"> Enter OTP : </label>';
    B += '<input type="password" class="fld rightDiv" id="appOTPPopPageSbmtPwd"/>';
    B += "</div>";
    B += "</div>";
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2">';
    B += '<div class="leftDiv">';
    B += "	<span>&nbsp;</span>";
    B += "</div>";
    B += '<div class="rightDiv">';
    B += '<input type="submit" value="Submit" id="appOTPPopPageFormSbmt" name="signIn" class="btn appOTPPopDtl" onclick="validateAppOTPPopSbmt();" />';
    B += '<input type="button" value="Re-Send" id="appOTPPopPageFormReSend" name="signIn" class="btn appOTPPopDtl" onclick="resendAppOTPPopSbmt();" />';
    B += '<span class="loadngImgSml appOTPPopLdngSml"></span>';
    B += "</div>";
    B += "</div>";
    B += "</div>";
    B += "</div>";
    C.html = B;
    C.width = 400;
    C.closeMethod = closeEsigPopupAfterPopulate(A);
    C.onReadyMethod = onEsigFieldPopupAfterPopulate();
    openPopup(C);
    setSecurityPopActualReqObj(A);
}

function afterSuccessCaptchaCallback(A, D) {
    var C = {};
    var B = "";
    B += '<div style="margin-top: 25px; min-height: 100px;">';
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2" style="width:265px;">';
    B += '<img alt="Captcha is being loaded" style="height:50px;border:1px solid #CCCCCC; padding:2px;" class="rightDiv" id="appCaptchaImg" src="' + basePath + "/captcha/getCaptcha/" + D + '" />';
    B += '	<span class="capchaRefresh" title="Reload Captcha" style="float: right; margin-top: 2px;" onclick="refreshAppCaptcha();"></span>';
    B += "</div>";
    B += '<div class="formDiv row hBlock2" style="width:265px;">';
    B += '<label class="rightDiv" style="font-weight:bold;">Enter the above text:</label>';
    B += "</div>";
    B += '<div class="formDiv row hBlock2">';
    B += '<input type="text" style="width:215px;" class="fld rightDiv" id="appOTPPopPageSbmtPwd"/>';
    B += "</div>";
    B += "</div>";
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2" style="width:265px;">';
    B += '<div class="rightDiv">';
    B += '<input type="submit" value="Submit" id="appOTPPopPageFormSbmt" name="signIn" class="btn appOTPPopDtl" onclick="validateAppCaptchaPopSbmt();" />';
    B += '<span class="loadngImgSml appOTPPopLdngSml"></span>';
    B += "</div>";
    B += "</div>";
    B += "</div>";
    B += "</div>";
    C.html = B;
    C.width = 300;
    C.closeMethod = closeEsigPopupAfterPopulate(A);
    C.onReadyMethod = onEsigFieldPopupAfterPopulate();
    openPopup(C);
    setSecurityPopActualReqObj(A);
}

function afterSuccessLoginUsrPwdCallback(A) {
    var C = {};
    var B = "";
    B += '<div style="margin-top: 25px; min-height: 100px;">';
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2">';
    B += '<label class="leftDiv" style="width:140px;"> Enter Login Password : </label>';
    B += '<input type="password" class="fld rightDiv" id="appOTPPopPageSbmtPwd"/>';
    B += "</div>";
    B += "</div>";
    B += '<div class="hBlock">';
    B += '<div class="formDiv row hBlock2">';
    B += '<div class="leftDiv">';
    B += "	<span>&nbsp;</span>";
    B += "</div>";
    B += '<div class="rightDiv">';
    B += '<input type="submit" value="Submit" id="appOTPPopPageFormSbmt" name="signIn" class="btn appOTPPopDtl" onclick="validateAppLoginUsrPwdPopSbmt();" />';
    B += '<span class="loadngImgSml appOTPPopLdngSml"></span>';
    B += "</div>";
    B += "</div>";
    B += "</div>";
    B += "</div>";
    C.html = B;
    C.width = 400;
    C.closeMethod = closeEsigPopupAfterPopulate(A);
    C.onReadyMethod = onEsigFieldPopupAfterPopulate();
    openPopup(C);
    setSecurityPopActualReqObj(A);
}

function setSecurityPopActualReqObj(A) {
    $("#appOTPPopPageFormSbmt").data("appSecurityReqObj", A);
}

function getSecurityPopActualReqObj() {
    return $("#appOTPPopPageFormSbmt").data("appSecurityReqObj");
}

function closeEsigPopupAfterPopulate(A) {
    return function() {
        var B = A.error;
        if (typeof B != "undefined") {
            B();
        }
        closePopup();
    };
}

function onEsigFieldPopupAfterPopulate() {
    return function() {
        $("#appOTPPopPageSbmtPwd").focus();
        $("#appOTPPopPageSbmtPwd").keyup(function(A) {
            if (A.keyCode == 13) {
                if (securityData.securityType == securityData.OTP) {
                    validateAppOTPPopSbmt();
                } else {
                    if (securityData.securityType == securityData.CAPTCHA) {
                        validateAppCaptchaPopSbmt();
                    } else {
                        if (securityData.securityType == securityData.LOGINUSERPWD) {
                            validateAppLoginUsrPwdPopSbmt();
                        }
                    }
                }
            }
        });
    };
}

function resendAppOTPPopSbmt() {
    addBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    var A = getSecurityPopActualReqObj();
    callOldAjaxAfterSecurity({
        "url": "/otp/sendOTP",
        "type": "POST",
        "data": {
            "actualAjaxReqObj": JSON.stringify(A),
            "resend": true
        },
        "resp": afterAjaxResendSuccessOTPCallback(A),
        "error": afterAjaxResendErrorOTPCallback(A)
    });
}

function refreshAppCaptcha() {
    addBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    var A = getSecurityPopActualReqObj();
    callOldAjaxAfterSecurity({
        "url": "/captcha/generateCaptcha",
        "type": "POST",
        "data": {
            "actualAjaxReqObj": JSON.stringify(A),
            "resend": true
        },
        "resp": afterAjaxResendSuccessCaptchaCallback(A),
        "error": afterAjaxResendErrorCaptchaCallback(A)
    });
}

function afterAjaxResendSuccessOTPCallback(A) {
    return function(B) {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
        $("#appOTPPopPageSbmtPwd").val("").focus();
    };
}

function afterAjaxResendErrorOTPCallback(A) {
    return function() {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    };
}

function afterAjaxResendSuccessCaptchaCallback(A) {
    return function(B) {
        $("#appCaptchaImg").attr("src", basePath + "/captcha/getCaptcha/" + B);
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
        $("#appOTPPopPageSbmtPwd").val("").focus();
    };
}

function afterAjaxResendErrorCaptchaCallback(A) {
    return function() {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    };
}

function validateAppOTPPopSbmt() {
    addBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    var D = [];
    var C;
    var A = "";
    D.push({
        "id": "appOTPPopPageSbmtPwd",
        "required": true,
        "caption": "OTP",
        "maxLen": "10"
    });
    if (bindFormToButton(D)) {
        C = getSecurityPopActualReqObj();
        A = C.url;
        if (getQuery(A) != "") {
            A = addUrlParam(A, esigKey, $("#appOTPPopPageSbmtPwd").val());
        } else {
            var E = esigKey + "=" + $("#appOTPPopPageSbmtPwd").val();
            var B = "?" + E;
            A = A + B;
        }
        C.url = A;
        callOldAjaxAfterSecurity(C);
    } else {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    }
    return false;
}

function validateAppCaptchaPopSbmt() {
    addBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    var D = [];
    var C;
    var A = "";
    D.push({
        "id": "appOTPPopPageSbmtPwd",
        "required": true,
        "caption": "Text",
        "maxLen": "10"
    });
    if (bindFormToButton(D)) {
        C = getSecurityPopActualReqObj();
        A = C.url;
        if (getQuery(A) != "") {
            A = addUrlParam(A, esigKey, $("#appOTPPopPageSbmtPwd").val());
        } else {
            var E = esigKey + "=" + $("#appOTPPopPageSbmtPwd").val();
            var B = "?" + E;
            A = A + B;
        }
        C.url = A;
        callOldAjaxAfterSecurity(C);
    } else {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    }
    return false;
}

function validateAppLoginUsrPwdPopSbmt() {
    addBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    var B = [];
    var D;
    var A = "";
    B.push({
        "id": "appOTPPopPageSbmtPwd",
        "required": true,
        "caption": "Password"
    });
    if (bindFormToButton(B)) {
        D = getSecurityPopActualReqObj();
        A = D.url;
        if (getQuery(A) != "") {
            A = addUrlParam(A, esigKey, $("#appOTPPopPageSbmtPwd").val());
        } else {
            var E = esigKey + "=" + encodeURIComponent($("#appOTPPopPageSbmtPwd").val());
            var C = "?" + E;
            A = A + C;
        }
        D.url = A;
        callOldAjaxAfterSecurity(D);
    } else {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    }
    return false;
}

function afterOTPFormPwdErrBlock(A) {
    return function(B) {
        if (B.successful) {} else {
            removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
        }
    };
}

function afterErrorResponse() {
    return function(A) {
        showErrorResponse(A);
    };
}

function showErrorResponse(A) {
    if (typeof A.exceptionData != "undefined" && A.exceptionData == "FATAL") {
        window.top.location.href = basePath + "/base/fatalPage";
    }
    if (typeof A.exceptionData != "undefined") {
        showException(A.exceptionData);
    }
    try {
        gChangeTb(A);
    } catch (B) {}
    if (typeof A.focusOn != "undefined") {
        $(A.focusOn).focus();
    }
}

function afterSecuritySuccess(A) {
    return function(B) {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
        closePopup();
    };
}

function afterSecurityError(A) {
    return function() {
        removeBtnDisabled("appOTPPopLdngSml", "appOTPPopDtl");
    };
}

function formatToJSONOBject(A) {
    if (typeof A == "string" && A.length == (A.lastIndexOf("}") + 1) && A.indexOf("{") == 0) {
        A = JSON.parse(A);
    }
    return A;
}

function afterLogout() {
    return function(A) {
        if (A == null) {
            window.top.location.href = basePath + "/base/noSessionPage";
        } else {
            if (A == aimsApp) {
                window.top.location.href = basePath + "/login/loginHome";
            } else {
                if (A == employerApp) {
                    window.top.location.href = basePath + "/login/employerLoginHome";
                } else {
                    if (A == facultyApp) {
                        window.top.location.href = basePath + "/login/facultyLoginHome";
                    } else {
                        if (A == phdAdmApp) {
                            window.top.location.href = basePath + "/login/phdAdmLoginHome";
                        } else {
                            if (A == mtechAdmApp) {
                                window.top.location.href = basePath + "/login/mtechAdmLoginHome";
                            } else {
                                if (A == mdesAdmApp) {
                                    window.top.location.href = basePath + "/login/mdesAdmLoginHome";
                                } else {
                                    if (A == mphilAdmApp) {
                                        window.top.location.href = basePath + "/login/mphilAdmLoginHome";
                                    } else {
                                        if (A == executiveMtechAdmApp) {
                                            window.top.location.href = basePath + "/login/execMtechAdmLoginHome";
                                        } else {
                                            if (A == recStaffApp) {
                                                window.top.location.href = basePath + "/login/recStaffLoginHome";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
}

function afterLogoutErr() {
    return function() {};
}